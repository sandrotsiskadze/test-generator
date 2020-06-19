Ext.define('test.store.Personnel', {
    extend: 'Ext.data.Store',

    alias: 'store.personnel',

    fields: [
        'name', 'email', 'phone'
    ],

    data: { items: [
        { name: 'directed ', id:'1' },
        { name: 'multiple edges',  id:'2' },
        { name: 'looped',   id: '3' },
    ]},

    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            rootProperty: 'items'
        }
    }
});
