/**
 * Created by lyting on 16-7-10.
 */
define([
    '../../js/common/BaseView',
    '../../moduals/firstclasslist/view',
    '../../moduals/secondclasslist/view',
    'text!../../moduals/itemlist/tpl.html',

], function (BaseView,FirstClassListView,SecondClassListView, tpl) {

    var firstClassListView = BaseView.extend({

        id: "firstClassListView",

        el: '.for-itemlist',

        template: tpl,

        events: {
            'click .toSecondClass':'toSecondClass',
            'click .back':'onBackClicked'
        },

        pageInit: function () {

        },
        initOtherView: function () {
            var firstClassListView = new FirstClassListView();
            firstClassListView.render();
            this.handleEvents();
        },
        initPlugins: function () {
            var _self = this;
            $('.back').on('click', function () {
                if($('#itemlistNavTitle').hasClass('firstClass')) {
                    f7app.closePanel();
                } else if($('#itemlistNavTitle').hasClass('secondClass')) {
                    _self.updateClass1();
                    var firstClassListView = new FirstClassListView();
                    firstClassListView.render();
                } else if ($('#itemlistNavTitle').hasClass('shopItem')) {
                    _self.updateClass2();
                    var secondClassListView = new SecondClassListView(_self.history);
                    secondClassListView.render();
                }
            });
        },
        handleEvents: function () {
            Backbone.off('secondClassHistory');
            Backbone.on('secondClassHistory',this.secondClassHistory,this);
        },
        updateClass1: function () {
            $('#itemlistNavTitle').text('一级分类');
            $('#itemlistNavTitle').addClass('firstClass');
            $('#itemlistNavTitle').remove('secondClass');
        },
        updateClass2: function () {
            $('#itemlistNavTitle').text('二级分类');
            $('#itemlistNavTitle').addClass('secondClass');
            $('#itemlistNavTitle').remove('shopItem');
        },
        secondClassHistory: function (kind2) {
            this.history = kind2;
            console.log(this.history);
        }

    });

    return firstClassListView;
});