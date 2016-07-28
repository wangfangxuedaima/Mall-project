/**
 * Created by Joey on 2016/7/14.
 */
define([
    '../../js/common/BaseView',
    'text!../../moduals/onlineOrder-finished/numberlisttpl.html',
], function (BaseView,tpl) {

    var onlineOrderFinishedNumListView = BaseView.extend({

        id: "onlineOrderFinishedNumListView",

        el: '.for-finished-numlist',

        template: tpl,

        events: {
        },

        pageInit: function () {

        },


    });

    return onlineOrderFinishedNumListView;
});