/**
 * Created by lyting on 16-7-10.
 */
define([
    '../../js/common/BaseView',
    '../../moduals/onlineOrder-undeliver/numberlistview',
    '../../moduals/onlineOrder-undeliver/detailview',
    'text!../../moduals/onlineOrder-undeliver/tpl.html',
], function (BaseView,NumberListView,DetailView, tpl) {

    var onlineOrderUndeliverView = BaseView.extend({

        id: "onlineOrderUndeliverView",

        el: '.for-online-tabscontent',

        template: tpl,

        events: {
        },

        pageInit: function () {

        },
        initOtherView: function () {
            var numListView = new NumberListView();
            numListView.render();
            var detailView = new DetailView();
            detailView.render();
        }


    });

    return onlineOrderUndeliverView;
});