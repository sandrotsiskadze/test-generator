Ext.define("test.view.main.Main.GraphMainView", {
    extend: "Ext.form.Panel",
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
                xtype: "container",
                flex: 1,
                layout: 'anchor',
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
                        emptyText: "გრაფის ტიპი",
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
                          ],
                          data: [
                            {
                              name: "directed ",
                              id: 1,
                            },
                            {
                              name: "multiple edges",
                              id: 2,
                            },
                            {
                              name: "looped",
                              id: 3,
                            },
                          ],
                        }),
                      },
                      {
                        xtype: "combobox",
                        margin: "0 0 0 5",
                        emptyText: "დასახელება",
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
                          ],
                          data: [
                            {
                              name: "default ",
                              id: 1,
                            },
                            {
                              name: "connected",
                              id: 2,
                            },
                            {
                              name: "acyclic",
                              id: 3,
                            },
                            {
                              name: "complete",
                              id: 4,
                            },
                            {
                              name: "bipartite",
                              id: 5,
                            },
                          ],
                        }),
                      },
                    ],
                  },
                  {
                    xtype: "checkboxfield",
                    margin: "10 10 10 10",
                    name: "WeightedVertex",
                    fieldLabel: "Vertex Weighted",
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
                        minValue: 0,
                        flex: 1,
                        emptyText: "Vertex Weight From",
                        disabled: true,
                        allowDecimals: false,
                      },
                      {
                        xtype: "numberfield",
                        margin: "0 0 0 5",
                        name: "VertexWeightTo",
                        labelWidth: 220,
                        minValue: 0,
                        flex: 1,
                        emptyText: "Vertex Weight To",
                        disabled: true,
                        allowDecimals: false,
                      },
                    ],
                  },
                  {
                    xtype: "checkboxfield",
                    name: "EdgeWeighted",
                    margin: "10 10 10 10",
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
                        minValue: 0,
                        emptyText: "Edge Weight From",
                        disabled: true,
                        allowDecimals: false,
                      },
                      {
                        xtype: "numberfield",
                        flex: 1,
                        margin: "0 0 0 5",
                        name: "EdgeWeightTo",
                        minValue: 0,
                        emptyText: "Edge Weight To",
                        disabled: true,
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
                        margin: "0 5 0 0",
                        name: "VertexCountRangeFrom",
                        flex: 1,
                        minValue: 0,
                        emptyText: "Vertex Count Range From",
                        allowDecimals: false,
                      },
                      {
                        xtype: "numberfield",
                        margin: "0 0 0 5",
                        name: "VertexCountRangeTo",
                        flex: 1,
                        labelWidth: 220,
                        minValue: 0,
                        emptyText: "Vertex Count Range To",
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
                        margin: "0 5 0 0",
                        name: "EdgeCountRangeFrom",
                        labelWidth: 220,
                        minValue: 0,
                        emptyText: "Edge Count Range From",
                        flex: 1,
                        allowDecimals: false,
                      },
                      {
                        xtype: "numberfield",
                        margin: "0 0 0 5",
                        name: "EdgeCountRangeTo",
                        labelWidth: 220,
                        minValue: 0,
                        emptyText: "Edge Count Range From",
                        flex: 1,
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
                      pack: "center"
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
                    fieldLabel: "Answer"
                  }
                ],
              }, {
                xtype: "textareafield",
                margin: "10 10 10 10",
                height: 300,
                flex : 1,
                name: "Code",
                emptyText: "YourCodeHere"
              }
            ],
          },
        ],
      });
  
      this.callParent();
    },
  });
  