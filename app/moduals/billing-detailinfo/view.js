/**
 * Created by lyting on 16-7-10.
 */
define([
    '../../js/common/BaseView',
    //'framework7',
    'keypad',
    '../../moduals/billing-detailinfo/model',
    '../../moduals/billing-detailinfo/collection',
    'text!../../moduals/billing-detailinfo/tpl.html',
    'text!../../moduals/billing-detailinfo/billdetailtpl.html',
    'text!../../moduals/billing-detailinfo/paymentlisttpl.html',
    'text!../../moduals/home/caltoolbartpl.html',
    '../../moduals/bankcardpaymodal/view',
    'text!../../moduals/bankcardpaymodal/tpl.html',
    'text!../../moduals/billing-detailinfo/typelisttpl.html',
], function (BaseView,Keypad,BillDetailModel,BillDetailCollection,tpl,billdetailtpl,paymentlisttpl,caltoolbartpl,BankcardPayModalView,modaltpl, typelisttpl) {

    var detailInfoView = BaseView.extend({

        id: "detailInfoView",

        el: '.for-detailinfo',

        template: tpl,

        template_billdetail:billdetailtpl,

        template_paymentlist:paymentlisttpl,

        template_typelist:typelisttpl,

        typeList:null,

        events: {
            'click .for-bankcard-modal':'bankcardModalShow',
            'click .for-alipay-modal':'alipayModalShow',
            'click .for-wechatpay-modal':'wechatpayModalShow',
            'click .for-giftcard-modal':'giftcardModalShow',
            'click .for-ecoupon-modal':'ecouponModalShow'
        },

        pageInit: function () {
            this.model = new BillDetailModel();
            this.model.set({
                totalamount:0,
                receivedsum:0
            });
            this.collection = new BillDetailCollection();
            this.typeList = new BillDetailCollection();
            if(storage.isSet(system_config.RETURN_KEY)){
                //从localstorage读取退货订单
            }else{
                //this.collection.set(storage.get(system_config.SALE_PAGE_KEY,'shopcart'));
                this.model.set(storage.get(system_config.SALE_PAGE_KEY,'shopinfo'));
            }
            this.initTemplates();
        },
        initPlugins: function () {
            var _self = this;
            window.f7app.keypad({
                input:'#myinput',
                type:'calculator',
                convertToPopover:false,
                toolbarCloseText:'确定',
                toolbarTemplate:caltoolbartpl,
                onClose: function () {
                    console.log($('#myinput').val());
                    _self.model.set({
                        receivedsum:$('#myinput').val()
                    });
                    $('#myinput').val('');
                    _self.renderBillDetail();
                }
            });
            this.renderBillDetail();
            this.renderPaymentList();
            this.renderTypeList();
        },
        initTemplates: function () {
            this.template_billdetail = _.template(this.template_billdetail);
            this.template_paymentlist = _.template(this.template_paymentlist);
            this.template_typelist = _.template(this.template_typelist);
        },
        renderBillDetail: function () {
            this.$el.find('.for-bill-detail').html(this.template_billdetail(this.model.toJSON()));
            return this;
        },
        renderPaymentList:function(){
            this.$el.find('.for-paymentlist').html(this.template_paymentlist(this.collection.toJSON()));
            return this;
        },
        renderTypeList:function(){
            this.$el.find('.for-typelist').html(this.template_typelist(this.typeList.toJSON()));
            return this;
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

    return detailInfoView;
});