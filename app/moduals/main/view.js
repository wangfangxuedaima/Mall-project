/**
 * Created by lyting on 16-7-10.
 */
define([
    '../../../../js/common/BaseView',
    'text!../../../../moduals/main/tpl.html',
    '../../../../moduals/home/view',
    '../../../../moduals/onlineOrder/view',
    '../../../../moduals/onlineService/view',
    '../../../../moduals/recharge/view',
    '../../../../moduals/return/view',
    '../../../../moduals/setting/view',
], function (BaseView, tpl,HomeView,OnlineOrderView,OnlineServiceView,RechargeView,ReturnView,SettingView) {

    var mainView = BaseView.extend({

        id: "mainView",

        el: '.views',

        template: tpl,

        events: {
            'click .open-left-panel':'openLeft',
            'click .open-right-panel':'openRight',
            //'click .toHome':'onHomeClicked',
            //'click .toOnlineOrder':'onOnlineOrderClicked',
            //'click .toOnlineService':'onOnlineServiceClicked',
            //'click .toRecharge':'onRechargeClicked',
            //'click .toReturn':'onReturnClicked',
            //'click .toSetting':'onSettingClicked',
            //'click .toLogout':'onLogoutClicked',
        },

        pageInit: function () {

        },

        initOtherView: function () {
            var homeView = new HomeView();
            homeView.render();
        },
        openLeft: function () {
            // 'left' position to open Left panel
            f7app.openPanel('left');
        },
        openRight: function () {
            // 'left' position to open Left panel
            f7app.openPanel('right');
        },
        //onHomeClicked: function () {
        //    console.log('home');
        //    var homeView = new HomeView();
        //    homeView.render();
        //},
        //onOnlineOrderClicked: function () {
        //    console.log('online order');
        //    var onlineOrderView = new OnlineOrderView();
        //    onlineOrderView.render();
        //},
        //onOnlineServiceClicked: function () {
        //    console.log('onlice service');
        //    var onlineServiceView = new OnlineServiceView();
        //    onlineServiceView.render();
        //},
        //onRechargeClicked: function () {
        //    console.log('recharge');
        //    var rechargeView = new RechargeView();
        //    rechargeView.render();
        //},
        //onReturnClicked: function () {
        //    console.log('return');
        //    var returnView = new ReturnView();
        //    returnView.render();
        //},
        //onSettingClicked: function () {
        //    console.log('setting');
        //    var settingView = new SettingView();
        //    settingView.render();
        //},
        //onLogoutClicked: function () {
        //    console.log('logout');
        //}

    });

    return mainView;
});