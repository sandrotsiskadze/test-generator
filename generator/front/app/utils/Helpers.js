Ext.define('test.utils.Helpers', {
    alternateClassName: ['Helpers'],
    singleton: true,
    serviceUrl: 'http://localhost:1111/api/',
    ajaxRequest: function (path, params, succAction, failAction) {
        Ext.Ajax.request({
            url: Helpers.serviceUrl + path,
            method: "Post",
            timeout: 90000,
            success: function (result) {
                succAction(resultObj.Result);
            },
            failure: function (result) {
                if (!Ext.isEmpty(failAction)) failAction();
            },
            jsonData: params
        });


    }
});