"use strict";
module.exports = {
    /*合并去重
     *arr1, arr2 传入数组
     */
    mergeToHeavy: function(arr1, arr2) {
        let arr = arr1.concat(arr2);
        let result = [];
        arr.forEach(function(v, i, arr) {
            var bool = arr.indexOf(v, i + 1); //从传入参数的下一个索引值开始寻找是否存在重复
            if (bool === -1) {
                result.push(v);
            }
        });
        return result;
    },
    /*数组转字符串
     *arr 转换对象
     *fa 间隔元素
     */
    tostring: function(arr, fa) {
        let result;
        result = arr.join(fa);
        return result;
    }
};