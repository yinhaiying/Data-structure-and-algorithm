/* 
插入排序：
插入排序就是跟我们平常打牌时规则一致，从左往右进行排列，将牌插入到合适的位置。
虽然叫做插入排序，但是最好不要使用splice。因为splice会导致整体移动。
既然不能随意移动，那么就只能进行交换了。

最差情况是：1 +2 + 3 + n-1 + n  = O(n2)

*/

const insertSort = (arr) => {
    if(arr.length <= 1){return arr};
    for(let s = 1;s < arr.length;i++){
        const n = arr[s];
        let i;
        for(i = s-1;i>=0;i--){
            if(arr[i] > n){
                // n需要往前插
                arr[i+1] = arr[i];
            }else if(arr[i <=n]){
                // 前面都比n小，不能往左进行插入了。
                break;
            }
        }
        arr[i+1] = n;
    }
    return arr;
}