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
                              langIdentifier: "VertexCountRangeFrom",
                              name: "VertexCountRangeFrom",
                              minValue: 0,
                              maxValue: 100000,
                              emptyText: "Vertex Count Range From",
                              allowDecimals: false,
                              allowBlank: false,
                              listeners: {
                                change: function(el) {
                                  el.up("flowNetworkMainView")
                                  .down("[name=VertexCountRangeTo]")
                                  .minValue=el.getValue();
                                },
                              },
                            },
                            {
                              xtype: "numberfield",
                              flex: 2,
                              margin: "0 0 0 5",
                              langIdentifier: "VertexCountRangeTo",
                              name: "VertexCountRangeTo",
                              minValue: 0,
                              maxValue: 100000,
                              emptyText: "Vertex Count Range To",
                              labelStyle: "text-align:right;",
                              allowDecimals: false,
                              allowBlank: false,
                              listeners: {
                                change: function(el) {
                                  el.up("flowNetworkMainView")
                                  .down("[name=VertexCountRangeFrom]")
                                  .maxValue=el.getValue();
                                },
                              },
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
                              langIdentifier: "EdgeCountRangeFrom",
                              name: "EdgeCountRangeFrom",
                              minValue: 0,
                              maxValue: 100000,
                              emptyText: "Edge Count Range From",
                              labelStyle: "text-align:right;",
                              allowDecimals: false,
                              allowBlank: false,
                              listeners: {
                                change: function(el) {
                                  el.up("flowNetworkMainView")
                                  .down("[name=EdgeCountRangeTo]")
                                  .minValue=el.getValue();
                                },
                              },
                            },
                            {
                              xtype: "numberfield",
                              flex: 2,
                              margin: "0 0 0 5",
                              langIdentifier: "EdgeCountRangeTo",
                              name: "EdgeCountRangeTo",
                              minValue: 0,
                              maxValue: 100000,
                              emptyText: "Edge Count Range From",
                              labelStyle: "text-align:right;",
                              allowDecimals: false,
                              allowBlank: false,
                              listeners: {
                                change: function(el) {
                                  el.up("flowNetworkMainView")
                                  .down("[name=EdgeCountRangeFrom]")
                                  .minValue=el.getValue();
                                },
                              },
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
                              langIdentifier: "MaximalWeight",
                              name: "MaximalWeight",
                              minValue: 0,
                              maxValue: 1000000,
                              emptyText: "Maximal Weight",
                              allowDecimals: false,
                              allowBlank: false,
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
                              langIdentifier: "Generate",
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
                          langIdentifier: "Answer",
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