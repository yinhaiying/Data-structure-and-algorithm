const quickSort = (arr) => {
    const [pivot,...rest] = arr;
    return arr.length <= 1 ? arr:[
        ...quickSort(rest.filter(n => n < pivot)),
        pivot,
        ...quickSort(rest.filter(n => n >= pivot))
    ]
}

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
console.log(quickSort([1,5,2,6,3,4]));  // [1,2,3,4,5,6]
console.log(quickSort2([1,5,2,6,3,4]));  // [1,2,3,4,5,6]