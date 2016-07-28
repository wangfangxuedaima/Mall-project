/**
 * Created by lyting on 16-5-27.
 */
define(['backbone'], function (Backbone) {
    var _collection = Backbone.Collection.extend({
        initialize: function () {
            this.initCollection();
        },

        initCollection: function () {
        },

        fetchPOST: function (options) {
            options = _.extend({
                type: "POST",
                contentType: "application/json",
                dataType: "json",
                error: function (model, textStatus, errorThrown) {
                    alert("网络请求失败！");
                    console.log(errorThrown);
                    console.error("网络请求失败！");
                }
            }, options);
            this.fetch(options);
        }
    });
    return _collection;
});
