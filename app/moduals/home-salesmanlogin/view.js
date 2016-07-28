/**
 * Created by lyting on 16-7-10.
 */
define([
    '../../js/common/BaseView',
    'keypad',
    'text!../../moduals/home-salesmanlogin/tpl.html',
], function (BaseView,Keypad, tpl) {

    var salesmanLoginModalView = BaseView.extend({

        id: "salesmanLoginModalView",

        el: '.popup',

        template: tpl,

        events: {
            'click .for-ok':'onOKClicked'
        },

        pageInit: function () {

        },
        initPlugins: function () {
            var payKeypad = f7app.keypad({
                input:'#salesmanNum',
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

    return salesmanLoginModalView;
});