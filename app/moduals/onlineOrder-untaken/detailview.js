/**
 * Created by Joey on 2016/7/14.
 */
define([
    '../../js/common/BaseView',
    'text!../../moduals/onlineOrder-untaken/detailtpl.html',
], function (BaseView,tpl) {

    var onlineOrderUntakenDetailView = BaseView.extend({

        id: "onlineOrderUntakenDetailView",

        el: '.for-untaken-detail',

        template: tpl,

        events: {
        },

        pageInit: function () {

        },


    });

    return onlineOrderUntakenDetailView;
});