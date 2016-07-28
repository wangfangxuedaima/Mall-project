/**
 * Created by Joey on 2016/7/22.
 */
define(['../../js/common/BaseCollection',
    '../../moduals/secondclasslist/model'],function(BaseCollection,SecondClassModel){
    var secondClassList=BaseCollection.extend({

        model:SecondClassModel

    });

    return secondClassList;
});