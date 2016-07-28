/**
 * Created by lyting on 16-4-24.
 */

require.config({
    waitSeconds: 0,
    baseUrl: './js/lib/',
    paths: {
        // Core Libraries
        "jquery": "jquery-2.2.3",
        "serializeObject": "jquery.serializeObject",
        "storage": "../jquery-storageapi/jquery.storageapi.min",
        "underscore": "underscore",
        "backbone": "backbone.min",
        "validation": "backbone-validation",
        "md5": "jQuery.md5",
        "common": "common",
        'framework7':'../framework7/js/framework7.min',
        "loading": "../loading/jquery.showLoading.min",
        'keypad':'../framework7-keypad/framework7.keypad.min',
        //"light7": "../light7/js/light7.min",
        //"citypicker": "../light7/js/light7-city-picker.min",
        //"swipeout": "../light7/js/light7-swipeout",
        //"swiper": "../light7/js/light7-swiper.min",
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
        "framework7":{
            "deps":["css!../framework7/css/framework7.material.css","css!../framework7/css/framework7.material.colors.css"]
        },
        "keypad":{
            "deps":["framework7","css!../framework7-keypad/framework7.keypad.min.css"]
        },
        "loading": {
            "deps": [
                "css!../loading/showLoading.css",
                "jquery"
            ],
        },

        //"light7": {
        //    "deps": ["jquery", "css!../light7/css/light7.min.css"],
        //},
        //"citypicker": {
        //    "deps": ["light7"],
        //},
        //"swipeout": {
        //    "deps": ["light7", "css!../light7/css/light7-swipeout.css"],
        //},
        //"swiper": {
        //    "deps": ["light7", "css!../light7/css/light7-swiper.css"],
        //}
    }
});

