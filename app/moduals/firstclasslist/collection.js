/**
 * Created by Joey on 2016/7/22.
 */
define(['../../js/common/BaseCollection',
    '../../moduals/firstclasslist/model'],function(BaseCollection,FirstClassModel){
    var firstClassList=BaseCollection.extend({

        model:FirstClassModel

    });

    return firstClassList;
});