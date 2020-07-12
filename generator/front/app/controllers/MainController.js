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
            return "generator/flow_network/";
            
        if(xtype == "GraphMainView") 
            return "generator/graph/";

        if(xtype == "MazeMainView") 
            return "generator/maxe/";

        if(xtype == "SequenceMainView") 
            return "generator/sequence/";

        if(xtype == "StringMainView") 
            return "generator/string/";

        if(xtype == "TreeMainView") 
            return "generator/tree/";
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
            Helpers.ajaxRequest("generator/code/", values, function(result){
                form.down("[name=UserAnswer]").setValue(result);
            }, 
            function(result) {
            });
        }
    },
    onLanguageChange: function(cmp) {
        var language = cmp.language;

        debugger
        if(Helpers.getCookie("language") != language) {
            Helpers.setCookie("language", language);
            window.location.reload();
            history.go(0);
            window.location.href=window.location.href;
        }
    }
});
