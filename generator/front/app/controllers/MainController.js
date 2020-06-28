/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('test.controllers.MainController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.main',

    onItemSelected: function (sender, record) {
        Ext.Msg.confirm('Confirm', 'Are you sure?', 'onConfirm', this);
    },

    onConfirm: function (choice) {
        if (choice === 'yes') {
            //
        }
    },

    onTypeChange: function(el) {
        console.log("asdasdsasad");
    },
    
    fnGetPathForXtype(xtype) {
        if(xtype == "flowNetworkMainView") 
            return "Generate/FlowNetwork";
            
        if(xtype == "graphMainView") 
            return "Generate/Graph";

        if(xtype == "mazeMainView") 
            return "Generate/Maze";

        if(xtype == "sequenceMainView") 
            return "Generate/Sequence";

        if(xtype == "stringMainView") 
            return "Generate/String";

        if(xtype == "treeMainView") 
            return "Generate/Tree";
    },
    
    onGenerateClick: function(el) {
        var form = el.up('form');
        var values = form.getValues();
        var path = this.fnGetPathForXtype(form.xtype);

        Helpers.ajaxRequest(path, values, function(result){
            form.down("[name=Answer]").setValue(result);
        }, 
        function(result) {
        });
    }
});
