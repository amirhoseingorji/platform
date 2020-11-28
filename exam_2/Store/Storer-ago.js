const Storer = (Table, _this, config = {}, mode = "select") => {
    if (typeof Table == "object") {
        for (let i in Table) Storer(i, _this, Table[i], mode);
    } else {
        let then = [], StoreObj = {};
        if (config.store) {
            let isTree = config.store == "tree"
            let exsist = Ext.getStore(Table + 'Store');
            if(exsist && config.refresh) exsist =undefined,Ext.undefine(Table + 'Store');
            delete config.refresh;
            then.push((data) => {
                if (isTree){
                let leaf = {}
                for(let d of data) if(d.pid) leaf[d.pid] = true;
                for(let i in data)  data[i].leaf = leaf[data[i].id] ? false : true
                }
                StoreObj = exsist || Ext.create(isTree ? 'Ext.data.TreeStore' : "Ext.data.Store", {
                    model: Ext.create(isTree ? 'Ext.data.TreeModel' : "Ext.data.Model"),
                    storeId: Table + 'Store',
                    idProperty: "id",
                    parentIdProperty: "pid",
                    data
                })
            })
            delete config.store
        }
        if (config.then) {
            then.push(config.then)
            delete config.then
        }
        let state = {}
        state[Table] = []
        state[Table].loading= true
        if(_this[0]){
            for(let __this of _this){
                __this.state = __this.state ? { ...__this.state, ...state } : state
             if(__this.refs[Table])  __this.refs[Table].setState({loading:true})
            }
        }else{
            _this.state = _this.state ? { ..._this.state, ...state } : state
            if(_this.refs[Table]) _this.refs[Table].setState({loading:true})
         }
        then.push((data,count) => {
            if(count) data.count = count;
            state[Table] = data
            state[Table].loading= false
            if (StoreObj) state[Table + "Store"] = StoreObj;
            if(_this[0]){
                for(let __this of _this){
                    if(__this.refs[Table]){
                        __this.refs[Table].setState({data:data,store:StoreObj,loading:false})
                    }else {
                        __this.setState(state);
                        __this[Table+"_data"] = data;
                    } 
                }
            }else{
            if(_this.refs[Table]){
                _this.refs[Table].setState({data:data,store:StoreObj,loading:false})
            }else {
                _this.setState(state);
                _this[Table+"_data"] = data;
            } 
        }
        })
        then.push(data=>window.socket.off(Table))
        Table = Table.toLowerCase();
        if(config.from) config.as = Table
        window.socket.emit(config.from||Table, config ,mode );
        window.socket.on(Table, (data,count) => then.map(e => e(data,count)))
    }
}
export default Storer;