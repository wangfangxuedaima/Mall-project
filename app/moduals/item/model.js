/**
 * Created by Joey on 2016/7/22.
 */
define(['../../js/common/BaseModel'],function(BaseModel){

    var itemModel=BaseModel.extend({

        goods: function (data, callback) {
            this.sendPOST({
                url: window.API_URL.BARGAINGOODS,
                data: data,
                success: callback
            });
        },
        sku: function (data, callback) {
            this.sendPOST({
                url: window.API_URL.SKU,
                data: data,
                success: callback
            });
        }
    });
    return itemModel;
});