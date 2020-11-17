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


const sort = (arr) => {
  let k = arr.length;
  if (k === 1) {
    return arr;
  }
  // slice 复制一半
  let left = arr.slice(0, parseInt(k / 2));
  console.log("left:",left);
  // slice 复制一半
  let right = arr.slice(parseInt(k / 2));
  console.log("right:",right);
  console.log("sort_left:",sort(left));
  console.log("sort_right:",sort(right));
  console.log("merge:",merge(sort(left), sort(right)))
  // merge 也是复制到一个新的数组
  return merge(sort(left), sort(right));
}
console.log(sort([1,3,2,4,5,6,7]));   // [1,2,3,4,5,6,7]
console.log(sort([5,8,1,3,2,0,4]));   // [ 0, 1, 2, 3, 4, 5, 8 ]

// console.log(merge([],[1]))   // [1]
// console.log(merge([5, 6, 7], [1, 2, 3,4]));  // [1,2,3,4,5,6,7]
// console.log(merge([1, 3], [2,4,6,7]));  // [1,2,3,4,6,7]