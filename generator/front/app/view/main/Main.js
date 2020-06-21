/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('test.view.main.Main', {
    extend: 'Ext.tab.Panel',
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
            xtype: "graphMainView",
            title: "Graph"

        }, 
        {
            xtype: "treeMainView",
            title: "Tree"
        }, 
        {
            xtype: "flowNetworkMainView",
            title: "Flow Network"
        }, 
        {
            xtype: "sequenceMainView",
            title: "Sequence"
        }, 
        {
            xtype: "mazeMainView",
            title: "Maze"
        }, 
        {
            xtype: "stringMainView",
            title: "String"
        }
    ]
});
