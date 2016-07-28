/**
 * Created by lyting on 16-7-10.
 */
define([
    '../../js/common/BaseView',
    '../../moduals/onlineOrder-finished/numberlistview',
    '../../moduals/onlineOrder-finished/detailview',
    'text!../../moduals/onlineOrder-finished/tpl.html',
], function (BaseView,NumberListView,DetailView, tpl) {

    var onlineOrderFinishedView = BaseView.extend({

        id: "onlineOrderFinishedView",

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

    return onlineOrderFinishedView;
});