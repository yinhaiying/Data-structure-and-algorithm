/* 
计数排序：
1. 空间换时间
  用一个hash table计数，两次遍历解决问题
  第一次遍历将数组复制到hash table中
  第二次遍历，i从min到max（max为最大值）
  时间复杂度将为O(n + max -min)。
2. 输入的数据必须是有确定范围的整数
3. 在某些情况下效率很低。
元素个数少，值跨度很大时。比如[1,999999999,5555]排序时就很慢。


*/
let arr = [22,2,14,31,1,2,15,8,5,2];
let arr1 = [2,13,4,5,2,15,16,4,7,0,8,9];

let countSort = (arr) => {
    let obj = {};
    let min= arr[0];
    let max = arr[0];
    // 第一步：取值
    for(let i = 0;i < arr.length;i ++){
      if(min > arr[i]){
          min = arr[i];
      }
      if(max < arr[i]){
          max = arr[i];
      }
      if(!obj[arr[i]]){
          obj[arr[i]] = 1;
      }else{
          obj[arr[i]] +=1;
      }
    }
    // 第二步遍历：
    const result = [];
    for(let i = min;i <= max;i++){
        if(obj[i]){
            for(let j = 0;j<obj[i];j++){
                result.push(i);  // 出现几次就push几次。
            }
        }
    }
    // console.log("min:", min);
    // console.log("max:", max);
    // console.log("obj:", obj);
    return result;
}
console.log(countSort(arr))  // [ 1, 2, 2, 2, 5, 8, 14, 15, 22, 31 ]
console.log(countSort(arr1))  // [ 1, 2, 2, 2, 5, 8, 14, 15, 22, 31 ]
