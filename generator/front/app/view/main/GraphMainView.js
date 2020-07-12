Ext.define("test.view.main.Main.GraphMainView", {
    extend: "Ext.panel.Panel",
    alias: "widget.graphMainView",
    initComponent: function () {
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
                name: "GraphMainView",
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
                            xtype: "combobox",
                            name: "GraphType",
                            margin: "0 5 0 0",
                            langIdentifier: "GraphType",
                            emptyText: "graphType",
                            displayField: "name",
                            valueField: "id",
                            flex: 1,
                            multiSelect: true,
                            store: Ext.create("Ext.data.Store", {
                              fields: [
                                {
                                  type: "string",
                                  name: "name",
                                },
                                {
                                  type: "string",
                                  name: "id",
                                },
                                {
                                  type: "string",
                                  name: "langIdentifier",
                                }
                              ],
                              data: [
                                {
                                  name: "Directed",
                                  id: 1,
                                  langIdentifier: "Directed",
                                },
                                {
                                  name: "Multiple_Edges",
                                  id: 2,
                                  langIdentifier: "Multiple_Edges",
                                },
                                {
                                  name: "Looped",
                                  id: 3,
                                  langIdentifier: "Looped",
                                },
                              ],
                            }),
                            allowBlank: false,
                          },
                          {
                            xtype: "combobox",
                            name: "GraphKind",
                            margin: "0 0 0 5",
                            langIdentifier: "GraphKind",
                            emptyText: "graphKind",
                            displayField: "name",
                            valueField: "id",
                            flex: 1,
                            labelAlign: "top",
                            store: Ext.create("Ext.data.Store", {
                              fields: [
                                {
                                  type: "string",
                                  name: "name",
                                },
                                {
                                  type: "int",
                                  name: "id",
                                },
                                {
                                  type: "string",
                                  name: "langIdentifier",
                                }
                              ],
                              data: [
                                {
                                  name: "Default",
                                  id: 1,
                                  langIdentifier: "Default",
                                },
                                {
                                  name: "Connected",
                                  id: 2,
                                  langIdentifier: "Connected",
                                },
                                {
                                  name: "Acyclic",
                                  id: 3,
                                  langIdentifier: "Acyclic",
                                },
                                {
                                  name: "One_Cycle",
                                  id: 4,
                                  langIdentifier: "One_Cycle",
                                },
                                {
                                  name: "Complete",
                                  id: 5,
                                  langIdentifier: "Complete",
                                },
                                {
                                  name: "Bipartite",
                                  id: 6,
                                  langIdentifier: "Bipartite",
                                },
                              ],
                            }),
                            allowBlank: false,
                          },
                        ],
                      },
                      {
                        xtype: "checkboxfield",
                        margin: "10 10 10 10",
                        langIdentifier: "VertexWeighted",
                        name: "VertexWeighted",
                        fieldLabel: "Vertex Weighted",
                        labelWidth: "150px",
                        labelStyle: "text-align:right;",
                        listeners: {
                          change: function (el) {
                            if (!el.getValue()) {
                              el.up("graphMainView")
                                .down("[name=VertexWeightFrom]")
                                .disable();
                              el.up("graphMainView")
                                .down("[name=VertexWeightTo]")
                                .disable();
                            } else {
                              el.up("graphMainView")
                                .down("[name=VertexWeightFrom]")
                                .enable();
                              el.up("graphMainView")
                                .down("[name=VertexWeightTo]")
                                .enable();
                            }
                          },
                        },
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
                            margin: "0 5 0 0",
                            name: "VertexWeightFrom",
                            langIdentifier: "VertexWeightFrom",
                            minValue: -1000000,
                            maxValue: 1000000,
                            flex: 1,
                            emptyText: "Vertex Weight From",
                            disabled: true,
                            allowDecimals: false,
                            allowBlank: false,
                            listeners: {
                              change: function (el) {
                                el.up("graphMainView")
                                  .down("[name=VertexWeightTo]")
                                  .minValue=el.getValue();
                              },
                            },
                          },
                          {
                            xtype: "numberfield",
                            margin: "0 0 0 5",
                            name: "VertexWeightTo",
                            langIdentifier: "VertexWeightTo",
                            labelWidth: 220,
                            minValue: -1000000,
                            maxValue: 1000000,
                            flex: 1,
                            emptyText: "Vertex Weight To",
                            disabled: true,
                            allowDecimals: false,
                            allowBlank: false,
                            listeners: {
                              change: function (el) {
                                el.up("graphMainView")
                                  .down("[name=VertexWeightFrom]")
                                  .maxValue=el.getValue();
                              },
                            },
                          },
                        ],
                      },
                      {
                        xtype: "checkboxfield",
                        name: "EdgeWeighted",
                        langIdentifier: "EdgeWeighted",
                        margin: "10 10 10 10",
                        labelWidth: "150px",
                        labelStyle: "text-align:right;",
                        fieldLabel: "Edge Weighted",
                        listeners: {
                          change: function (el) {
                            if (!el.getValue()) {
                              el.up("graphMainView")
                                .down("[name=EdgeWeightFrom]")
                                .disable();
                              el.up("graphMainView")
                                .down("[name=EdgeWeightTo]")
                                .disable();
                            } else {
                              el.up("graphMainView")
                                .down("[name=EdgeWeightFrom]")
                                .enable();
                              el.up("graphMainView")
                                .down("[name=EdgeWeightTo]")
                                .enable();
                            }
                          },
                        },
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
                            flex: 1,
                            margin: "0 5 0 0",
                            name: "EdgeWeightFrom",
                            langIdentifier: "EdgeWeightFrom",
                            minValue: -1000000,
                            maxValue: 1000000,
                            emptyText: "Edge Weight From",
                            disabled: true,
                            allowDecimals: false,
                            allowBlank: false,
                            listeners: {
                              change: function (el) {
                                el.up("graphMainView")
                                  .down("[name=EdgeWeightTo]")
                                  .minValue=el.getValue();
                              },
                            },
                          },
                          {
                            xtype: "numberfield",
                            flex: 1,
                            margin: "0 0 0 5",
                            name: "EdgeWeightTo",
                            langIdentifier: "EdgeWeightTo",
                            minValue: -1000000,
                            maxValue: 1000000,
                            emptyText: "Edge Weight To",
                            disabled: true,
                            allowDecimals: false,
                            allowBlank: false,
                            listeners: {
                              change: function (el) {
                                el.up("graphMainView")
                                  .down("[name=EdgeWeightFrom]")
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
                            margin: "0 5 0 0",
                            name: "VertexCountRangeFrom",
                            langIdentifier: "VertexCountRangeFrom",
                            flex: 1,
                            minValue: 0,
                            maxValue: 100000,
                            emptyText: "Vertex Count Range From",
                            allowDecimals: false,
                            allowBlank: false,
                            listeners: {
                              change: function (el) {
                                el.up("graphMainView")
                                  .down("[name=VertexCountRangeTo]")
                                  .minValue=el.getValue();
                              },
                            },
                          },
                          {
                            xtype: "numberfield",
                            margin: "0 0 0 5",
                            name: "VertexCountRangeTo",
                            langIdentifier: "VertexCountRangeTo",
                            flex: 1,
                            labelWidth: 220,
                            minValue: 0,
                            maxValue: 100000,
                            emptyText: "Vertex Count Range To",
                            allowDecimals: false,
                            allowBlank: false,
                            listeners: {
                              change: function (el) {
                                el.up("graphMainView")
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
                            margin: "0 5 0 0",
                            name: "EdgeCountRangeFrom",
                            langIdentifier: "EdgeCountRangeFrom",
                            labelWidth: 220,
                            minValue: 0,
                            maxValue: 100000,
                            emptyText: "Edge Count Range From",
                            flex: 1,
                            allowDecimals: false,
                            allowBlank: false,
                            listeners: {
                              change: function (el) {
                                el.up("graphMainView")
                                  .down("[name=EdgeCountRangeTo]")
                                  .minValue=el.getValue();
                              },
                            },
                          },
                          {
                            xtype: "numberfield",
                            margin: "0 0 0 5",
                            name: "EdgeCountRangeTo",
                            langIdentifier: "EdgeCountRangeTo",
                            labelWidth: 220,
                            minValue: 0,
                            maxValue: 100000,
                            emptyText: "Edge Count Range From",
                            flex: 1,
                            allowDecimals: false,
                            allowBlank: false,
                            listeners: {
                              change: function (el) {
                                el.up("graphMainView")
                                  .down("[name=EdgeCountRangeFrom]")
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
                        name: "Answer",
                        langIdentifier: "Answer",
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
    },
  });
  