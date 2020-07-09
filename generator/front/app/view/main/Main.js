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
    initComponent: function () {
        Ext.apply(this, {
          border: false,
          bodyPadding: 10,
          dockedItems: [
            {
              xtype: "toolbar",
              displayInfo: true,
              items: [
                {
                  xtype: "button",
                  text: "ქართული",
                  width: "150px",
                  language: "GEO",
                  dock: "bottom",
                  listeners: {
                    click: "onLanguageChange",
                  },
                },
                {
                  xtype: "button",
                  text: "English",
                  width: "150px",
                  language: "ENG",
                  dock: "bottom",
                  listeners: {
                    click: "onLanguageChange",
                  },
                },
              ],
            },
          ],
          items: [
            {
              xtype: "graphMainView",
              title: "Graph",
            },
            {
              xtype: "treeMainView",
              title: "Tree",
            },
            {
              xtype: "flowNetworkMainView",
              title: "Flow Network",
            },
            {
              xtype: "sequenceMainView",
              title: "Sequence",
            },
            {
              xtype: "mazeMainView",
              title: "Maze",
            },
            {
              xtype: "stringMainView",
              title: "String",
            },
          ],
        });

        var value = Helpers.getCookie("language");

        if(Ext.isEmpty(value)) 
            var value = Helpers.setCookie("language", "GEO");
        
        this.callParent();
        Helpers.setLanguage(this);
  },
});
