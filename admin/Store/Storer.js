
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
                for(let i in data) if(data[i]) data[i].leaf =  leaf[data[i].id] ? false : true
                }
                StoreObj = exsist || Ext.create(isTree ? 'Ext.data.TreeStore' : "Ext.data.Store", {
                    model: Ext.create(isTree ? 'Ext.data.TreeModel' : "Ext.data.Model"),
                    storeId: Table + 'Store',
                    filterer: 'bottomup',
                    idProperty: "id",
                    rootVisible:false,
                    parentIdProperty: "pid",
                    pageSize: config.num||100,
                    page:config.page||1,
                    data,
                    _onUpdate  :function(a,b,id){
                         let data ={0:{id}}
                        // data[a]=b
                         data[a]=typeof b == 'boolean' ? (b?1:0) : b
              
                        // console.log(b.toLocaleTimeString())
                         if (b=='null' || b== null) data[a]= "{null}"
            
                         window.socket.emit(config.from||Table, data ,"update" );
                        // let data2 = {0:{}}; data2[0][`_${config.from||Table}`] = id;data2[a]=b
                       //  if(config.join) window.socket.emit(config.join, data2 ,"update" );
                    },
                    _onRemove:function(records){
                        for(let record of records)  {
                            window.socket.emit(config.from||Table, {id:record.id} ,"delete" );
                            let data = {};data[`_${config.from||Table}`] = record.id;
                            if(config.join) window.socket.emit(config.join, data ,"delete" );
                        }
                    },
                    _insert:(data)=>{
                        if(data) window.socket.emit(config.from||Table,data ,"insert" );
                    }
                })
            })
           // console.log('count',StoreObj)
            delete config.store
        }
        if (config.then) {
            then.push(config.then)
            delete config.then
        }
        let state = {}
        state[Table] = []
      
        let _thisstate = _this.state ? { ..._this.state, ...state } : state
        _this.setState({..._thisstate})
        if(_this.refs[Table]){
            _this.refs[Table].setState({loading:true})
        }
        then.push((data,count) => {
            if(count>-1) data.count = count;
            state[Table] = data
            if (StoreObj) state[Table + "Store"] = StoreObj;
          //  console.log('count',StoreObj)
            if(_this.refs[Table]){
                _this.refs[Table].setState({data:data,store:StoreObj,loading:false})
            }else {
                _this.setState(state);
                _this[Table+"_data"] = data;
            } 
        })
        then.push(data=>window.socket.off(Table))
        Table = Table.toLowerCase();
        if(config.from) config.as = Table
        //console.log(Table, mode, config)
        window.socket.emit(config.from||Table, config ,mode );
        window.socket.on(Table, (data,count) => then.map(e => e(data,count)))
    }
}
export default Storer;