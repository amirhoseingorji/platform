Ext.require(['Ext.layout.*']);
Ext.require('Ext.Responsive');
Ext.require('Ext.grid.Grid');
Ext.require('Ext.data.TreeStore');
Ext.require('Ext.data.TreeModel');
Ext.create({"xtype":"transition"});
Ext.create({"xtype":"container"});
Ext.create({"xtype":"button"});
Ext.create({"xtype":"image"});
Ext.create({"xtype":"treelist"});
Ext.create({"xtype":"panel"});
Ext.create({"xtype":"titlebar"});
Ext.create({"xtype":"sheet"});
Ext.create({"xtype":"searchfield"});
Ext.create({"xtype":"textfield"});
Ext.create({"xtype":"selectfield"});
Ext.create({"xtype":"passwordfield"});
Ext.create({"xtype":"tabbar"});
Ext.create({"xtype":"tab"});
Ext.getStore(Table + 'Store');
Ext.undefine(Table + 'Store');
Ext.create(isTree ? 'Ext.data.TreeStore' : "Ext.data.Store", {
  model: Ext.create(isTree ? 'Ext.data.TreeModel' : "Ext.data.Model"),
  storeId: Table + 'Store',
  filterer: 'bottomup',
  idProperty: "id",
  rootVisible: false,
  parentIdProperty: "pid",
  pageSize: config.num || 100,
  page: config.page || 1,
  data: data,
  _onUpdate: function _onUpdate(a, b, id) {
    var data = {
      0: {
        id: id
      }
    };
    data[a] = b;
    window.socket.emit(config.from || Table, data, "update");
    var data2 = {
      0: {}
    };
    data2[0]["_".concat(config.from || Table)] = id;
    data2[a] = b;
  },
  _onRemove: function _onRemove(records) {
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = records[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var record = _step2.value;
        window.socket.emit(config.from || Table, {
          id: record.id
        }, "delete");
        var _data = {};
        _data["_".concat(config.from || Table)] = record.id;
        if (config.join) window.socket.emit(config.join, _data, "delete");
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
          _iterator2["return"]();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }
  },
  _insert: function _insert(data) {
    if (data) window.socket.emit(config.from || Table, data, "insert");
  }
});
Ext.create(isTree ? 'Ext.data.TreeModel' : "Ext.data.Model");
Ext.create({"xtype":"grid"});
Ext.create({"xtype":"column"});
Ext.create({"xtype":"numberfield"});
Ext.create({"xtype":"sliderfield"});
Ext.create({"xtype":"filefield"});
Ext.create({"xtype":"dialog"});
Ext.create({"xtype":"textareafield"});
Ext.create({"xtype":"timefield"});
Ext.create({"xtype":"datepickerfield"});
Ext.create({"xtype":"video"});
Ext.create({"xtype":"actionsheet"});
Ext.create({"xtype":"progress"});
Ext.create({"xtype":"rating"});
Ext.create({"xtype":"renderercell"});
Ext.create({"xtype":"tree"});
Ext.create({"xtype":"treecolumn"});
Ext.require(['Ext.grid.plugin.*', 'Ext.grid.filters.Plugin', 'Ext.data.validator.Number', 'Ext.data.validator.Date', 'Ext.exporter.*', 'Ext.grid.plugin.TreeDragDrop', 'Ext.grid.plugin.RowDragDrop', 'Ext.tree.*']);
Ext.toast("امکان حذف وجود ندارد");
Ext.toast([_province, _city, text].join("-"), 5000);
Ext.require(["Ext.layout.*"]);
