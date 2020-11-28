 const Storer = (Store,th, proxyConfig={}) => {
    if(typeof Store=="string"){
    let Tree = Store.indexOf("Tree") > -1
    let iStore
    if(!Ext.getStore(Store+'Store')){
     iStore = Ext.create(Tree ? 'Ext.data.TreeStore' : "Ext.data.Store", {
        model:  Ext.create(Tree ? 'Ext.data.TreeModel' : "Ext.data.Model", {}),
        storeId: Store+'Store',
        idProperty: "id",
        parentIdProperty: "pid",
        extraParams : {
            id:1
        },
        //  autoSync: true,
        //  autoLoad:true,
        lazyFill:true,
        proxy: {
            params:{
                num:1,
                wh:1
            },
            limitParam :"num",
            filterParam : "where",
            sortParam :"order",
            username:234,
            password : 324,
            noCache: false,
            isSynchronous: true,
            useDefaultXhrHeader: false,
            type: 'ajax',
            cors: true,
            method : "GET",
            useDefaultXhrHeader: false,
            withCredentials: true,
            url: '//localhost:3000/' + (Tree? Store.replace("Tree",""):  Store),
            ...proxyConfig
        }
    });
    let s = {}
    s[Store+"Store"] = iStore
    s[Store+"Data"] = []
    if(!th.state) th.state={}
    th.state = {...th.state,...s}
        iStore.load({
            callback: () => {
                s[Store + "Data"] = iStore.data.items.map(e => e.data)
                th.setState(s)
            }
        })
    }else{
         iStore = Ext.getStore(Store+'Store')
         let s = {}
         s[Store+"Store"] = iStore
         s[Store+"Data"] = iStore.data.items.map(e=>e.data)
         if(!th.state) th.state={}
         th.state = {...th.state,...s}
    }
    
    return iStore
    }else{
        return Store.map(e=>Storer(e,th, proxyConfig))
    }
}
export default Storer;