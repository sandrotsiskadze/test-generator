Ext.define("test.view.main.Main.StringMainView", {
    extend: "Ext.form.Panel",
    alias: "widget.stringMainView",
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
                        name: 'ElementCountRangeFrom',
                        labelWidth: 220,
                        minValue: 0,
                        fieldLabel: 'Element Count Range From',
                        labelStyle: "text-align:right;",
                        allowDecimals: false
                    },
                    {
                        xtype: 'numberfield',
                        name: 'ElementCountRangeTo',
                        labelWidth: 220,
                        minValue: 0,
                        fieldLabel: 'Element Count Range To',
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
                    name: 'Alphabet',
                    labelWidth: 220,
                    minValue: 0,
                    fieldLabel: 'Alphabet',
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