Ext.define("test.view.main.Main.MazeMainView", {
  extend: "Ext.panel.Panel",
  alias: "widget.mazeMainView",
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
              name: "MazeMainView",
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
                          name: "DimensionX",
                          flex: 1,
                          margin: "0 5 0 0",
                          labelWidth: 220,
                          minValue: 0,
                          emptyText: "Dimension-X",
                          allowDecimals: false,
                        },
                        {
                          xtype: "numberfield",
                          name: "DimensionY",
                          flex: 1,
                          margin: "0 0 0 5",
                          labelWidth: 220,
                          minValue: 0,
                          emptyText: "Dimension-Y",
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
                          xtype: "textfield",
                          name: "WallCharacter",
                          flex: 1,
                          margin: "0 5 0 0",
                          minValue: 0,
                          maskRe: /[A-Za-z]/,
                          maxLength: 1,
                          emptyText: "Wall Character",
                        },
                        {
                          xtype: "textfield",
                          name: "PathCharacter",
                          flex: 1,
                          margin: "0 0 0 5",
                          minValue: 0,
                          maskRe: /[A-Za-z]/,
                          maxLength: 1,
                          emptyText: "Path Character",
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
                          name: "Connected",
                          labelStyle: "text-align:right;",
                          fieldLabel: "Connected",
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
