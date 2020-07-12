Ext.define('test.utils.Helpers', {
    alternateClassName: ['Helpers'],
    singleton: true,
    serviceUrl: 'http://localhost:8000/',
    ajaxRequest: function (path, params, succAction, failAction) {
        Ext.Ajax.request({
            url: Helpers.serviceUrl + path,
            method: "Post",
            timeout: 90000,
            success: function (result) {
                succAction(result.responseText);
            },
            failure: function (result) {
                if (!Ext.isEmpty(failAction)) failAction(result);
            },
            jsonData: params
        });
    },
    setCookie: function(key, value) {
        // write cookie
        var myCookie = Ext.util.Cookies.set(key, value);
    },
    getCookie: function(key) {
        return Ext.util.Cookies.get(key);
    },
    setLanguage: function (parentContainer) {
        Ext.each(parentContainer.query('field'), function (cmp) {
            var langIdentifier = cmp.langIdentifier;
            if(!Ext.isEmpty(langIdentifier)) {
                var name = Helpers.getName(langIdentifier);
                if(!Ext.isEmpty(cmp.emptyText))
                    cmp.emptyText = name;
                else 
                    cmp.fieldLabel = name;
            }
            st = cmp.store;
            if (st) {
                for (i = 0; i < st.getCount(); i++) {
                    rec = Ext.StoreMgr.lookup(st).getAt(i);
                    name_lang = Helpers.getName(rec.data.langIdentifier)
                    rec.data.name = name_lang
                }
            }
            // cmp.setReadOnly(readOnly);
        });
        // Ext.each(parentContainet.query('container'), function (cmp) {
        //     if (cmp.hideOnReadonly == true)
        //         cmp.setVisible(!readOnly);
        // });
        Ext.each(parentContainer.query('button'), function (cmp) {
            var langIdentifier = cmp.langIdentifier;
            if(!Ext.isEmpty(langIdentifier)) {
                var name = Helpers.getName(langIdentifier);
                cmp.text = name;
            }
        });

        // Ext.each(parentContainer.query('actioncolumn'), function (cmp) {
        //     if (cmp.readOnlyMode == undefined || cmp.readOnlyMode == true)
        //         cmp.setVisible(!readOnly);
        // });
        // Ext.each(parentContainet.query('grid'), function (cmp) {
        //     Ext.each(cmp.plugins, function (plugin) {
        //         if (Ext.getClassName(plugin) == 'Ext.grid.plugin.CellEditing') {
        //             if (readOnly) plugin.disable();
        //             else plugin.enable();
        //         }
        //     });
        //     Ext.each(cmp.columns, function (column) {
        //         if (column.xtype == "checkcolumn") {
        //             if (readOnly) column.disable();
        //             else column.enable();
        //         }
        //     });
        // });
    },
    getName: function(key) {
        var value = Helpers.getCookie("language");
        
        if (value == "GEO")
            return Helpers.getGeoName(key);

        return Helpers.getEngName(key);
    },
    getEngName: function (key) {
        var map = [
            ["GraphKind", "Graph Kind"],
            ["GraphType", "Graph Type"],
            ["TreeType", "Tree Type"],
            ["VertexWeighted", "Vertex Weighted"],
            ["VertexWeightFrom", "Vertex Weight From"],
            ["VertexWeightTo", "Vertex Weight To"],
            ["EdgeWeighted", "Edge Weighted"],
            ["EdgeWeightFrom", "Edge Weight From"],
            ["EdgeWeightTo", "Edge Weight To"],
            ["VertexCountRangeFrom", "Vertex Count Range From"],
            ["VertexCountRangeTo", "Vertex Count Range To"],
            ["EdgeCountRangeFrom", "Edge Count Range From"],
            ["EdgeCountRangeTo", "Edge Count Range To"],
            ["Generate", "Generate"],
            ["Answer", "Answer"],
            ["UserCode", "User Code"],
            ["Send", "Send"],
            ["UserAnswer", "User Answer"],
            ["UserChoice", "User Choice"],
            ["MaximalWeight", "Maximal Weight"],
            ["DimensionXFrom", "Dimension-X From"],
            ["DimensionXTo", "Dimension-X To"],
            ["DimensionYFrom", "Dimension-Y From"],
            ["DimensionYTo", "Dimension-Y To"],
            ["WallCharacter", "Wall Character"],
            ["PathCharacter", "Path Character"],
            ["Connected", "Connected"],
            ["ElementCountRangeFrom", "Element Count Range From"],
            ["ElementCountRangeTo", "Element Count Range To"],
            ["ElementValueRangeFrom", "Element Value Range From"],
            ["ElementValueRangeTo", "Element Value Range To"],
            ["Permutation", "Permutation"],
            ["PermutationNumber", "Permutation Number"],
            ["Query", "Query"],
            ["QueryCount", "Query Count"],
            ["Alphabet", "Alphabet"],
            ["ArrayBased", "Array Based"],
            ["MaximalChildren", "Maximal Children"],
            ["Directed", "Directed"],
            ["Multiple_Edges", "Multiple Edges"],
            ["Looped", "Looped"],
            ["Default", "Default"],
            ["Connected", "Connected"],
            ["Acyclic", "Acyclic"],
            ["One_Cycle", "One Cycle"],
            ["Complete", "Complete"],
            ["Bipartite", "Bipartite"],
            ["Forest", "Forest"],
            ["Tree", "Tree"],
            ["Binary", "Binary"],
            ["Balanced", "Balanced"]
        ];

        var value = map.find(function (el) {
            if (el[0] == key) return el;
        });

        if(!Ext.isEmpty(value))
            return value[1];

        return "Unknown";
    },
    getGeoName: function (key) {
        var map = [
            ["GraphKind", "გრაფის სახეობა"],
            ["GraphType", "გრაფის ტიპი"],
            ["TreeType", "ხის ტიპი"],
            ["VertexWeighted", "წონიანი წვეროები"],
            ["VertexWeightFrom", "წვეროს წონა დან"],
            ["VertexWeightTo", "წვეროს წონა მდე"],
            ["EdgeWeighted", "წონიანი წიბოები"],
            ["EdgeWeightFrom", "წიბოს წონა დან"],
            ["EdgeWeightTo", "წიბოს წონა მდე"],
            ["VertexCountRangeFrom", "წვეროების რაოდენობა დან"],
            ["VertexCountRangeTo", "წვეროების რაოდენობა მდე"],
            ["EdgeCountRangeFrom", "წიბოების რაოდენობა დან"],
            ["EdgeCountRangeTo", "წიბოეიბს რაოდენობა მდე"],
            ["Generate", "გენერირება"],
            ["Answer", "პასუხი"],
            ["UserCode", "თქვენი კოდი"],
            ["Send", "გაგზავნა"],
            ["UserAnswer", "კოდის პასუხი"],
            ["UserChoice", "აირჩიეთ"],
            ["MaximalWeight", "მაქსიმალური წონა"],
            ["DimensionXFrom", "განზომილება-X დან"],
            ["DimensionXTo", "განზომილება-X მდე"],
            ["DimensionYFrom", "განზომილება-Y დან"],
            ["DimensionYTo", "განზომილება-Y მდე"],
            ["WallCharacter", "კედლის სიმბოლო"],
            ["PathCharacter", "გზის სიმბოლო"],
            ["Connected", "ბმული"],
            ["ElementCountRangeFrom", "ელემენტების რაოდენობა დან"],
            ["ElementCountRangeTo", "ელემენტების რაოდენობა მდე"],
            ["ElementValueRangeFrom", "ელემენტების მნიშვნელობა დან"],
            ["ElementValueRangeTo", "ელემენტების მნიშვნელობა მდე"],
            ["Permutation", "პერმუტაცია"],
            ["PermutationNumber", "რიცხვი პერმუტაციისთვის"],
            ["Query", "ქუერიები"],
            ["QueryCount", "ქუერიების რაოდენობა"],
            ["Alphabet", "ანბანი"],
            ["ArrayBased", "მასივზე დაფუძნებული"],
            ["MaximalChildren", "შვილების მაქს. რაოდენობა"],
            ["Directed", "მიმართული"],
            ["Multiple_Edges", "ჯერადი წიბოები"],
            ["Looped", "მარყუჟი"],
            ["Default", "სტანდარტული"],
            ["Connected", "ბმული"],
            ["Acyclic", "აციკლური"],
            ["One_Cycle", "ერთი ციკლით"],
            ["Complete", "სრული"],
            ["Bipartite", "ორნაწილიანი"],
            ["Forest", "ტყე"],
            ["Tree", "ხე"],
            ["Binary", "ორობითი"],
            ["Balanced", "ბალანსირებული"]
        ];

        var value = map.find(function (el) {
            if (el[0] == key) return el;
        });

        if(!Ext.isEmpty(value))
            return value[1];

        return "Unknown";
    },
});