/**
 * Created by lyting on 16-5-11.
 */
define(['backbone'], function (Backbone) {

    var _model = Backbone.Model.extend({
        initialize: function () {
            this.initModel();
        },
        initModel: function () {
        },
        fetchPOST: function (options) {
            options = _.extend({
                type: "POST",
                contentType: "application/json",
                dataType: "json",
                error: function (model, textStatus, errorThrown) {
                    alert("网络请求失败！");
                    console.log(textStatus);
                    console.error("网络请求失败！");
                }
            }, options);
            this.fetch(options);
        },
        sendPOST: function (options) {
            var _self = this;
            options = _.extend({
                type: "POST",
                contentType: "application/json",
                dataType: "json",
                beforeSend: function () {
                    window.loading.show();
                },
                error: function (model, textStatus, errorThrown) {
                    alert("网络请求失败！");
                    console.log(errorThrown);
                    console.error("网络请求失败！");
                },
                complete: function () {
                    window.loading.hide();
                }
            }, options);

            // 拼接网关和url
            if (options["url"]) {
                options["url"] = GATEWAY.get() + options["url"];
            }

            // 追加公共参数
            var _data = options["data"] ? options["data"] : {};
            options["data"] = JSON.stringify(common_params(_data));
            console.log(">>> 请求参数 " + JSON.stringify(common_params(_data)));
            console.log(_data);

            $.ajax(options);
        },
        reset_token: function () {
            var _params = window.LOGIN_USER.get();
            this.sendPOST({
                "data": _params,
                success: function (resp) {
                    if (!$.isEmptyObject(resp)) {
                        window.TOKEN.set(resp.token);
                        window.LOGIN_USER.set(resp);
                    }
                }
            });
        }
    });
    return _model;
});

