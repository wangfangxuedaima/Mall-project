/**
 * Created by Joey on 2016/7/14.
 */
define([
    '../../js/common/BaseView',
    'text!../../moduals/onlineOrder-finished/detailtpl.html',
], function (BaseView,tpl) {

    var onlineOrderFinishedDetailView = BaseView.extend({

        id: "onlineOrderFinishedDetailView",

        el: '.for-finished-detail',

        template: tpl,

        events: {
        },

        pageInit: function () {

        },


    });

    return onlineOrderFinishedDetailView;
});