Ext.define("test.view.main.Main.SequenceMainView", {
    extend: "Ext.form.Panel",
    alias: "widget.sequenceMainView",
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
            }, 
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
                        name: 'ElementValueRangeFrom',
                        labelWidth: 220,
                        minValue: 0,
                        fieldLabel: 'Element Value Range From',
                        labelStyle: "text-align:right;",
                        allowDecimals: false
                    },
                    {
                        xtype: 'numberfield',
                        name: 'ElementValueRangeTo',
                        labelWidth: 220,
                        minValue: 0,
                        fieldLabel: 'Element Value Range From',
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
                    xtype: 'checkboxfield',
                    name: 'Permutation',
                    labelWidth: 220,
                    fieldLabel: 'Permutation',
                    labelStyle: "text-align:right;",
                    listeners: {
                        change: function(el) {
                            if(!    el.getValue()) {
                                el.up('sequenceMainView').down('[name=PermutationNumber]').disable();
                            } else {
                                el.up('sequenceMainView').down('[name=PermutationNumber]').enable();
                            }
                        }
                    }
                },
                {
                    margin: "0 0 0 155",
                    xtype: 'numberfield',
                    name: 'PermutationNumber',
                    labelWidth: 220,
                    disabled: true,
                    minValue: 0,
                    fieldLabel: 'Permutation Number',
                    labelStyle: "text-align:right;",
                    allowDecimals: false
                }]
            },{
                xtype: "container",
                margin: "10 10 10 0",
                layout: {
                    type: "hbox",
                    align: "stretch"
                },
                items: [{
                    xtype: 'checkboxfield',
                    name: 'Query',
                    labelWidth: 220,
                    fieldLabel: 'Query',
                    labelStyle: "text-align:right;",
                    listeners: {
                        change: function(el) {
                            if(!    el.getValue()) {
                                el.up('sequenceMainView').down('[name=QueryCount]').disable();
                            } else {
                                el.up('sequenceMainView').down('[name=QueryCount]').enable();
                            }
                        }
                    }
                },
                {
                    xtype: 'numberfield',
                    margin: "0 0 0 155",
                    name: 'QueryCount',
                    labelWidth: 220,
                    disabled: true,
                    minValue: 0,
                    fieldLabel: 'Query Count',
                    labelStyle: "text-align:right;",
                    allowDecimals: false
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