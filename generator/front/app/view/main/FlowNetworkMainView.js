Ext.define("test.view.main.Main.FlowNetworkMainView", {
    extend: "Ext.panel.Panel",
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
              layout: {
                type: "hbox",
                align: "stretch",
              },
              items: [
                {
                  xtype: "form",
                  name: "FlowNetworkMainView",
                  flex: 1,
                  items: [
                    {
                      xtype: "container",
                      flex: 1,
                      layout: "anchor",
                      items: [
                        {
                          xtype: "container",
                          margin: "10 10 10 10",
                          layout: {
                            type: "hbox",
                            align: "stretch",
                          },
                          items: [
                            {
                              xtype: "numberfield",
                              flex: 2,
                              margin: "0 5 0 0",
                              name: "VertexCountRangeFrom",
                              minValue: 0,
                              emptyText: "Vertex Count Range From",
                              allowDecimals: false,
                            },
                            {
                              xtype: "numberfield",
                              flex: 2,
                              margin: "0 0 0 5",
                              name: "VertexCountRangeTo",
                              minValue: 0,
                              emptyText: "Vertex Count Range To",
                              labelStyle: "text-align:right;",
                              allowDecimals: false,
                            },
                          ],
                        },
                        {
                          xtype: "container",
                          margin: "10 10 10 10",
                          layout: {
                            type: "hbox",
                            align: "stretch",
                          },
                          items: [
                            {
                              xtype: "numberfield",
                              flex: 2,
                              margin: "0 5 0 0",
                              name: "EdgeCountRangeFrom",
                              minValue: 0,
                              emptyText: "Edge Count Range From",
                              labelStyle: "text-align:right;",
                              allowDecimals: false,
                            },
                            {
                              xtype: "numberfield",
                              flex: 2,
                              margin: "0 0 0 5",
                              name: "EdgeCountRangeTo",
                              minValue: 0,
                              emptyText: "Edge Count Range From",
                              labelStyle: "text-align:right;",
                              allowDecimals: false,
                            },
                          ],
                        },
                        {
                          xtype: "container",
                          anchor: "50%",
                          margin: "10 10 10 10",
                          layout: {
                            type: "hbox",
                            align: "stretch",
                          },
                          items: [
                            {
                              xtype: "numberfield",
                              flex: 1,
                              name: "MaximalWeight",
                              minValue: 0,
                              emptyText: "Maximal Weight",
                              allowDecimals: false,
                            },
                          ],
                        },
                        {
                          xtype: "container",
                          margin: "10 10 10 10",
                          layout: {
                            type: "hbox",
                            align: "stretch",
                            pack: "center",
                          },
                          items: [
                            {
                              xtype: "button",
                              margin: "10 10 10 10",
                              text: "Generate",
                              listeners: {
                                click: "onGenerateClick",
                              },
                            },
                          ],
                        },
                        {
                          xtype: "textareafield",
                          margin: "10 10 10 10",
                          height: 300,
                          anchor: "100%",
                          name: "Answer",
                          labelAlign: "top",
                          fieldLabel: "Answer",
                        },
                      ],
                    },
                  ],
                },
                {
                  xtype: "codeAreaMainView",
                  flex: 1,
                },
              ],
            },
          ],
        });

        this.callParent();
    }
});