Ext.define("test.view.main.Main.StringMainView", {
  extend: "Ext.form.Panel",
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
                  anchor: "50%",
                  margin: "10 0 10 10",
                  layout: {
                    type: "hbox",
                    align: "stretch",
                  },
                  items: [
                    {
                      xtype: "textfield",
                      name: "Alphabet",
                      flex: 1,
                      margin: "0 5 0 0",
                      minValue: 0,
                      emptyText: "Alphabet",
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
            {
              xtype: "textareafield",
              margin: "10 10 10 10",
              height: 300,
              flex: 1,
              name: "Code",
              emptyText: "YourCodeHere",
            },
          ],
        },
      ],
    });

    this.callParent();
  },
});
