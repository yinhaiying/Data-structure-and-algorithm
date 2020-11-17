// 将两个已经排序好的数组合并成一个新的排序数组
// 两个手分别指着两个数组的开头，谁小就取谁放入新的数组中。

// 这里使用了额外的空间。
const merge = (a,b) => {
    let c = [];
    let i = 0;
    let k = 0;
    while(i < a.length || k < b.length){
        if(i >= a.length){
            c.push(b[k]);
            k += 1;
        }else if(k >= b.length){
            c.push(a[i]);
            i += 1;
        }else{
          if (a[i] <= b[k]) {
            c.push(a[i]);
            i += 1;
          } else {
            c.push(b[k]);
            k += 1;
          }
        }
    }
    return c;
}

// console.log(merge([1,2,4],[3,5,8]));  // [ 1, 2, 3, 4, 5, 8 ]
// console.log(merge([],[]));  // [ ]
// console.log(merge([2,3,7,8],[1,4,6]));  // [ 1, 2, 3, 4, 6, 7, 8 ]

// 不使用额外的空间
const merge1 = (a, b) => {
  let i = 0;
  let k = 0;
  while (i<a.length || k < b.length) {
      if(i >= a.length){
          a.push(b[k]);
          k++;
      }else{
        if (b[k] <= a[i]) {
            a.splice(i, 0, b[k]);
            k += 1;
            i += 1;
        } else {
            i++;
        }
      }
  }
  return a;
};
console.log(merge1([1, 4], [3, 5, 6]));
console.log(merge1([1, 2], [3, 5, 6]));