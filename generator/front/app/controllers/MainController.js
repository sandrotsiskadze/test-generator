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
        if(xtype == "FlowNetworkMainView") 
            return "Generate/FlowNetwork";
            
        if(xtype == "GraphMainView") 
            return "Generate/Graph";

        if(xtype == "MazeMainView") 
            return "Generate/Maze";

        if(xtype == "SequenceMainView") 
            return "Generate/Sequence";

        if(xtype == "StringMainView") 
            return "Generate/String";

        if(xtype == "TreeMainView") 
            return "Generate/Tree";
    },
    
    onGenerateClick: function(el) {
        var form = el.up('form');
        var values = form.getValues();
        var path = this.fnGetPathForXtype(form.name);

        if(form.isValid()) {
            Helpers.ajaxRequest(path, values, function(result){
                form.down("[name=Answer]").setValue(result);
            }, 
            function(result) {
            });
        }
    },
    onCodeSendClick: function(el) {
        var form = el.up("form");
        var values = form.getValues();
        
        if(form.isValid()) {
            Helpers.ajaxRequest("path", values, function(result){
                form.down("[name=UserAnswer]").setValue(result);
            }, 
            function(result) {
            });
        }
    }
});
