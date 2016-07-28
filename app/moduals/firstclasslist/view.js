/**
 * Created by lyting on 16-7-10.
 */
define([
    '../../js/common/BaseView',
    '../../moduals/secondclasslist/view',
    '../../moduals/firstclasslist/model',
    '../../moduals/firstclasslist/collection',
    'text!../../moduals/firstclasslist/tpl.html',

], function (BaseView,SecondClassListView,FirstClassModel,FirstClassList,tpl) {

    var firstClassListView = BaseView.extend({

        id: "firstClassListView",

        el: '.for-itemlist-content',

        template: tpl,

        events: {
            'click .toSecondClass':'toSecondClass',
        },

        pageInit: function () {
            this.getFirstKindFromLocal();
        },
        initPlugins:function(){

        },
        getFirstKindFromLocal: function () {
            var kind = storage.get(system_config.KIND_DATA_KEY);
            var kindList = new FirstClassList();
            kindList.add(kind);
            var firstKind = kindList.where({kind_class:"1"});
            kindList.reset();
            kindList.set(firstKind);
            this.collection = kindList;
            this.listenTo(this.collection,'all',this.render);
        },
        toSecondClass: function (e) {
            $('#itemlistNavTitle').text('二级分类');
            $('#itemlistNavTitle').removeClass('firstClass');
            $('#itemlistNavTitle').addClass('secondClass');
            var theEvent=window.event||e;
            var srcElement=theEvent.srcElement;
            if(!srcElement){
                srcElement=theEvent.target;
            }
            var index=srcElement.getAttribute('n');
            //console.log(index);
            this.model = this.collection.at(index);
            var firstKindID = this.model.get('kind_id');
            var secondClassListView = new SecondClassListView(firstKindID);
            secondClassListView.render();
        }

    });

    return firstClassListView;
});