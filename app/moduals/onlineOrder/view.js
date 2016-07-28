/**
 * Created by lyting on 16-7-10.
 */
define([
    '../../js/common/BaseView',
    '../../moduals/onlineOrder-undeliver/view',
    '../../moduals/onlineOrder-untaken/view',
    '../../moduals/onlineOrder-finished/view',
    'text!../../moduals/onlineOrder/tpl.html',
], function (BaseView,UndeliverView,UntakenView,FinishedView, tpl) {

    var onlineOrderView = BaseView.extend({

        id: "onlineOrderView",

        el: '.views',

        template: tpl,

        events: {
            'click .open-left-panel':'openLeft',
            'click #tabUndeliver':'switch2Undeliver',
            'click #tabUntaken':'switch2Untaken',
            'click #tabFinished':'switch2Finished',
        },

        pageInit: function () {

        },
        initOtherView: function () {
            var undeliverView = new UndeliverView();
            undeliverView.render();
        },
        switch2Undeliver: function (event) {
            var undeliverView = new UndeliverView();
            undeliverView.render();
            $(event.currentTarget).parents(".toolbar-inner").find("a").removeClass("active");
            $(event.currentTarget).addClass("active");
            $(event.currentTarget).parent().find('span').addClass("tab1-active");
            $(event.currentTarget).parent().find('span').removeClass("tab2-active");
            $(event.currentTarget).parent().find('span').removeClass("tab3-active");
        },
        switch2Untaken: function (event) {
            var untakenView = new UntakenView();
            untakenView.render();
            $(event.currentTarget).parents(".toolbar-inner").find("a").removeClass("active");
            $(event.currentTarget).addClass("active");
            $(event.currentTarget).parent().find('span').addClass("tab2-active");
            $(event.currentTarget).parent().find('span').removeClass("tab1-active");
            $(event.currentTarget).parent().find('span').removeClass("tab3-active");
        },
        switch2Finished: function (event) {
            var finishedView = new FinishedView();
            finishedView.render();
            $(event.currentTarget).parents(".toolbar-inner").find("a").removeClass("active");
            $(event.currentTarget).addClass("active");
            $(event.currentTarget).parent().find('span').addClass("tab3-active");
            $(event.currentTarget).parent().find('span').removeClass("tab2-active");
            $(event.currentTarget).parent().find('span').removeClass("tab1-active");
        },
        openLeft: function () {
            // 'left' position to open Left panel
            f7app.openPanel('left');
        },


    });

    return onlineOrderView;
});