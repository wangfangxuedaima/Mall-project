/**
 * Created by lyting on 16-7-10.
 */
define([
    '../../js/common/BaseView',
    'keypad',
    'text!../../moduals/home-memberlogin/tpl.html',
], function (BaseView,Keypad, tpl) {

    var memberLoginModalView = BaseView.extend({

        id: "memberLoginModalView",

        el: '.popup',

        template: tpl,

        events: {
            'click .for-ok':'onOKClicked'
        },

        pageInit: function () {

        },
        initPlugins: function () {
            var payKeypad = f7app.keypad({
                input:'#memberNum',
                type:'numpad',
                convertToPopover:false,
                toolbar:false,
                dotButton:false
            });
        },
        onOKClicked: function () {
            //f7app.closeModal();
            console.log('close');
        }


    });

    return memberLoginModalView;
});