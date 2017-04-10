/**
 * Created by lyting on 16-7-10.
 */
define([
    '../../../../js/common/BaseView',
    '../../../../moduals/login/model',
    'text!../../../../moduals/login/login.html',
    'md5'
], function(BaseView, LoginModel, tpl) {

    var loginView = BaseView.extend({

        id: "loginView",

        el: '.views',

        template: tpl,

        events: {
            "click #loginBtn": "doLogin"
        },

        pageInit: function() {
            this.request = new LoginModel();
            this.model = new LoginModel();
            this.request.getFirstClass(function(resp) {
                storage.set(system_config.KIND_DATA_KEY, resp['kind_detail']);
            })
        },

        doLogin: function() {
            //获取model数据
            var _data = this.$el.find(":input").serializeObject();
            // 向model中添加数据，触发验证
            this.model.set(_data, { validate: true });
            // model 数据验证
            //router.navigate("main", {trigger: true, replace: true});
            if (this.model.isValid()) {
                // 判断调试模式
                this.model.login(function(response) {

                    if (!$.isEmptyObject(response)) {
                        if (response.status == "00") {
                            storage.set(window.system_config.LOGIN_USER_KEY, response);
                            storage.set(window.system_config.TOKEN_KEY, response["token"]);
                            router.navigate("main", {
                                trigger: true,
                                replace: true
                            });
                        } else {
                            alert(response['msg']);
                        }

                    } else {
                        alert('dsfsa');
                        //this._modal.render();
                        //$(".for-modal-tips").modal("show");
                    }
                });

            }
        }
    });

    return loginView;
});