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
                langIdentifier: "UserCode",
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
                    langIdentifier: "UserChoice",
                    allowBlank: false,
                    margin: "0 5 0 0",
                    emptyText: "Choose",
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
                        {
                          type: "string",
                          name: "langIdentifier",
                        }
                      ],
                      data: [
                        {
                          name: "Map",
                          id: 1,
                          langIdentifier: "Map",
                        },
                        {
                          name: "Filter",
                          id: 2,
                          langIdentifier: "Filter",
                        },
                        {
                          name: "Reduce",
                          id: 3,
                          langIdentifier: "Reduce",
                        },
                        {
                          name: "Get Answer",
                          id: 4,
                          langIdentifier: "Get_Answer"
                        },
                      ],
                    }),
                  },
                  {
                    xtype: "button",
                    langIdentifier: "Send",
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
                langIdentifier: "Send",
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
  