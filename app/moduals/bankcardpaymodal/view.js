/**
 * Created by lyting on 16-7-10.
 */
define([
    '../../js/common/BaseView',
    'keypad',
    'text!../../moduals/bankcardpaymodal/tpl.html',
], function (BaseView,Keypad, tpl) {

    var bankcardPayModalView = BaseView.extend({

        id: "bankcardPayModalView",

        el: '.popup',

        template: tpl,

        events: {
            'click .for-ok':'onOKClicked'
        },

        pageInit: function () {

        },
        initPlugins: function () {
            var payKeypad = f7app.keypad({
                input:'#bankcardpayamount',
                type:'numpad',
                convertToPopover:false,
                toolbar:false
            });
            var bankcardKeypad = f7app.keypad({
                input:'#bankcardnum',
                type:'numpad',
                convertToPopover:false,
                toolbar:false
            });
        },
        onOKClicked: function () {
            //f7app.closeModal();
            console.log('close');
        }


    });

    return bankcardPayModalView;
});