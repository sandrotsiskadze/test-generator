Ext.define("test.view.main.Main.FlowNetworkMainView", {
    extend: "Ext.form.Panel",
    alias: "widget.flowNetworkMainView",
    requires: [
        'Ext.plugin.Viewport',
        'Ext.window.MessageBox',

        'test.controllers.MainController',
        'test.view.main.List'
    ],
    controller: 'main',
    initComponent: function() {
        Ext.apply(this, {
            border: false,
            bodyPadding: 10,
            items: [
            {
                xtype: "container",
                margin: "10 10 10 0",
                layout: {
                    type: "hbox",
                    align: "stretch"
                },
                items: [
                    {
                        xtype: 'numberfield',
                        name: 'VertexCountRangeFrom',
                        labelWidth: 220,
                        minValue: 0,
                        fieldLabel: 'Vertex Count Range From',
                        labelStyle: "text-align:right;",
                        allowDecimals: false
                    },
                    {
                        xtype: 'numberfield',
                        name: 'VertexCountRangeTo',
                        labelWidth: 220,
                        minValue: 0,
                        fieldLabel: 'Vertex Count Range To',
                        labelStyle: "text-align:right;",
                        allowDecimals: false
                    }
                ]
            }, 
            {
                xtype: "container",
                margin: "10 10 10 0",
                layout: {
                    type: "hbox",
                    align: "stretch"
                },
                items: [
                    {
                        xtype: 'numberfield',
                        name: 'EdgeCountRangeFrom',
                        labelWidth: 220,
                        minValue: 0,
                        fieldLabel: 'Edge Count Range From',
                        labelStyle: "text-align:right;",
                        allowDecimals: false
                    },
                    {
                        xtype: 'numberfield',
                        name: 'EdgeCountRangeTo',
                        labelWidth: 220,
                        minValue: 0,
                        fieldLabel: 'Edge Count Range From',
                        labelStyle: "text-align:right;",
                        allowDecimals: false
                    }
                ]
            },{
                xtype: "container",
                margin: "10 10 10 0",
                layout: {
                    type: "hbox",
                    align: "stretch"
                },
                items: [
                    {
                        xtype: 'numberfield',
                        name: 'MaximalWeight',
                        labelWidth: 220,
                        minValue: 0,
                        fieldLabel: 'Maximal Weight',
                        labelStyle: "text-align:right;",
                        allowDecimals: false
                    }
                ]
            }, {
                xtype: "container",
                margin: "10 10 10 0",
                layout: {
                    type: "hbox",
                    align: "stretch"
                },
                items: [{
                    xtype: 'button',
                    margin: "10 10 10 220",
                    text: 'Generate',
                    listeners: {
                        click: 'onGenerateClick'
                    }
                }]
            }]

        });

        this.callParent();
    }
});