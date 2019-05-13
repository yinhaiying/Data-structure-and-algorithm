function Queue(){
    // 属性
    this.items = [];
    // 方法
    this.enqueue = function(ele){
        this.items.push(ele)
    }
    Queue.prototype.dequeue = function(){
        return this.items.shift()
    }
    Queue.prototype.front = function(){
        return this.items[0]
    }
    Queue.prototype.isEmpty = function(){
        return this.items.length == 0
    }
    Queue.prototype.size = function(){
        return this.items.length
    }
    Queue.prototype.toString = function(){
        let str = '';
        for(let i = 0;i < this.items.length;i++){
            str += this.items[i] + ' '
        }
        return str
    }
}