## 队列
队列(Queue)是一种**受限的线性结构:先进先出。**
**它的受限之处是：**
1. 只允许在表的前端(队首)进行删除操作。
2. 只允许在表的后端(队尾)进行插入操作。

### 队列应用
打印队列：
- 有五份文档需要打印，这些文档会按照次序放入到打印队列中。
- 打印机会依次从队列中取出文档，优先放入的文档，优先被取出，并且对该文档进行打印。
- 以此类推，直到队列中不再有新的文档。

线程队列：
- 在开发中，为了让任务可以并行处理，通常会开启多个线程。
- 但是我们不能让大量的线程同时运行处理任务。(这样会占用过多的资源)
- 这个时候如果有需要开启线程处理任务的情况，我们就会使用线程队列。
- 线程队列会依照次序来启动线程，并且处理相对应的任务。

### 队列常见操作
1. enqueue(ele):向队列尾部添加一个或者多个元素.(enter queue:进入队列)
2. dequeue(ele):移除队列的第一项，并且返回被移除的元素(delete queue：删除队列元素)
3. front():返回队列中第一个元素——最先被添加，也将是最先被移除的元素。队列不做任何变动。
4. isEmpty():判断队列是否为空。如果队列中不包含任何元素，返回true.否则返回false。
5. size():返回队列包含的元素。
6. toString():将队列中的内容，转成字符串形式。

### 使用数组实现队列的缺点：
1. 进行删除时，删除队首元素以后，队列的其他元素都要往前移动。如果队列元素非常多，会造成效率低下。

### 队列的实现
```
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

```

### 优先级队列

**优先级队列：**

- 普通队列插入一个元素，数据会被放在队尾。并且需要前面所有的元素都处理完成之后，才会处理插入的元素。
- 但是优先级队列，在插入一个元素的时候会考虑该数据的优先级。
- 新插入的元素的优先级和之前插入的元素的优先级进行比较。
- 比较完成后，得出这个元素在队列中的正确的位置。
- 获得具有优先级的队列后，其他的操作和普通队列相同。

**优先级队列主要考虑的问题：**
- 每个元素不再只是一个数据，而且包含数据的优先级
- 在添加时，根据优先级放入正确的位置。