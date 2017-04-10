/**
 * Created by lyting on 16-7-10.
 */
define([
    '../../../../js/common/BaseView',
    'text!../../../../moduals/main/tpl.html',
    '../../../../moduals/home/view'
], function(BaseView, tpl, HomeView) {

    var mainView = BaseView.extend({

        id: "mainView",

        el: '.views',

        template: tpl,

        events: {
            'click .open-left-panel': 'openLeft',
            'click .open-right-panel': 'openRight'
        },

        pageInit: function() {

        },

        initOtherView: function() {
            var homeView = new HomeView();
            homeView.render();
        },

    });

    return mainView;
});