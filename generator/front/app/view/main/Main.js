/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('test.view.main.Main', {
    extend: 'Ext.Panel',
    xtype: 'app-main',

    requires: [
        'Ext.plugin.Viewport',
        'Ext.window.MessageBox',

        'test.controllers.MainController',
        'test.view.main.List'
    ],
    controller: 'main',
    
    defaults: {
        bodyPadding: 20,
    },

    items: [
        {
            xtype: "container",
            margin: "10 10 10 10",
            layout: { type: "hbox", align: "stretch" },
            items:[
                {
                    xtype: 'combobox',
                    labelWidth: 80,
                    labelStyle: "text-align:right;",
                    emptyText: "დასახელება",
                    fieldLabel: "დასახელება",
                    displayField: 'name',
                    valueField: 'name',
                    store: {
                        type: 'personnel'
                    },
                    listeners: {
                        change: 'onTypeChange'
                    }
                }, 
                {
                    xtype: 'combobox',
                    labelWidth: 80,
                    labelStyle: "text-align:right;",
                    emptyText: "დასახელება",
                    fieldLabel: "დასახელება",
                    displayField: 'name',
                    valueField: 'name',
                    store: {
                        type: 'personnel'
                    }
                }, 
                {
                    xtype: 'combobox',
                    labelWidth: 80,
                    labelStyle: "text-align:right;",
                    emptyText: "დასახელება",
                    fieldLabel: "დასახელება",
                    displayField: 'name',
                    valueField: 'name',
                    store: {
                        type: 'personnel'
                    }
                }
            ]
        }
    ]
});
