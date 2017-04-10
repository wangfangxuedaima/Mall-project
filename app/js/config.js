/**
 * Created by lyting on 16-4-24.
 */

require.config({
    waitSeconds: 0,
    baseUrl: './js/lib/',
    paths: {
        "jquery": "jquery-2.2.3",
        "serializeObject": "jquery.serializeObject",
        "storage": "../jquery-storageapi/jquery.storageapi.min",
        "underscore": "underscore",
        "backbone": "backbone.min",
        "validation": "backbone-validation",
        "md5": "jQuery.md5",
        "common": "common",
        "loading": "../loading/jquery.showLoading.min",
        "text": "requirePlugin/text",
        "css": "requirePlugin/css",
        "json": "requirePlugin/json",
        "_fetchText": "requirePlugin/_fetchText",
    },
    shim: {
        "backbone": {
            "deps": ["underscore"],
            "exports": "Backbone"
        },

        "validation": {
            "deps": ["backbone"],
            "exports": "validation"
        },

        "underscore": {
            "exports": "_"
        },
        "bootstrap": {
            "deps": ["jquery"],
            "exports": "Bootstrap"
        },
        "serializeObject": {
            "deps": ["jquery"],
        },
        "storage": {
            "deps": ["jquery"],
        },
        "md5": {
            "deps": ["jquery"],
        },
        "loading": {
            "deps": [
                "css!../loading/showLoading.css",
                "jquery"
            ],
        },
    }
});

require([
    'jquery',
    'underscore',
    'backbone',
    "common",
    'js/common/Router.js',
    "validation",
    "serializeObject",
    "storage",
    "loading"

], function($, _, Backbone, common, framework7, BaseRouter, validation, serializeObject, storage, loading, HomeView, OnlineOrderView, OnlineServiceView, RechargeView, ReturnView, SettingView, ItemListView) {

    Backbone.history.start(); //开始监控url变化
    _.extend(Backbone.Model.prototype, Backbone.Validation.mixin);

    // 定义调试标志
    window.debug = true;
    // 定义 api 接口 url
    window.API = "http://111.198.72.128:3000/v1";
    // 定义api调试标志
    window.api_debug = true;
    // 重新定义系统本地存储对象
    window.storage = $.localStorage;



    //初始化第一次登陆参数
    if (!window.storage.isSet(system_config.IS_FIRST_KEY)) {
        window.storage.set(system_config.IS_FIRST_KEY, true);
    }
    // 重写控制台输出方法，添加调试标志
    console.log = (function(oriLogFunc) {
        return function(str) {
            if (debug) {
                oriLogFunc.call(console, str);
            }
        }
    })(console.log);

    window.TOKEN = {
        set: function(token) {
            window.storage.set(system_config.TOKEN_KEY, token);
        },
        get: function() {
            return window.storage.get(system_config.TOKEN_KEY);
        },
        remove: function() {
            window.storage.remove(system_config.TOKEN_KEY);
        }
    };

    window.LOGIN_USER = {
        set: function(login_user) {
            window.storage.set(window.system_config.LOGIN_USER_KEY, login_user);
        },
        get: function() {
            window.storage.get(window.system_config.LOGIN_USER_KEY);
        }
    };

    window.POS_KEY = {
        set: function(key) {
            // todo 预置方法
        },
        get: function() {
            var pos_key = window.storage.get(system_config.SETTING_DATA_KEY, system_config.INIT_DATA_KEY, system_config.POS_KEY);
            return pos_key;
        }
    };

    window.GATEWAY = {
        set: function() {

        },
        get: function() {
            return window.storage.get(system_config.SETTING_DATA_KEY, system_config.INIT_DATA_KEY, system_config.GATEWAY_KEY);
        }
    };

    window.common_params = function(params) {
        var _p = $.isEmptyObject(params) ? {} : params;
        return $.extend(_p, {
            "poskey": window.POS_KEY.get(),
            "token": window.TOKEN.get(),
            "timestamp": new Date().format("yyyy-MM-dd hh:mm:ss"),
            "sign": "" // todo 签名测试版本不需要添加
        });
    };


    // 定义系统router
    window.router = BaseRouter;

    $(document).ready(function() {
        window.loading = {
            show: function(obj) {
                var target = obj || $("body");
                target.showLoading({
                    overlayWidth: $(document).width(),
                    overlayHeight: $(document).height()
                });
            },

            hide: function(obj) {
                var target = obj || $("body");
                target.hideLoading();
            }
        };


    });

});