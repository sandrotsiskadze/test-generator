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
                          langIdentifier:"TreeType",
                          emptyText: "treeType",
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
                                name: "Forest",
                                id: 1,
                              },
                              {
                                name: "Tree",
                                id: 2,
                              },
                              {
                                name: "Binary",
                                id: 3,
                              },
                              {
                                name: "Balanced",
                                id: 4,
                              },
                            ],
                          }),
                          allowBlank: false,
                        },
                        {
                          xtype: "checkboxfield",
                          name: "ArrayBased",
                          labelWidth: "150px",
                          langIdentifier:"ArrayBased",
                          flex: 1,
                          margin: "0 0 0 5",
                          fieldLabel: "Array Based",
                          labelStyle: "text-align:right;",
                          allowBlank: false,
                        },
                      ],
                    },
                    {
                      xtype: "checkboxfield",
                      name: "VertexWeighted",
                      langIdentifier:"VertexWeighted",
                      flex: 1,
                      margin: "10 10 10 10",
                      labelWidth: "150px",
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
                          langIdentifier:"VertexWeightFrom",
                          flex: 1,
                          margin: "0 5 0 0",
                          minValue: 0,
                          emptyText: "Vertex Weight From",
                          disabled: true,
                          allowDecimals: false,
                          allowBlank: false,
                        },
                        {
                          xtype: "numberfield",
                          name: "VertexWeightTo",
                          langIdentifier:"VertexWeightTo",
                          flex: 1,
                          margin: "0 0 0 5",
                          minValue: 0,
                          emptyText: "Vertex Weight To",
                          disabled: true,
                          allowDecimals: false,
                          allowBlank: false,
                        },
                      ],
                    },
                    {
                      xtype: "checkboxfield",
                      name: "EdgeWeighted",
                      langIdentifier:"EdgeWeighted",
                      margin: "10 10 10 10",
                      flex: 1,
                      labelWidth: "150px",
                      fieldLabel: "Edge Weighted",
                      labelStyle: "text-align:right;",
                      listeners: {
                        change: function (el) {
                          if (!el.getValue()) {
                            el.up("treeMainView")
                              .down("[name=EdgeWeightFrom]")
                              .disable();
                            el.up("treeMainView")
                              .down("[name=EdgeWeightTo]")
                              .disable();
                          } else {
                            el.up("treeMainView")
                              .down("[name=EdgeWeightFrom]")
                              .enable();
                            el.up("treeMainView")
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
                          langIdentifier:"EdgeWeightFrom",
                          flex: 1,
                          margin: "0 5 0 0",
                          minValue: 0,
                          emptyText: "Edge Weight From",
                          disabled: true,
                          allowDecimals: false,
                          allowBlank: false,
                        },
                        {
                          xtype: "numberfield",
                          name: "EdgeWeightTo",
                          langIdentifier:"EdgeWeightTo",
                          flex: 1,
                          margin: "0 0 0 5",
                          minValue: 0,
                          emptyText: "Edge Weight To",
                          disabled: true,
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
                      },
                      items: [
                        {
                          xtype: "numberfield",
                          name: "VertexCountRangeFrom",
                          langIdentifier:"VertexCountRangeFrom",
                          flex: 1,
                          margin: "0 5 0 0",
                          minValue: 0,
                          emptyText: "Vertex Count Range From",
                          allowDecimals: false,
                          allowBlank: false,
                        },
                        {
                          xtype: "numberfield",
                          name: "VertexCountRangeTo",
                          langIdentifier:"VertexCountRangeTo",
                          flex: 1,
                          margin: "0 0 0 5",
                          minValue: 0,
                          emptyText: "Vertex Count Range To",
                          allowDecimals: false,
                          allowBlank: false,
                        },
                      ],
                    },
                    {
                      xtype: "container",
                      anchor: "50%",
                      margin: "10 5 10 10",
                      layout: {
                        type: "hbox",
                        align: "stretch",
                      },
                      items: [
                        {
                          xtype: "numberfield",
                          name: "MaximalChildren",
                          langIdentifier:"MaximalChildren",
                          flex: 1,
                          minValue: 0,
                          emptyText: "Maximal Children ",
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
                          langIdentifier:"Generate",
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
                      langIdentifier:"Answer",
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
