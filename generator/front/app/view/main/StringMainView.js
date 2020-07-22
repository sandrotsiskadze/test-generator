Ext.define("test.view.main.Main.StringMainView", {
  extend: "Ext.panel.Panel",
  alias: "widget.stringMainView",
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
              name: "StringMainView",
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
                          name: "ElementCountRangeFrom",
                          langIdentifier:"ElementCountRangeFrom",
                          flex: 1,
                          margin: "0 5 0 0",
                          minValue: 0,
                          maxValue: 1000000,
                          emptyText: "Element Count Range From",
                          allowDecimals: false,
                          allowBlank: false,
                          listeners: {
                            change: function (el) {
                              el.up("stringMainView")
                                .down("[name=ElementCountRangeTo]")
                                .minValue=el.getValue();
                            },
                          },
                        },
                        {
                          xtype: "numberfield",
                          name: "ElementCountRangeTo",
                          langIdentifier:"ElementCountRangeTo",
                          flex: 1,
                          margin: "0 0 0 5",
                          minValue: 0,
                          maxValue: 1000000,
                          emptyText: "Element Count Range To",
                          allowDecimals: false,
                          allowBlank: false,
                          listeners: {
                            change: function (el) {
                              el.up("stringMainView")
                                .down("[name=ElementCountRangeFrom]")
                                .maxValue=el.getValue();
                            },
                          },
                        },
                      ],
                    },
                    {
                      xtype: "container",
                      anchor: "50%",
                      margin: "10 0 10 10",
                      layout: {
                        type: "hbox",
                        align: "stretch",
                      },
                      items: [
                        {
                          xtype: "textfield",
                          langIdentifier:"Alphabet",
                          name: "Alphabet",
                          flex: 1,
                          margin: "0 5 0 0",
                          minValue: 0,
                          emptyText: "Alphabet",
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
                          text: "Generate",
                          langIdentifier:"Generate",
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
                      langIdentifier:"Answer",
                      labelAlign: "top",
                      fieldLabel: "Answer",
                      submitValue: false,
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
