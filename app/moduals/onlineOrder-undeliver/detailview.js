/**
 * Created by Joey on 2016/7/14.
 */
define([
    '../../js/common/BaseView',
    'text!../../moduals/onlineOrder-undeliver/detailtpl.html',
], function (BaseView,tpl) {

    var onlineOrderUndeliverDetailView = BaseView.extend({

        id: "onlineOrderUndeliverDetailView",

        el: '.for-undeliver-detail',

        template: tpl,

        events: {
        },

        pageInit: function () {

        },


    });

    return onlineOrderUndeliverDetailView;
});