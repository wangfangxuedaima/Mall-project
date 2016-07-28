/**
 * Created by lyting on 16-7-10.
 */
define([
    '../../js/common/BaseView',
    '../../moduals/onlineOrder-untaken/numberlistview',
    '../../moduals/onlineOrder-untaken/detailview',
    'text!../../moduals/onlineOrder-untaken/tpl.html',
], function (BaseView,NumberListView,DetailView, tpl) {

    var onlineOrderUntakenView = BaseView.extend({

        id: "onlineOrderUntakenView",

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

    return onlineOrderUntakenView;
});