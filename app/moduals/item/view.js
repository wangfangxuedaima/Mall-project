/**
 * Created by lyting on 16-7-10.
 */
define([
    '../../js/common/BaseView',
    '../../moduals/item/model',
    '../../moduals/item/collection',
    'text!../../moduals/item/tpl.html',
], function (BaseView,ItemModel,ItemCollection, tpl) {

    var itemView = BaseView.extend({

        id: "itemView",

        el: '.for-itemlist-content',

        template: tpl,

        events: {
            "click .card": "onItemClick"
        },

        pageInit: function () {
            this.request = new ItemModel();
            this.collection = new ItemCollection();
            this.getItem();

            //this.listenTo(this.collection, 'add', this.refreshView());
        },
        initPlugins:function(){

            //console.log(this.collection);
        },
        getItem: function () {
            var data = this.attrs;
            var _self = this;
            this.request.goods(data, function (resp) {
                //console.log(resp);
                if (resp.status == '00') {
                    _self.collection.set(resp['kind_detail']);
                    _self.refreshView();
                } else {
                    alert(statusCode[resp.status]);
                }
            });
        },
        refreshView: function () {
            console.log('render');
            console.log(this.collection);
            this.$el.html(this.template(this.collection.toJSON()));
            return this;
        },
        onItemClick: function (e) {
            var theEvent = window.event || e;
            var srcElement = theEvent.srcElement;
            if (!srcElement) {
                srcElement = theEvent.target;
            }
            var index = srcElement.getAttribute('n');
            var item = this.collection.at(index);
            var data = {};
            data['skucode'] = item.get('plu_id');
            data['card_id'] = '*';
            data['goods_detail'] = JSON.stringify([]);
            this.request.sku(data, function (resp) {
                console.log(resp.status);
                if (resp.status == '00') {
                    Backbone.trigger('onAddItem', resp);
                } else {
                    alert(statusCode[resp.status]);
                }
            });
        },

    });

    return itemView;
});