require([
    'jquery',
    'underscore',
    'backbone',
    "common",
    "framework7",
    //"citypicker",
    //"swipeout",
    //"swiper",
    'js/common/Router.js',
    "validation",
    "serializeObject",
    "storage",
    "loading",
    '../../moduals/home/view',
    '../../moduals/onlineOrder/view',
    '../../moduals/onlineService/view',
    '../../moduals/recharge/view',
    '../../moduals/return/view',
    '../../moduals/setting/view',
    '../../moduals/itemlist/view'

], function ($,_, Backbone, common, framework7, BaseRouter, validation, serializeObject, storage,loading,HomeView,OnlineOrderView,OnlineServiceView,RechargeView,ReturnView,SettingView,ItemListView) {

    Backbone.history.start();   //开始监控url变化
    _.extend(Backbone.Model.prototype, Backbone.Validation.mixin);

    //  validation 表单验证 页面布局显示
    // _.extend(Backbone.Validation.callbacks, {
    //     valid: function (view, attr, selector) {
    //         console.log("valid");
    //         console.log(view);
    //         console.log(attr);
    //         console.log(selector);
    //     },
    //     invalid: function (view, attr, error, selector) {
    //         console.log("invalid");
    //         console.log(view);
    //         console.log(attr);
    //         console.log(error);
    //         console.log(selector);
    //     }
    // });
    // 重新定义模板标签
    // _.templateSettings = {
    //     evaluate: /{([\s\S]+?)}/g,
    //     interpolate: /{=([\s\S]+?)}/g,
    //     escape: /{-([\s\S]+?)}/g
    // };

    // 定义调试标志
    window.debug = true;
    // 定义 api 接口 url
    window.API = "http://111.198.72.128:3000/v1";
    // 定义api调试标志
    window.api_debug = true;
    // 重新定义系统本地存储对象
    window.storage = $.localStorage;

    window.f7app = new Framework7({
        swipePanel: false,
        material:true,
        materialRipple:true,
        materialRippleElements:'.ripple',
        fastClicks:true,
        router:false,
    });

    window.$$ = Dom7;

    //初始化第一次登陆参数
    if (!window.storage.isSet(system_config.IS_FIRST_KEY)) {
        window.storage.set(system_config.IS_FIRST_KEY, true);
    }
    // 重写控制台输出方法，添加调试标志
    console.log = (function (oriLogFunc) {
        return function (str) {
            if (debug) {
                oriLogFunc.call(console, str);
            }
        }
    })(console.log);

    window.TOKEN = {
        set: function (token) {
            window.storage.set(system_config.TOKEN_KEY, token);
        },
        get: function () {
            return window.storage.get(system_config.TOKEN_KEY);
        },
        remove: function () {
            window.storage.remove(system_config.TOKEN_KEY);
        }
    };

    window.LOGIN_USER = {
        set: function (login_user) {
            window.storage.set(window.system_config.LOGIN_USER_KEY, login_user);
        },
        get: function () {
            window.storage.get(window.system_config.LOGIN_USER_KEY);
        }
    };

    window.POS_KEY = {
        set: function (key) {
            // todo 预置方法
        },
        get: function () {
            var pos_key = window.storage.get(system_config.SETTING_DATA_KEY, system_config.INIT_DATA_KEY, system_config.POS_KEY);
            return pos_key;
        }
    };

    window.GATEWAY = {
        set: function () {

        },
        get: function () {
            return window.storage.get(system_config.SETTING_DATA_KEY, system_config.INIT_DATA_KEY, system_config.GATEWAY_KEY);
        }
    };

    window.common_params = function (params) {
        var _p = $.isEmptyObject(params) ? {} : params;
        return $.extend(_p, {
            "poskey": window.POS_KEY.get(),
            "token": window.TOKEN.get(),
            "timestamp": new Date().format("yyyy-MM-dd hh:mm:ss"),
            "sign": "" // todo 签名测试版本不需要添加
        });
    };


    // window.datetimePlugins = function (obj, isUseTime) {
    //
    //     var curr = new Date().getFullYear();
    //
    //     var opt = {};
    //     if (isUseTime) {
    //         opt.preset = {preset: 'datetime'};
    //     } else {
    //         opt.preset = {preset: 'date'};
    //     }
    //
    //     opt.time = {preset: 'time'};
    //
    //     opt.default = {
    //         theme: 'ios light', //皮肤样式
    //         display: 'modal', //显示方式
    //         mode: 'scroller', //日期选择模式
    //         dateFormat: 'yyyy-mm-dd',
    //         lang: 'zh',
    //         showNow: true,
    //         nowText: "今天",
    //         stepMinute: 5,
    //         startYear: curr - 10, //开始年份
    //         endYear: curr + 10 //结束年份
    //     };
    //
    //     obj.scroller('destroy').scroller($.extend(opt['preset'], opt['default']));
    // };

    // 定义系统router
    window.router = BaseRouter;

    $(document).ready(function () {
         window.loading = {
             show: function (obj) {
                 var target = obj || $("body");
                 target.showLoading({
                     overlayWidth: $(document).width(),
                     overlayHeight: $(document).height()
                 });
             },

             hide: function (obj) {
                 var target = obj || $("body");
                 target.hideLoading();
             }
         };

        /**
         * 设置屏幕宽高
         */
        // var setScreenWH = function () {
        //     var dw = $(document).width(),
        //         dh = $(document).height();
        //     var cw = $("#container").width(),
        //         ch = $("#container").height();
        //     var cwd = dw - cw;
        //     var chd = dh - ch;
        //     var cl = 0;
        //     var ct = 0;
        //     if (cwd > 0) {
        //         cl = cwd / 2;
        //     }
        //     if (chd > 0) {
        //         ct = chd / 2;
        //     }
        //     $("#container").css({
        //         "left": cl,
        //         "top": ct
        //     });
        // };

        // setScreenWH();

    });

    var itemListView = new ItemListView();
    itemListView.render();

    $('.toHome').bind('click', function () {
        f7app.closePanel();
        var homeView = new HomeView();
        homeView.render();

    });
    $('.toOnlineOrder').bind('click', function () {
        f7app.closePanel();
        var onlineOrderView = new OnlineOrderView();
        onlineOrderView.render();

    });

    $('.toOnlineService').bind('click', function () {
        f7app.closePanel();
        var onlineServiceView = new OnlineServiceView();
        onlineServiceView.render();

    });
    $('.toRecharge').bind('click', function () {
        f7app.closePanel();
        var rechargeView = new RechargeView();
        rechargeView.render();

    });
    $('.toReturn').bind('click', function () {
        f7app.closePanel();
        var returnView = new ReturnView();
        returnView.render();

    });
    $('.toSetting').bind('click', function () {
        f7app.closePanel();
        var settingView = new SettingView();
        settingView.render();

    });
    $('.toLogout').bind('click', function () {
        console.log('logout');
        f7app.closePanel();
        router.navigate("", {trigger: true});
    });

    $('.panelClose').bind('click', function () {
        f7app.closePanel();
    });

});

