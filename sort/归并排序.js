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







// 实现sort

// const sort = (arr) => {
//   let k = arr.length;
//   if (k === 1) {
//     return arr;
//   }
//   // slice 复制一半
//   let left = arr.slice(0, parseInt(k / 2));
//   // slice 复制一半
//   let right = arr.slice(parseInt(k / 2));
//   // merge 也是复制到一个新的数组
//   return merge(sort(left), sort(right));
// }
// console.log(sort([1,3,2,4,5]))
/* 
两个问题：
1. slice了两次，相当于复制了一次完整的数组
2. merge的时候创建了新的数组进行push，又相当于实现了一次所有数据的复制
in-place 操作
*/

// 不使用额外的空间
// const merge1 = (a, b) => {
//   let i = 0;
//   let k = 0;
//   while (i<a.length || k < b.length) {
//       if(i >= a.length){
//           a.push(b[k]);
//           k++;
//       }else{
//         if (b[k] <= a[i]) {
//             a.splice(i, 0, b[k]);
//             k += 1;
//             i += 1;
//         } else {
//             i++;
//         }
//       }
//   }
//   return a;
// };
// console.log(merge1([1, 4], [3, 5, 6]));
// console.log(merge1([1, 2], [3, 5, 6]));


// 就地merge

const merge3 = (a,middle) => {
    // middle实际上是分隔线
    // [0..middle]是排好序的     
    // [middle..length] 也是排好序的
    // 要让a整体排好序
    let i = 0;k = middle;
    while(i < middle && k < a.length){
        let w = 0;
        console.log("循环开始 w:",w)
        while(a[i] <= a[k] && i < middle){
            console.log("跳过i:",i);
            i+=1;
            console.log("i加1:",i)
        }
        while(a[i] >= a[k] && k < a.length){
            console.log("a[i] < a[k]")
            k+=1;
            w+=1;
            console.log(`k加1:${k}，w:${w}`);
        }
        let part = a.splice(k-w,w);
        console.log("part:",part);
        console.log("修改前的a:",a);
        a.splice(i,0,...part);
        console.log("此时的a:",a)
        i += w;
        middle += w;
    }
    return a;
}
// console.log("...........................")
// console.log(merge3([1,3,5,8,    2,4,6,7],4))


const merge4 = (a,start, middle,end) => {
  // middle实际上是分隔线
  // [0..middle]是排好序的
  // [middle..length] 也是排好序的
  // 要让a从start到end排好序
  let i = start;
  k = middle;
  while (i < middle && k < end) {
    let w = 0;
    while (a[i] <= a[k] && i < middle) {
      i += 1;
    }
    while (a[i] >= a[k] && k < end) {
      k += 1;
      w += 1;
    }
    let part = a.splice(k - w, w);
    a.splice(i, 0, ...part);
    i += w;
    middle += w;
  }
  return a;
};

// console.log("...........................");
// console.log(merge4([1, 18, 5,8,    2, 4, 6,7],2, 4,6));


// 就地sort

const inplace_sort = (arr, start, end) => {
  if (end - start <= 1) return arr;
  let middle = parseInt((start + end) / 2);
  console.log("arr:",arr,"start:",start,"middle:",middle);
  inplace_sort(arr, start, middle);
  console.log("arr:", arr, "middle:", middle, "end:", end);
  inplace_sort(arr, middle, end);
  merge4(arr, start, middle, end); // merge
  return arr;
};
const sort1 = (arr) => inplace_sort(arr, 0, arr.length);


sort1([1,2,9,4,6])