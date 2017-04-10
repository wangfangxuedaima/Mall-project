/**
 * Created by lyting on 16-4-25.
 */
define(['backbone'], function(Backbone) {

    var Router = Backbone.Router.extend({

        routes: {
            '': 'login',
            'login': 'login',
            'main': 'main',
            'billing': 'billing',
            // 'logout': 'logout',
            '*actions': 'defaultAction'
        },

        //路由初始化可以做一些事
        initialize: function() {},

        login: function() {
            var _url = './moduals/login/view.js';
            require([_url], function(View) {
                var view = new View();
                view.render();
            });

        },
        main: function() {
            var _url = '../../moduals/home/view';
            require([_url], function(View) {
                var view = new View();
                view.render();
            });
        },
        billing: function() {
            var _url = '../../moduals/billing/view';
            require([_url], function(View) {
                var view = new View();
                view.render();
            });
        },
        defaultAction: function() {
            router.navigate("main", { trigger: true });
        }
    });
    var router = new Router();
    return router; //这里必须的，让路由表执行
});