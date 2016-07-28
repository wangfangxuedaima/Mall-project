/**
 * Created by lyting on 16-7-10.
 */
define([
    '../../js/common/BaseView',
    '../../moduals/editnumpickermodal/model',
    'keypad',
    'text!../../moduals/editnumpickermodal/tpl.html',
], function (BaseView,EditNumModel,Keypad, tpl) {

    var editNumView = BaseView.extend({

        id: "editNumView",

        el: '.for-edit-amount',

        template: tpl,

        events: {

        },

        pageInit: function () {

        },
        initPlugins: function () {
        },

    });

    return editNumView;
});