/**
 * Created by lyting on 16-7-10.
 */
define([
    '../../js/common/BaseView',
    '../../moduals/bankcardpaymodal/view',
    'text!../../moduals/bankcardpaymodal/tpl.html',
    'text!../../moduals/billing-typelist/tpl.html',
], function (BaseView,BankcardPayModalView,modaltpl, tpl) {

    var typelistView = BaseView.extend({

        id: "typelistView",

        el: '.for-typelist',

        template: tpl,

        events: {
            'click .for-bankcard-modal':'bankcardModalShow',
            'click .for-alipay-modal':'alipayModalShow',
            'click .for-wechatpay-modal':'wechatpayModalShow',
            'click .for-giftcard-modal':'giftcardModalShow',
            'click .for-ecoupon-modal':'ecouponModalShow'
        },

        pageInit: function () {
        },
        bankcardModalShow: function (event) {
            var popupHTML = '<div class="popup tablet-fullscreen">'+ '</div>';
            f7app.popup(popupHTML,true);
            $('.popup').on('opened', function () {
                console.log('opened');
                var bankcardModalView = new BankcardPayModalView();
                bankcardModalView.render();
            });
        },
        alipayModalShow:function(){
            f7app.addNotification({
               message:'支付宝支付'
            });
            $('.item-after a').attr('href','javascript:void(0)');
            console.log($('.item-after').html());
        },
        wechatpayModalShow:function(){
            f7app.addNotification({
                message:'微信支付'
            });
            $('.item-after a').attr('href','javascript:void(0)');
            console.log($('.item-after').html());
        },
        giftcardModalShow:function(){
            f7app.addNotification({
                message:'礼品券支付'
            });
            $('.item-after a').attr('href','javascript:void(0)');
            console.log($('.item-after').html());
        },
        ecouponModalShow:function(){
            f7app.addNotification({
                message:'电子券支付'
            });
            $('.item-after a').attr('href','javascript:void(0)');
            console.log($('.item-after').html());
        },


    });

    return typelistView;
});