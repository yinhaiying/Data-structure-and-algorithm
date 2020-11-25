/* 
n个数中找到最小的，然后放到前面(或者找到最大的，然后放到最后)
n + (n - 1) + (n - 2)  + (n-3) +... + 1
最终的时间复杂度是O(n2)。

sort(n) = {
    an,n = 1,
    [min(an)] + sort(an-1)
}
分而治之：将一个问题分解成两个相对简单的问题
将n个数的排序，转化为找n个数的最小值以及n-1个数的排序。

降低规模：
选择排序：每次规模都减少1
归并排序：每次规模减少一些(不一定是一半，如果基准点选的不好，可能只减少一部分)
快速排序：每次规模减少一半
*/

let arr = [14,5,2,8,3,4,7,11,9];
const selectSort = (arr) => {
  if(arr.length <= 1){
    return arr;
  }
  for(let i = 0;i < arr.length;i++){
    let minIndex = i;
    for(let j = i+1;j < arr.length;j++){
        if(arr[minIndex] > arr[j]){
            minIndex = j;
        }
    }
    [arr[i],arr[minIndex]] = [arr[minIndex],arr[i]];
  }
  return arr;
}

console.log(selectSort(arr));