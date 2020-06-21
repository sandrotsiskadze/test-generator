Ext.define("test.view.main.Main.MazeMainView", {
    extend: "Ext.form.Panel",
    alias: "widget.mazeMainView",
    initComponent: function() {
        Ext.apply(this, {
            border: false,
            bodyPadding: 10,
            items: [
            {
                xtype: "container",
                margin: "10 10 10 0",
                layout: {
                    type: "hbox",
                    align: "stretch"
                },
                items: [
                    {
                        xtype: 'numberfield',
                        name: 'DimensionX',
                        labelWidth: 220,
                        minValue: 0,
                        fieldLabel: 'Dimension-X',
                        labelStyle: "text-align:right;",
                        allowDecimals: false
                    },
                    {
                        xtype: 'numberfield',
                        name: 'DimensionY',
                        labelWidth: 220,
                        minValue: 0,
                        fieldLabel: 'Dimension-Y',
                        labelStyle: "text-align:right;",
                        allowDecimals: false
                    }
                ]
            },{
                xtype: "container",
                margin: "10 10 10 0",
                layout: {
                    type: "hbox",
                    align: "stretch"
                },
                items: [{
                    xtype: 'textfield',
                    name: 'WallCharacter',
                    labelWidth: 220,
                    minValue: 0,
                    maskRe: /[A-Za-z]/,
                    maxLength: 1,
                    fieldLabel: 'Wall Character',
                    labelStyle: "text-align:right;"
                }, {
                    xtype: 'textfield',
                    name: 'PathCharacter',
                    labelWidth: 220,
                    minValue: 0,
                    maskRe: /[A-Za-z]/,
                    maxLength: 1,
                    fieldLabel: 'Path Character',
                    labelStyle: "text-align:right;"
                }]
            }, {
                xtype: "container",
                margin: "10 10 10 0",
                layout: {
                    type: "hbox",
                    align: "stretch"
                },
                items: [{
                    xtype: 'checkboxfield',
                    name: 'Connected',
                    labelWidth: 220,
                    fieldLabel: 'Connected',
                    labelStyle: "text-align:right;"
                }]
            }, {
                xtype: "container",
                margin: "10 10 10 0",
                layout: {
                    type: "hbox",
                    align: "stretch"
                },
                items: [{
                    xtype: 'button',
                    margin: "10 10 10 220",
                    text: 'Generate',
                    listeners: {
                        click: 'onGenerateClick'
                    }
                }]
            }]

        });

        this.callParent();
    }
});