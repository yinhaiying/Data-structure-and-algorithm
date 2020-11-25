const quickSort = (arr) => {
    const [pivot,...rest] = arr;
    return arr.length <= 1 ? arr:[
        ...quickSort(rest.filter(n => n < pivot)),
        pivot,
        ...quickSort(rest.filter(n => n >= pivot))
    ]
}

// 数学思维实现方式二
const quickSort2 = (arr) => {
    if(arr.length <=1){
        return arr;
    }
    const pivot = arr[0];
    let left = [];
    let right = [];
    for(let i = 1;i < arr.length;i++){
        if(arr[i] < pivot){
            left.push(arr[i])
        }else{
            right.push(arr[i]);
        }
    }
    return [...quickSort2(left),pivot,...quickSort2(right)];
}
/* 
至少遍历了四次： filter 两次    ...也是一种遍历  两次
至少复制了五次:  rest 一次， filter两次,   ...两次
解决：减少遍历(一次遍历多做事情),减少复制(就地操作)



*/
// console.log(quickSort([1,5,2,6,3,4]));  // [1,2,3,4,5,6]
// console.log(quickSort2([1,5,2,6,3,4]));  // [1,2,3,4,5,6]


// 小的往左走，大的往右走。
/* 
需求：
数组：arr=[40,70,20,10,60,50,30]
函数handlerPivot以40为基准
小的往左走，大的往右走
使得数组arr变成[...小于40的数,40,...大于40的数]
返回值为povit的新的下标
不能创建新数组，只能就地操作

*/

// 不使用新的数组。
let inPlaceQuickSort = (arr) => {
    let pivot = arr[0];
    let index = 0;
    let i = 1;
    let w = 0;
    while(i < arr.length){
      let w = 0;
      while(arr[i] >= pivot){
          i+=1;
      }
      while(arr[i] < pivot){
        w+=1;
        i+=1;
      }
      let part = arr.splice(i-w,w);
      arr.splice(index,0,...part);
      index += w;
    }
    return [arr,index]
}


/* 
上面的代码中，虽然我们没有使用新的数组，但是使用splice进行切割时，数组中元素的位置，
其实是不断在移动地，因此如果splice次数非常多，那么移动的次数就很多了。那么我们可不可以换个想法，
不移动，只是替换，这样的话就没有太多的移动操作了。

*/
// let arr = [40, 20, 10, 70, 60, 50, 30];
// const [array, index] = inPlaceQuickSort(arr);
// console.log("arr:", array);
// console.log("index:", index);


// 不使用splice进行移动，而是通过替换


let arr1 = [40, 20, 10, 30, 50,60,70];
let arr2 = [40, 20, 20, 30, 20,30,50];
// 获取到pivot最终的位置，也就是获取到基准位置，在这个基准位置的左侧都小于它，右侧都应该大于它
const handlePivot = (arr,start,end) => {
    if(end - start === 0){
        return -1;
    }else if(end - start === 1){
        return start;
    }
    let pivot = arr[start];
    let i = start + 1;
    let bigStart = end - 1;
    let smallEnd = start;
    while( bigStart - smallEnd >= 1){
        if(arr[i] > pivot){
            [arr[i],arr[bigStart]] = [arr[bigStart],arr[i]];
            bigStart -= 1;
        }
        if(arr[i] <= pivot){
            i+=1;
            smallEnd += 1;
        }
    }
    [arr[start],arr[smallEnd]] = [arr[smallEnd],arr[start]];
    return smallEnd;
}

// console.log(handlePivot(arr,0,arr.length));
// console.log(handlePivot(arr1,0,arr.length));
// console.log(handlePivot(arr2,0,arr.length));
let arr = [40, 70, 60, 20, 10, 30, 50];
const quickSort3 = (arr) => {
  const _quickSort = (arr,start,end) => {
    if(end - start <= 1){
        return arr;
    }
    let pivotIndex = handlePivot(arr,start,end);
    _quickSort(arr, start, pivotIndex);
    _quickSort(arr, pivotIndex+1, end);
    return arr;
  }
  return _quickSort(arr,0,arr.length)
}
console.log(quickSort3(arr));


// let arr4 = [20,30,10,40];
// console.log(handlePivot(arr,0,7));


