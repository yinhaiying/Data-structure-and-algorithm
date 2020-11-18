const merge = (a, b) => {
  let c = [];
  let i = 0;
  let k = 0;
  while (i < a.length || k < b.length) {
    if (i >= a.length) {
      c.push(b[k]);
      k += 1;
    } else if (k >= b.length) {
      c.push(a[i]);
      i += 1;
    } else {
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
};
let sort1 = (arr) => {
  let k = arr.length;
  let left = arr.slice(0,parseInt(k/2));
  let right = arr.slice(parseInt(k/2));
  return merge (left,right);
}

console.log(sort1([1, 3, 4, 6, 2, 5, 7, 8]));

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
// console.log(sort([1,3,2,4,5,6,7]));   // [1,2,3,4,5,6,7]
// console.log(sort([5,8,1,3,2,0,4]));   // [ 0, 1, 2, 3, 4, 5, 8 ]

// console.log(merge([],[1]))   // [1]
// console.log(merge([5, 6, 7], [1, 2, 3,4]));  // [1,2,3,4,5,6,7]
// console.log(merge([1, 3], [2,4,6,7]));  // [1,2,3,4,6,7]


/* 
将sort的数组拆分后排序，改成通过分割点在原数组进行排序。


*/



const sort = (arr) => {
  return inplaceSort(arr,0,arr.length)
};
const inplaceSort = (arr, start, end) => {
  if (end - start <= 1) {
    return arr;
  }
  let middle = parseInt((start + end) / 2);
  inplaceSort(arr, start, middle);
  inplaceSort(arr, middle, end);
  inplaceMerge(arr, start, middle, end);
  return arr;
};

const inplaceMerge = (arr, start, middle, end) => {
  let i = start,
    k = middle;
  while (i < middle && k < end) {
    let w = 0;
    while (arr[i] <= arr[k] && i < middle) {
      i += 1;
    }
    while (arr[i] >= arr[k] && k < end) {
      k += 1;
      w += 1;
    }
    let part = arr.splice(k - w, w);
    arr.splice(i, 0, ...part);
    i += w;
    middle += w;
  }
  return arr;
};
// console.log( sort([6,5,3,1,8,7,2,4]));