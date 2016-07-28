/**
 * Created by lyting on 16-6-28.
 */
window.statusCode = {
    "00": "交易成功",
    "11": "失败",
    "12": "旧卡卡号状态错误",
    "13": "新卡卡号状态错误",
    "14": "卡号已被注册",
    "15": "手机号已被注册",
    "16": "卡号无效状态",
    "17": "查询不到会员信息",
    "20": "参数无效",
    "21": "余额不足",
    "22": "退款金额超限",
    "23": "请求退款的交易被冻结",
    "24": "交易不存在",
    "25": "系统错误",
    "26": "交易已经完结",
    "27": "交易状态非法",
    "28": "退款金额无效",
    "29": "无权限使用接口",
    "30": "POS KEY填写错误",
    "31": "交易信息被篡改",
    "32": "交易已被支付",
    "33": "请以POST方式传入参数",
    "34": "请传入接口名称",
    "35": "请传入商户请求参数的签名串",
    "36": "请传入发送请求的时间", //'yyyy-MM-dd HH:mm:ss
    "37": "接口名未注册",
    "38": "此卡支付方式错误",
    "39": "退款失败",
    "40": "卡号不能为空",
    "41": "加密串不能为空",
    "42": "密码不能为空",
    "43": "商户交易单号不能为空",
    "44": "订单总金额不能为空",
    "45": "消费金额不能为空",
    "46": "商户原交易单号不能为空",
    "47": "退款金额不能为空",
    "48": "不是正确金额",
    "49": "终端号不能为空",
    "50": "当前无流水信息",
    "51": "读取打印小票模版错误",
    "52": "此卡状态异常",
    "53": "此卡不存在",
    "54": "此卡无效",
    "55": "密码错误",
    "56": "卡已过有效期",
    "57": "消费积分不能为空",
    "58": "门店未设置积分编码",
    "59": "此卡积分不足",
    "60": "账号密码不匹配",
    "61": "岗位权限不匹配",
    "62": "无此权限",
    "63": "参数错误",
    "64": "用户已停用",
    "65": "Token失效或已经过期",
    "66": "POS授权许可无效",
    "67": "token不允许为空",
    "68": "商品不存在"
};

window.API_URL = {
    "LOGIN": "/login",
    "SKU": "/sku",
    "KIND1": "/kind",
    "KIND2": "/kind",
    "BARGAINGOODS": "/kind",
    "ACCOUNT_INFOR": "/account/infor",
    "ACCOUNT_PAY": "/account/pay",
    "ACCOUNT_REFUND": "/account/refund",
    "ACCOUNT_QUERY": "/account/query",
    "TRADE_CONFIRM": "/trade_confirm",
    "REFUND": "/refund",
    "ONLINEPAY_PAY": "/onlinepay/pay",
    "ONLINEPAY_QUERY": "/onlinepay/query",
    "ONLINEPAY_REFUND": "/onlinepay/refund",
    "INIT": "/init",
    "GATHER": "/gather",
    "SETTINGS": "/settings",
    "ONLINEBILL": "/onlinebill",
    "ACCOUNT_ICPWD": "/account/icpwd"
};

// 系统参数设置
window.system_config = {
    'IS_FIRST_KEY': 'IS_FIRST',
    "LOGIN_USER_KEY": "LOGIN_USER",
    "LOCAL_RECEIPT_KEY": "LOCAL_RECEIPT",
    "SETTING_DATA_KEY": "SETTING_DATA",
    "INIT_DATA_KEY": "INIT_DATA",
    "GATEWAY_KEY": "gateway",
    "POS_KEY": "pos_key",
    "TOKEN_KEY": "TOKEN",
    "STAMP_DATA_KEY": "STAMP_DATA",
    "BASE_DATA_KEY": "BASE_DATA",
    "HOME_KEY": "HOME_KEY",
    "SALEMENT_KEY": "SALEMENT_KEY",
    "KIND_DATA_KEY": "KIND_DATA",
    "GATHER_KEY": "gather_detail",
    "SALE_PAGE_KEY":"SALE_PAGE",
    "RETURN_KEY":"RETURN"
};

window.RESPONSE_TOOLS = {
    status_code: "00",
    is_success: function (status_code) {
        if (RESPONSE_TOOLS.status_code == status_code) {
            return true;
        }
        return false;
    }
};
