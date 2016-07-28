/**
 * Created by Joey on 2016/7/14.
 */
define([
    '../../js/common/BaseView',
    'text!../../moduals/onlineOrder-untaken/numberlisttpl.html',
], function (BaseView,tpl) {

    var onlineOrderUntakenNumListView = BaseView.extend({

        id: "onlineOrderUntakenNumListView",

        el: '.for-untaken-numlist',

        template: tpl,

        events: {
        },

        pageInit: function () {

        },


    });

    return onlineOrderUntakenNumListView;
});