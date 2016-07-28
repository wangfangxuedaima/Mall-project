/**
 * Created by Joey on 2016/7/22.
 */
define(['../../js/common/BaseCollection',
    '../../moduals/item/model'],function(BaseCollection,itemModel){
    var itemCollection=BaseCollection.extend({

        model:itemModel,



    });

    return itemCollection;
});