Ext.define("test.view.main.Main.CoordinateSpaceMainView", {
    extend: "Ext.panel.Panel",
    alias: "widget.coordinateSpaceMainView",
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
                name: "CoordinateSpaceMainView",
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
                            langIdentifier: "DimensionXFrom",
                            name: "DimensionXFrom",
                            flex: 1,
                            margin: "0 5 0 0",
                            labelWidth: 220,
                            minValue: -100000,
                            maxValue: 100000,
                            emptyText: "Dimension-X From",
                            allowDecimals: false,
                            allowBlank: false,
                            listeners: {
                              change: function (el) {
                                el.up("mazeMainView")
                                  .down("[name=DimensionXTo]")
                                  .minValue=el.getValue();
                              },
                            },
                          },
                          {
                            xtype: "numberfield",
                            langIdentifier: "DimensionXTo",
                            name: "DimensionXTo",
                            flex: 1,
                            margin: "0 0 0 5",
                            labelWidth: 220,
                            minValue: -100000,
                            maxValue: 100000,
                            emptyText: "Dimension-X To",
                            allowDecimals: false,
                            allowBlank: false,
                            listeners: {
                              change: function (el) {
                                el.up("mazeMainView")
                                  .down("[name=DimensionXFrom]")
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
                            langIdentifier: "DimensionYFrom",
                            name: "DimensionYFrom",
                            flex: 1,
                            margin: "0 5 0 0",
                            labelWidth: 220,
                            minValue: -100000,
                            maxValue: 100000,
                            emptyText: "Dimension-Y From",
                            allowDecimals: false,
                            allowBlank: false,
                            listeners: {
                              change: function (el) {
                                el.up("mazeMainView")
                                  .down("[name=DimensionYTo]")
                                  .minValue=el.getValue();
                              },
                            },
                          },
                          {
                            xtype: "numberfield",
                            langIdentifier: "DimensionYTo",
                            name: "DimensionYTo",
                            flex: 1,
                            margin: "0 0 0 5",
                            labelWidth: 220,
                            minValue: -100000,
                            maxValue: 100000,
                            emptyText: "Dimension-Y To",
                            allowDecimals: false,
                            allowBlank: false,
                            listeners: {
                              change: function (el) {
                                el.up("mazeMainView")
                                  .down("[name=DimensionYFrom]")
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
                            langIdentifier: "VectorCountFrom",
                            name: "VectorCountFrom",
                            flex: 1,
                            margin: "0 5 0 0",
                            labelWidth: 220,
                            minValue: 0,
                            maxValue: 100000,
                            emptyText: "Vector Count From",
                            allowDecimals: false,
                            allowBlank: false,
                            listeners: {
                              change: function (el) {
                                el.up("mazeMainView")
                                  .down("[name=VectorCountTo]")
                                  .minValue=el.getValue();
                              },
                            },
                          },
                          {
                            xtype: "numberfield",
                            langIdentifier: "VectorCountTo",
                            name: "VectorCountTo",
                            flex: 1,
                            margin: "0 0 0 5",
                            labelWidth: 220,
                            minValue: 0,
                            maxValue: 100000,
                            emptyText: "Vector Count To",
                            allowDecimals: false,
                            allowBlank: false,
                            listeners: {
                              change: function (el) {
                                el.up("mazeMainView")
                                  .down("[name=VectorCountFrom]")
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
    },
  });
  