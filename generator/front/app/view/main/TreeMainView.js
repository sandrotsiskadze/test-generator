Ext.define("test.view.main.Main.TreeMainView", {
    extend: "Ext.form.Panel",
    alias: "widget.treeMainView",
    initComponent: function() {
        Ext.apply(this, {
            border: false,
            bodyPadding: 10,
            items: [{
                xtype: "container",
                margin: "10 10 10 0",
                layout: {
                    type: "hbox",
                    align: "stretch"
                },
                items: [
                    {
                        xtype: 'combobox',
                        labelWidth: 220,
                        labelStyle: "text-align:right;",
                        emptyText: "დასახელება",
                        fieldLabel: "დასახელება",
                        displayField: 'name',
                        valueField: 'id',
                        store: Ext.create('Ext.data.Store', {
                            fields: [{
                                    type: 'string',
                                    name: 'name'
                                },
                                {
                                    type: 'int',
                                    name: 'id'
                                }
                            ],
                            data: [{
                                    name: 'forest ',
                                    id: 1
                                },
                                {
                                    name: 'connected',
                                    id: 2
                                },
                                {
                                    name: 'binary',
                                    id: 3
                                },
                                {
                                    name: 'balanced',
                                    id: 4
                                }
                            ]
                        }),
                    },
                    {
                        xtype: 'checkboxfield',
                        name: 'ArrayBased',
                        labelWidth: 220,
                        fieldLabel: 'Array Based',
                        labelStyle: "text-align:right;",
                    }
                ]
            }, {
                xtype: 'checkboxfield',
                name: 'VertexWeighted',
                labelWidth: 220,
                fieldLabel: 'Vertex Weighted',
                labelStyle: "text-align:right;",
                listeners: {
                    change: function(el) {
                        if(!el.getValue()) {
                            el.up('treeMainView').down('[name=VertexWeightFrom]').disable();
                            el.up('treeMainView').down('[name=VertexWeightTo]').disable();
                        } else {
                            el.up('treeMainView').down('[name=VertexWeightFrom]').enable();
                            el.up('treeMainView').down('[name=VertexWeightTo]').enable();
                        }
                    }
                }
            }, {
                xtype: "container",
                margin: "10 10 10 0",
                layout: {
                    type: "hbox",
                    align: "stretch"
                },
                items: [
                    {
                        xtype: 'numberfield',
                        name: 'VertexWeightFrom',
                        labelWidth: 220,
                        minValue: 0,
                        fieldLabel: 'Vertex Weight From',
                        labelStyle: "text-align:right;",
                        disabled: true,
                        allowDecimals: false
                    },
                    {
                        xtype: 'numberfield',
                        name: 'VertexWeightTo',
                        labelWidth: 220,
                        minValue: 0,
                        fieldLabel: 'Vertex Weight To',
                        labelStyle: "text-align:right;",
                        disabled: true,
                        allowDecimals: false
                    }
                ]
            },
            {
                xtype: 'checkboxfield',
                name: 'EdgeWeighted',
                labelWidth: 220,
                fieldLabel: 'Edge Weighted',
                labelStyle: "text-align:right;",
                listeners: {
                    change: function(el) {
                        if(!    el.getValue()) {
                            el.up('graphMainView').down('[name=EdgeWeightFrom]').disable();
                            el.up('graphMainView').down('[name=EdgeWeightTo]').disable();
                        } else {
                            el.up('graphMainView').down('[name=EdgeWeightFrom]').enable();
                            el.up('graphMainView').down('[name=EdgeWeightTo]').enable();
                        }
                    }
                }
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
                        name: 'EdgeWeightFrom',
                        labelWidth: 220,
                        minValue: 0,
                        fieldLabel: 'Edge Weight From',
                        labelStyle: "text-align:right;",
                        disabled: true,
                        allowDecimals: false
                    },
                    {
                        xtype: 'numberfield',
                        name: 'EdgeWeightTo',
                        labelWidth: 220,
                        minValue: 0,
                        fieldLabel: 'Edge Weight To',
                        labelStyle: "text-align:right;",
                        disabled: true,
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
                        name: 'VertexCountRangeFrom',
                        labelWidth: 220,
                        minValue: 0,
                        fieldLabel: 'Vertex Count Range From',
                        labelStyle: "text-align:right;",
                        allowDecimals: false
                    },
                    {
                        xtype: 'numberfield',
                        name: 'VertexCountRangeTo',
                        labelWidth: 220,
                        minValue: 0,
                        fieldLabel: 'Vertex Count Range To',
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
                        name: 'MaximalChildren ',
                        labelWidth: 220,
                        minValue: 0,
                        fieldLabel: 'Maximal Children ',
                        labelStyle: "text-align:right;",
                        allowDecimals: false
                    }
                ]
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