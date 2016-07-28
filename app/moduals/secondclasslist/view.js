/**
 * Created by lyting on 16-7-10.
 */
define([
    '../../js/common/BaseView',
    '../../moduals/item/view',
    '../../moduals/secondclasslist/model',
    '../../moduals/secondclasslist/collection',
    'text!../../moduals/secondclasslist/tpl.html',
], function (BaseView,ItemView,SecondClassModel,SecondClassList, tpl) {

    var secondClassListView = BaseView.extend({

        id: "secondClassListView",

        el: '.for-itemlist-content',

        template: tpl,

        events: {
            'click .toItemList':'toItemList'
        },

        pageInit: function () {
            console.log(this.attrs);
            Backbone.trigger('secondClassHistory',this.attrs);
            this.getSecondClass();
        },
        toItemList: function (e) {
            $('#itemlistNavTitle').text('商品列表');
            $('#itemlistNavTitle').removeClass('secondClass');
            $('#itemlistNavTitle').addClass('shopItem');
            var theEvent=window.event||e;
            var srcElement=theEvent.srcElement;
            if(!srcElement){
                srcElement=theEvent.target;
            }
            var index=srcElement.getAttribute('n');
            var kind1 = this.collection.at(index).get('parent_code');
            var kind2 = this.collection.at(index).get('kind_id');
            var kindargs ={};
            kindargs['kind1'] = kind1;
            kindargs['kind2'] = kind2;
            var itemView = new ItemView(kindargs);
            itemView.render();
        },
        getSecondClass: function () {
            this.collection = new SecondClassList();
            this.kind = storage.get(system_config.KIND_DATA_KEY);
            var SecondKindList = new SecondClassList();
            SecondKindList.add(this.kind);
            var SecondKind = SecondKindList.where({parent_code:this.attrs});
            SecondKindList.reset();
            SecondKindList.set(SecondKind);
            this.collection.reset();
            this.collection.set(SecondKindList.toJSON());
            console.log(this.collection);
        }

    });

    return secondClassListView;
});