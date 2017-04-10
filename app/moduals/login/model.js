/**
 * Created by Joey on 2016/7/22.
 */
define(['../../js/common/BaseModel'], function(BaseModel) {

    var loginModel = BaseModel.extend({

        validation: {
            user_id: {
                required: true,
                msg: '请输入用户名！'
            },
            user_password: {
                required: true,
                msg: '请输入密码！'
            }
        },

        initModel: function(options) {
            // 属性验证
            this.bind("invalid", function(view, attrs, error, selector) {
                for (var _key in attrs) {
                    alert(attrs[_key]);
                    return;
                }
            });
        },

        getFirstClass: function(callback) {
            this.sendPOST({
                url: window.API_URL.KIND1,
                data: {},
                async: false,
                success: callback
            })
        },

        login: function(callback) {
            var _data = this.toJSON();
            _data["user_password"] = _data["user_password"] ? $.md5(_data["user_password"]) : '';
            var _params = _.extend(_data, {
                "accredit_type": "00",
            });
            this.sendPOST({
                url: window.API_URL.LOGIN,
                data: _params,
                success: callback
            });
        }

    });
    return loginModel;
});