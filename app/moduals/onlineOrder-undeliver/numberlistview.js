/**
 * Created by Joey on 2016/7/14.
 */
define([
    '../../js/common/BaseView',
    'text!../../moduals/onlineOrder-undeliver/numberlisttpl.html',
], function (BaseView,tpl) {

    var onlineOrderUndeliverNumListView = BaseView.extend({

        id: "onlineOrderUndeliverNumListView",

        el: '.for-undeliver-numlist',

        template: tpl,

        events: {
        },

        pageInit: function () {

        },


    });

    return onlineOrderUndeliverNumListView;
});