Ext.define("test.view.main.Main.CodeAreaMainView", {
    extend: "Ext.form.Panel",
    alias: "widget.codeAreaMainView",
    initComponent: function () {
      Ext.apply(this, {
        border: false,
        items: [
          {
            xtype: "container",
            layout: {
              type: "vbox",
              align: "stretch",
            },
            items: [
              {
                xtype: "textareafield",
                margin: "10 10 10 10",
                height: 300,
                flex: 1,
                allowBlank: false,
                name: "UserCode",
                emptyText: "YourCodeHere",
              },
              {
                xtype: "container",
                margin: "0 10 0 10",
                layout: {
                  type: "hbox",
                  align: "stretch",
                },
                items: [
                  {
                    xtype: "combobox",
                    name: "UserChoice",
                    allowBlank: false,
                    margin: "0 5 0 0",
                    emptyText: "აირჩიეთ",
                    displayField: "name",
                    valueField: "id",
                    flex: 1,
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
                          name: "Map",
                          id: 1,
                        },
                        {
                          name: "Filter",
                          id: 2,
                        },
                        {
                          name: "Reduce",
                          id: 3,
                        },
                        {
                          name: "Get Answer",
                          id: 4,
                        },
                      ],
                    }),
                  },
                  {
                    xtype: "button",
                    text: "Send",
                    listeners: {
                      click: "onCodeSendClick",
                    },
                  },
                ],
              },
              {
                xtype: "textareafield",
                margin: "10 10 10 10",
                height: 300,
                readonly: true,
                flex: 1,
                name: "UserAnswer",
                emptyText: "CodeAnswer",
              },
            ],
          },
        ],
      });
  
      this.callParent();
    },
  });
  