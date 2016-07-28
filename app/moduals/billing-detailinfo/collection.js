/**
 * Created by Joey on 2016/7/22.
 */
define(['../../js/common/BaseCollection',
    '../../moduals/billing-detailinfo/model'],function(BaseCollection,BillDetailModel){
    var billDetailCollection=BaseCollection.extend({

        model:BillDetailModel

    });

    return billDetailCollection;
});