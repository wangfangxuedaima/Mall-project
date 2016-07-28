/**
 * Created by lyting on 16-7-10.
 */
define([
    '../../js/common/BaseView',
    '../firstclasslist/view',
    '../billing/view',
    '../home-memberlogin/view',
    '../home-salesmanlogin/view',
    '../editnumpickermodal/view',
    'keypad',
    '../../moduals/home/model',
    '../../moduals/home/collection',
    'text!../../moduals/home/tpl.html',
    'text!../../moduals/home/posinfotpl.html',
    'text!../../moduals/home/cartlisttpl.html',
    'text!../../moduals/home/itemnumtoolbartpl.html',
    'text!../../moduals/home/caltoolbartpl.html',
    'text!../../moduals/home/custom_notificationlayout.html',
], function (BaseView,ItemListView,BillingView,MemberView,SalesmanView,EditNumView,Keypad,HomeModel,HomeCollection, tpl,posinfotpl,cartlisttpl,itemnumtoolbartpl,toolbartpl,notificationtpl) {

    var homeView = BaseView.extend({

        id: "homeView",

        el: '.views',

        template: tpl,

        template_posinfo:posinfotpl,

        template_cart:cartlisttpl,

        totalamount:0,

        itemamount:0,

        discountamount:0,

        events: {
            'click .open-left-panel':'openLeft',
            'click .open-right-panel':'openRight',
            'click .for-billing':'onBillingClicked',
            'click .for-btn-member':'onMemberClicked',
            'click .for-btn-salesman':'onSalesmanClicked',
            'click .single-discount':'onSingleDiscountClicked',
            'click .delete':'onDeleteClicked',
            'click .plus':'onPlusClicked',
            'click .minus':'onMinusClicked',
            'click .for-item-num':'onEditNumClicked'
        },

        pageInit: function () {
            //window.$$('.joey').on('click', function (e) {
            //    console.log('joey');
            //});
            var user = storage.get(system_config.LOGIN_USER_KEY);
            this.model = new HomeModel();
            this.model.set({
                name:user.user_name,
                pos:'收款机(2341)',
                totalamount: this.totalamount,
                itemamount: this.itemamount,
                discountamount: this.discountamount
            });
            this.collection = new HomeCollection();
            this.initTemplates();
            if(storage.isSet(system_config.SALE_PAGE_KEY)){
                this.collection.set(storage.get(system_config.SALE_PAGE_KEY,'shopcart'));
                console.log(this.collection);
                this.model.set(storage.get(system_config.SALE_PAGE_KEY,'shopinfo'));
            }
            this.handleEvents();

        },
        initPlugins: function () {

            f7app.keypad({
                input:'#searchItem',
                type:'calculator',
                convertToPopover:false,
                //toolbar:false
                toolbarCloseText:'关闭',
                toolbarTemplate:toolbartpl,
                onClose: function () {
                    console.log('close');
                }
            });
            this.renderPosInfo();
            this.renderCartList();

        },
        initTemplates: function () {
            this.template_posinfo = _.template(this.template_posinfo);
            this.template_cart = _.template(this.template_cart);
        },
        handleEvents: function () {
            Backbone.off('onAddItem');
            Backbone.on('onAddItem',this.onAddItem,this);
            //this.listenTo(this.model,'all',this.renderPosInfo());
            this.listenTo(this.collection,'add',this.renderCartList());
            this.listenTo(this.collection,'remove',this.renderCartList());
        },
        renderPosInfo: function () {
            console.log(this.model);
            this.$el.find('.for-posinfo').html(this.template_posinfo(this.model.toJSON()));
            return this;
        },
        //renderItemNum: function (model) {
        //    console.log(model);
        //    this.$el.find('.for-posinfo').html(this.template_itemnum(model.toJSON()));
        //    return this;
        //},
        renderCartList:function(){
            this.$el.find('.for-cart').html(this.template_cart(this.collection.toJSON()));
            return this;
        },
        openLeft: function () {
            // 'left' position to open Left panel
            f7app.openPanel('left');
        },
        openRight: function () {
            f7app.openPanel('right');

        },
        onBillingClicked: function () {
            storage.set(system_config.SALE_PAGE_KEY,'shopcart',this.collection.toJSON());
            storage.set(system_config.SALE_PAGE_KEY,'shopinfo',this.model.toJSON());
            router.navigate("billing", {trigger: true});
        },
        onMemberClicked: function () {
            var popupHTML = '<div class="popup tablet-fullscreen">'+ '</div>';
            f7app.popup(popupHTML,true);
            $('.popup').on('opened', function () {
                console.log('opened');
                var memberView = new MemberView();
                memberView.render();
            });
        },
        onSalesmanClicked: function () {
            var popupHTML = '<div class="popup tablet-fullscreen">'+ '</div>';
            f7app.popup(popupHTML,true);
            $('.popup').on('opened', function () {
                console.log('opened');
                var salesmanView = new SalesmanView();
                salesmanView.render();
            });
        },
        onAddItem: function (item) {
            console.log('onAddItem');
            current = this.collection.findWhere({
                plu_id: item.plu_id,
            });
            if (current) {
                current.set({num: current.get('num') + 1});
            } else {
                this.collection.unshift(item);
            }
            console.log(this.collection);
            this.insertSerial();
            this.totalamount = 0;
            this.itemamount = 0;
            this.discountamount = 0;
            var priceList = this.collection.pluck('price');
            var itemNum = this.collection.pluck('num');
            var discounts = this.collection.pluck('discount');
            for (var i = 0; i < this.collection.length; i++) {
                discounts[i] = parseFloat(discounts[i]);
                this.totalamount += priceList[i] * itemNum[i];
                this.itemamount += itemNum[i];
                this.discountamount += discounts[i];
            }
            console.log(this.itemamount);
            this.renderCartList();
            this.updateShopInfo();
            //Backbone.trigger('updateShoplistCollection', this.collection);
            //Backbone.trigger('moneyAmount', totalamount, itemamount, discountamount);
        },
        onSingleDiscountClicked: function () {
            f7app.addNotification({
                message:'点击了单品优惠'
            });
            $('.item-after a').attr('href','javascript:void(0)');
            console.log($('.item-after').html());
        },
        onDeleteClicked: function () {
            //f7app.addNotification({
            //    message:'点击了单品删除'
            //});
            //$('.item-after a').attr('href','javascript:void(0)');
            //console.log($('.item-after').html());
            var _self = this;
            f7app.modalLogin("登陆","二次登陆验证", function (username, password) {
                if(username=="1234"&&password=="1234"){
                    f7app.swipeoutDelete(".swipeout-opened");
                }else{
                    f7app.swipeoutClose(".swipeout-opened");
                    f7app.alert("用户名或密码不正确");
                }

            });
            $('.swipeout').off('deleted');
            $('.swipeout').on('deleted', function (e) {
                var index = $(e.currentTarget).data('index');
                console.log(index);
                var item = _self.collection.at(index);
                _self.collection.remove(item);
                _self.renderCartList();
                console.log(_self.collection);
                _self.totalamount = 0;
                _self.itemamount = 0;
                _self.discountamount = 0;
                var priceList = _self.collection.pluck('price');
                var discounts = _self.collection.pluck('discount');
                var itemNum = _self.collection.pluck('num');
                for (var i = 0; i < priceList.length; i++) {
                    discounts[i] = parseFloat(discounts[i]);
                    _self.totalamount += priceList[i] * itemNum[i];
                    _self.itemamount += itemNum[i];
                    _self.discountamount += discounts[i] * itemNum[i];
                }
                _self.insertSerial();
                _self.updateShopInfo();
                //Backbone.trigger('updateShoplistCollection', this.collection);
                //Backbone.trigger('moneyAmount', totalamount, itemamount, discountamount);
            });
        },
        onEditNumClicked: function (e) {
            console.log(e.currentTarget);
            var _self = this;
            $(e.currentTarget).find('input').addClass('picker-selected');
            //var pickerHtml ='<div class="picker-modal">' +'</div>';
            //f7app.pickerModal(pickerHtml,true);
            //$('.picker-modal').on('opened', function () {
            //    console.log('opened');
            //    var editNumView = new EditNumView();
            //    editNumView.render();
            //});
            //f7app.modal({
            //    title:'修改数量',
            //    text:'修改数量',
            //    afterText:'<div class="row for-edit-amount">'+
            //                //'<div class="col-100">'+'哈哈'+'</div>'+
            //                '</div>',
            //    buttons:[
            //        {
            //            text:'取消'
            //        },
            //        {
            //            text:'确定'
            //        }
            //    ]
            //});
            //
            //$$('.modal').on('opened', function () {
            //    console.log('open');
            //    var editNumView = new EditNumView();
            //    editNumView.render();
            //});
            var pickerNum = f7app.picker({
                input:'.picker-selected',
                cols:[
                    {
                        textAlign:'center',
                        values:[1,2,3,4,5,6,7,8,9,10,
                            11,12,13,14,15,16,17,18,19,20,
                            21,22,23,24,25,26,27,28,29,30]
                    }
                ],
                toolbarCloseText:'确定',
                toolbarTemplate:itemnumtoolbartpl,
                onlyOnPopover:true,
                momentumRatio:6,
                closeByOutsideClick:false,
                onChange: function () {
                  console.log('change');
                },
                onClose: function () {
                    console.log('closed');
                    console.log(pickerNum.cols[0].value);
                    var index = $(e.currentTarget).data('index');
                    var item = _self.collection.at(index);
                    item.set({
                        num: parseFloat(pickerNum.cols[0].value)
                    });
                    console.log(_self.collection);
                    _self.renderCartList();
                    _self.totalamount = 0;
                    _self.itemamount = 0;
                    _self.discountamount = 0;
                    var priceList = _self.collection.pluck('price');
                    var discounts = _self.collection.pluck('discount');
                    var itemNum = _self.collection.pluck('num');
                    for (var i = 0; i < priceList.length; i++) {
                        discounts[i] = parseFloat(discounts[i]);
                        _self.totalamount += priceList[i] * itemNum[i];
                        _self.itemamount += itemNum[i];
                        _self.discountamount += discounts[i] * itemNum[i];
                    }
                    _self.updateShopInfo();
                    $(e.currentTarget).find('input').removeClass('picker-selected');

                }
            });
            pickerNum.open();
        },
        onPlusClicked: function (e) {
            //f7app.addNotification({
            //    message:'单品数量+1'
            //});
            //$('.item-after a').attr('href','javascript:void(0)');
            //console.log($('.item-after').html());
            var index = $(e.currentTarget).data('index');
            console.log(index);
            var item = this.collection.at(index);
            item.set({
                num: item.get('num') + 1
            });
            console.log(this.collection);

        },
        onMinusClicked: function () {
            f7app.addNotification({
                message:'单品数量-1'
            });
            $('.item-after a').attr('href','javascript:void(0)');
            console.log($('.item-after').html());
        },
        updateShopInfo: function () {
            this.model.set({
                totalamount: this.totalamount,
                itemamount: this.itemamount,
                discountamount: this.discountamount
            })
            this.renderPosInfo();
        },
        insertSerial: function () {
            for(var i = 0;i<this.collection.length;i++){
                this.collection.at(i).set({
                    serial:i+1
                });
            }
        },
    });

    return homeView;
});