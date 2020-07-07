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
                          flex: 1,
                          margin: "0 5 0 0",
                          minValue: 0,
                          emptyText: "Element Count Range From",
                          allowDecimals: false,
                        },
                        {
                          xtype: "numberfield",
                          name: "ElementCountRangeTo",
                          flex: 1,
                          margin: "0 0 0 5",
                          minValue: 0,
                          emptyText: "Element Count Range To",
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
                          name: "ElementValueRangeFrom",
                          flex: 1,
                          margin: "0 5 0 0",
                          minValue: 0,
                          emptyText: "Element Value Range From",
                          allowDecimals: false,
                        },
                        {
                          xtype: "numberfield",
                          name: "ElementValueRangeTo",
                          flex: 1,
                          margin: "0 0 0 5",
                          minValue: 0,
                          emptyText: "Element Value Range From",
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
                          xtype: "checkboxfield",
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
                              } else {
                                el.up("sequenceMainView")
                                  .down("[name=PermutationNumber]")
                                  .enable();
                              }
                            },
                          },
                        },
                        {
                          xtype: "numberfield",
                          name: "PermutationNumber",
                          flex: 1,
                          margin: "0 0 0 5",
                          disabled: true,
                          minValue: 0,
                          emptyText: "Permutation Number",
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
                          xtype: "checkboxfield",
                          name: "Query",
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
                          flex: 1,
                          margin: "0 0 0 5",
                          disabled: true,
                          minValue: 0,
                          emptyText: "Query Count",
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
