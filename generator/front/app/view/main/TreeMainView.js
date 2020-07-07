Ext.define("test.view.main.Main.TreeMainView", {
  extend: "Ext.panel.Panel",
  alias: "widget.treeMainView",
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
              name: "TreeMainView",
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
                          flex: 1,
                          margin: "0 5 0 0",
                          emptyText: "დასახელება",
                          displayField: "name",
                          valueField: "id",
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
                                name: "forest ",
                                id: 1,
                              },
                              {
                                name: "connected",
                                id: 2,
                              },
                              {
                                name: "binary",
                                id: 3,
                              },
                              {
                                name: "balanced",
                                id: 4,
                              },
                            ],
                          }),
                        },
                        {
                          xtype: "checkboxfield",
                          name: "ArrayBased",
                          flex: 1,
                          margin: "0 0 0 5",
                          fieldLabel: "Array Based",
                          labelStyle: "text-align:right;",
                        },
                      ],
                    },
                    {
                      xtype: "checkboxfield",
                      name: "VertexWeighted",
                      flex: 1,
                      margin: "10 10 10 10",
                      fieldLabel: "Vertex Weighted",
                      labelStyle: "text-align:right;",
                      listeners: {
                        change: function (el) {
                          if (!el.getValue()) {
                            el.up("treeMainView")
                              .down("[name=VertexWeightFrom]")
                              .disable();
                            el.up("treeMainView")
                              .down("[name=VertexWeightTo]")
                              .disable();
                          } else {
                            el.up("treeMainView")
                              .down("[name=VertexWeightFrom]")
                              .enable();
                            el.up("treeMainView")
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
                          name: "VertexWeightFrom",
                          flex: 1,
                          margin: "0 5 0 0",
                          minValue: 0,
                          emptyText: "Vertex Weight From",
                          disabled: true,
                          allowDecimals: false,
                        },
                        {
                          xtype: "numberfield",
                          name: "VertexWeightTo",
                          flex: 1,
                          margin: "0 0 0 5",
                          minValue: 0,
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
                      flex: 1,
                      fieldLabel: "Edge Weighted",
                      labelStyle: "text-align:right;",
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
                          name: "EdgeWeightFrom",
                          flex: 1,
                          margin: "0 5 0 0",
                          minValue: 0,
                          emptyText: "Edge Weight From",
                          disabled: true,
                          allowDecimals: false,
                        },
                        {
                          xtype: "numberfield",
                          name: "EdgeWeightTo",
                          flex: 1,
                          margin: "0 0 0 5",
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
                          name: "VertexCountRangeFrom",
                          flex: 1,
                          margin: "0 5 0 0",
                          minValue: 0,
                          emptyText: "Vertex Count Range From",
                          allowDecimals: false,
                        },
                        {
                          xtype: "numberfield",
                          name: "VertexCountRangeTo",
                          flex: 1,
                          margin: "0 0 0 5",
                          minValue: 0,
                          emptyText: "Vertex Count Range To",
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
                          name: "MaximalChildren ",
                          flex: 1,
                          margin: "0 5 0 0",
                          minValue: 0,
                          emptyText: "Maximal Children ",
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
  },
});
