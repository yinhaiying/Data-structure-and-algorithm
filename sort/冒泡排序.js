/* 
冒泡排序：每次通过相邻元素两两对比来获取最大值或者最小值。
第一次：n-1次操作
第二次：n-2次操作
第三次:n-3次操作
最终的时间复杂度是：n-1 + n-2 + n-3... +1 约为 O(n2)



*/
const arr = [5,1,2,3,4];
const bubbleSort = (arr) => {
  let len = arr.length;
  for(let i = 0;i < len;i++){
      for(let j = 0;j < len - i;j++){
        if(arr[j] > arr[j+1]){
            [arr[j],arr[j+1]] = [arr[j+1],arr[j]];
        }
      }
  }
  return arr;
}

console.log(bubbleSort(arr))