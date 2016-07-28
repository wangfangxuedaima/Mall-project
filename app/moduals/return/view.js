/**
 * Created by lyting on 16-7-10.
 */
define([
    '../../js/common/BaseView',
    'text!../../moduals/return/tpl.html',
], function (BaseView, tpl) {

    var returnView = BaseView.extend({

        id: "returnView",

        el: '.views',

        template: tpl,

        events: {
            'click .open-left-panel':'openLeft',
        },

        pageInit: function () {
            $('.joey').bind('click', function () {
                console.log('joey');
            });
        },
        openLeft: function () {
            // 'left' position to open Left panel
            f7app.openPanel('left');
        },


    });

    return returnView;
});