/**
 * Created by lyting on 16-7-10.
 */
define([
    '../../js/common/BaseView',
    '../../moduals/billing-detailinfo/view',
    '../../moduals/billing-typelist/view',
    'text!../../moduals/billing/tpl.html',
], function (BaseView,DetailInfoView,TypeListView, tpl) {

    var billingView = BaseView.extend({

        id: "billingView",

        el: '.views',

        template: tpl,

        events: {
            'click .back':'onBackClicked',
            'click .for-clearing':'onClearingClicked'
        },

        pageInit: function () {

        },
        initOtherView: function () {
            var detailInfoView = new DetailInfoView();
            //var typelistView = new TypeListView();
            detailInfoView.render();
            //typelistView.render();
        },
        onBackClicked: function () {
            router.navigate("main", {trigger: true});
        },
        onClearingClicked: function () {
            storage.remove(system_config.SALE_PAGE_KEY);
            f7app.addNotification({
                message:'结账'
            });
            $('.item-after a').attr('href','javascript:void(0)');
        }
    });

    return billingView;
});