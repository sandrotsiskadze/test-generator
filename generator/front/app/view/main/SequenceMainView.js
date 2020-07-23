Ext.define("test.view.main.Main.SequenceMainView", {
  extend: "Ext.panel.Panel",
  alias: "widget.sequenceMainView",
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
              name: "SequenceMainView",
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
                              el.up("sequenceMainView")
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
                              el.up("sequenceMainView")
                                .down("[name=ElementCountRangeFrom]")
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
                          name: "ElementValueRangeFrom",
                          langIdentifier:"ElementValueRangeFrom",
                          flex: 1,
                          margin: "0 5 0 0",
                          minValue: -1000000,
                          maxValue: 1000000,
                          emptyText: "Element Value Range From",
                          allowDecimals: false,
                          allowBlank: false,
                          listeners: {
                            change: function (el) {
                              el.up("sequenceMainView")
                                .down("[name=ElementValueRangeTo]")
                                .minValue=el.getValue();
                            },
                          }, 
                        },
                        {
                          xtype: "numberfield",
                          name: "ElementValueRangeTo",
                          langIdentifier:"ElementValueRangeTo",
                          flex: 1,
                          margin: "0 0 0 5",
                          minValue: -1000000,
                          maxValue: 1000000,
                          emptyText: "Element Value Range From",
                          allowDecimals: false,
                          allowBlank: false,
                          listeners: {
                            change: function (el) {
                              el.up("sequenceMainView")
                                .down("[name=ElementValueRangeFrom]")
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
                          xtype: "checkboxfield",
                          langIdentifier:"Permutation",
                          name: "Permutation",
                          flex: 1,
                          margin: "0 5 0 ",
                          fieldLabel: "Permutation",
                          labelStyle: "text-align:right;",
                          listeners: {
                            change: function (el) {
                              if (!el.getValue()) {
                                el.up("sequenceMainView")
                                  .down("[name=PermutationNumber]")
                                  .disable();
                                el.up("sequenceMainView")
                                  .down("[name=ElementCountRangeFrom]")
                                  .enable();
                                el.up("sequenceMainView")
                                  .down("[name=ElementCountRangeTo]")
                                  .enable();
                                el.up("sequenceMainView")
                                  .down("[name=ElementValueRangeFrom]")
                                  .enable();
                                el.up("sequenceMainView")
                                  .down("[name=ElementValueRangeTo]")
                                  .enable();
                              } else {
                                el.up("sequenceMainView")
                                  .down("[name=PermutationNumber]")
                                  .enable();
                                el.up("sequenceMainView")
                                  .down("[name=ElementCountRangeFrom]")
                                  .disable();
                                el.up("sequenceMainView")
                                  .down("[name=ElementCountRangeTo]")
                                  .disable();
                                el.up("sequenceMainView")
                                  .down("[name=ElementValueRangeFrom]")
                                  .disable();
                                el.up("sequenceMainView")
                                  .down("[name=ElementValueRangeTo]")
                                  .disable();
                              }
                            },
                          },
                        },
                        {
                          xtype: "numberfield",
                          name: "PermutationNumber",
                          langIdentifier:"PermutationNumber",
                          flex: 1,
                          margin: "0 0 0 5",
                          disabled: true,
                          minValue: 0,
                          maxValue: 1000000,
                          emptyText: "Permutation Number",
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
                          xtype: "checkboxfield",
                          name: "Query",
                          langIdentifier:"Query",
                          flex: 1,
                          margin: "0 5 0 0",
                          fieldLabel: "Query",
                          labelStyle: "text-align:right;",
                          listeners: {
                            change: function (el) {
                              if (!el.getValue()) {
                                el.up("sequenceMainView")
                                  .down("[name=QueryCount]")
                                  .disable();
                              } else {
                                el.up("sequenceMainView")
                                  .down("[name=QueryCount]")
                                  .enable();
                              }
                            },
                          },
                        },
                        {
                          xtype: "numberfield",
                          name: "QueryCount",
                          langIdentifier:"QueryCount",
                          flex: 1,
                          margin: "0 0 0 5",
                          disabled: true,
                          minValue: 1,
                          maxValue: 200000,
                          emptyText: "Query Count",
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
