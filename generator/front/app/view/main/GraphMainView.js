Ext.define("test.view.main.Main.GraphMainView", {
    extend: "Ext.form.Panel",
    alias: "widget.graphMainView",
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
                items: [{
                        xtype: 'combobox',
                        labelWidth: 220,
                        name: "GraphType",
                        labelStyle: "text-align:right;",
                        emptyText: "გრაფის ტიპი",
                        fieldLabel: "გრაფის ტიპი",
                        displayField: 'name',
                        valueField: 'id',
                        multiSelect: true,
                        store: Ext.create('Ext.data.Store', {
                            fields: [{
                                    type: 'string',
                                    name: 'name'
                                },
                                {
                                    type: 'string',
                                    name: 'id'
                                }
                            ],
                            data: [{
                                    name: 'directed ',
                                    id: 1
                                },
                                {
                                    name: 'multiple edges',
                                    id: 2
                                },
                                {
                                    name: 'looped',
                                    id: 3
                                },
                            ]
                        }),
                        listeners: {
                            // change: 'onTypeChange'
                        }
                    },
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
                                    name: 'default ',
                                    id: 1
                                },
                                {
                                    name: 'connected',
                                    id: 2
                                },
                                {
                                    name: 'acyclic',
                                    id: 3
                                },
                                {
                                    name: 'complete',
                                    id: 4
                                },
                                {
                                    name: 'bipartite',
                                    id: 5
                                },
                            ]
                        }),
                    }
                ]
            }, {
                xtype: 'checkboxfield',
                name: 'WeightedVertex',
                labelWidth: 220,
                fieldLabel: 'Vertex Weighted',
                labelStyle: "text-align:right;",
                listeners: {
                    change: function(el) {
                        if(!el.getValue()) {
                            el.up('graphMainView').down('[name=VertexWeightFrom]').disable();
                            el.up('graphMainView').down('[name=VertexWeightTo]').disable();
                        } else {
                            el.up('graphMainView').down('[name=VertexWeightFrom]').enable();
                            el.up('graphMainView').down('[name=VertexWeightTo]').enable();
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
                        name: 'EdgeCountRangeFrom',
                        labelWidth: 220,
                        minValue: 0,
                        fieldLabel: 'Edge Count Range From',
                        labelStyle: "text-align:right;",
                        allowDecimals: false
                    },
                    {
                        xtype: 'numberfield',
                        name: 'EdgeCountRangeTo',
                        labelWidth: 220,
                        minValue: 0,
                        fieldLabel: 'Edge Count Range From',
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