## 链表
### 数组的缺点以及链表
- 数组的创建通常需要一段连续的内存空间(一整块的内存),并且大小是固定的。当当前数组不能满足容量需求时，需要进行扩容。(一半情况下是申请一个更大的数组，比如2倍，然后将数组中的元素复制过去)。
- 在数组开头和中间位置插入元素的成本很高，需要进行大量元素的移动。

由于数组存在以上的缺点，因此我们如果要存储多个元素，可以考虑使用链表。
- 链表不同于数组，链表中的元素在内存中不必是连续的。
- 链表的每个元素由一个**存储元素本身的节点** 和 **指向下一个元素的引用**组成。

**相比于数组，链表具有的优点：**
1. 内存空间不必是连续的
2. 链表不必在创建时就确定大小，并且链表的大小可以无限地延伸下去。
3. 链表在插入和删除数据时，时间复杂度可以达到O(1)。相对效率更高一些。

**相比于数组，链表具有的缺点：**
1. 链表访问任何一个位置的元素时，都需要从头开始访问。
2. 链表无法通过下标访问元素，需要从头开始访问元素，直到找到对应的元素。

###链表类的封装
链表类的封装和其他数据结构的封装一样。主要是考虑需要有哪些属性和哪些方法？

**链表中的属性：head 和 length。**
这里的length主要是为了方便记录链表的长度。因为链表不像数组一样可以直接获取到长度。
我们最好在定义时就获得链表的长度。
**链表中的常见操作**
增
1. append(element):向列表尾部添加一个新的项
2. insert(position,element):向列表指定位置插入一个新的项
查
3. get(position):获取对应位置的元素
4. indexOf(element):返回元素在链表中的索引，如果列表中没有该元素则返回1
改
5. update(position,element):修改元素某个位置的值
删
6. removeAt(position):从列表特定位置删除一项
7. remove(element):从列表中删除一项

8. isEmpty():如果链表不包含任何元素返回true
9. size():返回链表包含的元素个数
10. toString():由于链表使用了内部类，就需要重写继承自Javascript对象默认的toString方法，让其只输出元素的值。

**使用链表始终牢记两点：**
1. 链表无法直接找到某一个元素，必须从第一个元素开始查找。
2. 链表操作一定涉及到指针

#### append(element)
向链表尾部添加一个节点。
操作链表时，始终牢记刚刚上面的两点：
1. 一定是从第一个元素开始查找。
添加节点时，同样是从第一个元素开始。首先我们需要判断当前链表有没有第一个元素。
如果没有，那么新添加的元素就是第一个元素。
2. 链表操作一定设计到指针的变化。将新创建的添加到链表中，实际上就是讲最后一个元素的next指向新创建的元素。
```
    let newNode = new Node(element)
    //1. 判断是否添加的是第一个节点
    if(this.length == 0){
        this.head = newNode;
    }
```
如果新添加的元素不是链表中的第一个元素，那么我们需要找到链表中的最后一个元素，然后将其next指向新创建的元素。
同样是牢记两点：
1. 需要从第一个元素开始查找。查找结束的条件是元素的next指向null。
2. 一定设计到指针的操作。通过指针的next来结束循环。
```
    let current = this.head; // this.head指向的是一个节点。因此这里current代表一个节点
    while(current.next){
        current = current.next;
    }
```
链表中添加元素的完整代码如下：
```
LinkedList.prototype.append = function(element){
    let newNode = new Node(element)
    //1. 判断是否添加的是第一个节点
    if(this.length == 0){
        this.head = newNode;
    }else{
    //2.不是第一个节点。通过while循环找到最后一个节点。    
        let current = this.head; // this.head指向的是一个节点。因此这里current代表一个节点
        while(current.next){
            current = current.next;
        }
        // 让最后节点的next指向新的节点
        current.next = newNode;
    }
    this.length += 1;
    }
```

#### insert(position,element)
```
LinkedList.prototype.insert(position,element){
    //1. 对position进行越界判断
    if(position < 0 || position > this.length){
        return false;
    }

    //2. 创建新的节点
    let newNode = new Node(element);

    //3. 判断插入的元素是否是第一个
    if(position == 0){
        let current = this.head;// 保存原来的第一个
        this.head = newNode;
        newNode.next = current;
    }else{
        let index = 0;
        let previous = null;//一开始head的前一个就是null
        let current = this.head;
        while(index++ < position){
            previous = current;
            //索引值每加一次1，current就指向下一个next
            current = current.next;
        }
        newNode.next = current;
        previous.next = newNode;
    }
    //4. length+1
    this.length += 1;
    return true;
}

```
#### get(position)
```
      LinkedList.prototype.get = function(position){
          //1. 边界条件的判断
          if(position < 0 || position >= this.length){
              return false;
          }
          //2. 获取指定position对应节点的内容
          let index = 0;
          let current = this.head;
          while(index < position){
            index += 1;
            current = current.next;
          }
          return current.element;
      }
```
#### indexOf(element)
```
       LinkedList.prototype.indexOf = function(element){
           let index = 0;
           let current = this.head;
           while(current.element != element){
             index +=1;
             current = current.next;
             if(index >= this.length){
                 return -1;
             }
           }
           return index;
       }

```
#### update(position,element)
```
    LinkedList.prototype.update = function(position,element){
        if(position < -1 || position >= this.length){
            return false;
        }
        let index = 0;
        let current = this.head;
        while(index < position){
            index += 1;
            current = current.next;
        }
        current.element = element;
        return true
    }
```

#### removeAt(position):从链表的特定位置移除一项
```

    LinkedList.prototype.removeAt = function(position){
        // 1. 边界判断
        if(position < -1 || position >= this.length){
            return false;
        }
        // 2. 找到链表的特定位置
        let index = 0;
        let current = this.head;
        let previous = null;
        // 如果删除的元素是第一个元素
        if(position == 0){
            this.head = current.next;
        }else{
            //如果删除的不是第一个元素
            while(index < position){
                index += 1;
                previous = current;
                current = current.next;
            }
            previous.next = current.next;
        }
        this.length -= 1;
        return current.element;
    }

```
#### remove(element):从链表中移除某个元素
```
    LinkedList.prototype.remove = function(element){
        let current = this.head;
        let previous = null;
        // 如果要移除的元素正好是第一项
        if(current.element == element){
            this.head = current.next;
        }else{
            while(current.element != element){
                if(!current.next){
                    return -1;
                }
                previous = current;
                current = current.next;
            }
            previous.next = current.next;
            return current.element;
        }
    }

```

### 单向链表总结：
1. 只要是涉及到位置position定义index变量
2. 只要是涉及到添加元素的，定义current = this.head
3. 定义的属性通常会被使用到，如果没有使用到就需要考虑一下是否正确。
4. 每一个节点的值，指针等一定会被使用到。


## 双向链表

单向链表和双向链表的比较

单向链表：
1. 只能**从头遍历到尾**
2. 实现原理是上一个节点中有指向下一个的引用。

双向链表：
1. 既可以**从头遍历到尾**，又可以**从尾遍历到头。**
2. 一个节点既有向前连接的引用，也有一个向后的引用。
双向链表不仅有一个head指针指向第一个节点，也有一个tail指针指向最后一个节点。如果没有前一个节点，则pre指向null,如果没有后一个节点，则next指向null。

双向链表带来的缺点：
由于每个节点需要管理两个引用，每次在插入或者删除某个节点时，需要处理四个引用，而不是两个。也就是实现起来要困难一些。并且相对于单向链表，占用空间必然更加大一些。

###双向链表类的封装

封装一个双向链表类，首先需要考虑这个类需要哪些必要属性，需要哪些方法(一般是指操作方法)。

**属性:**
head:用于指向第一个节点
tail:用于指向最后一个节点
length:用于标记链表的长度
```
function DoublyLinkedlist(){
    // 属性
    this.head = null; //默认情况下(也就是没有节点的情况下)指向null
    this.tail = null;
    this.length = 0;
    
    function Node(ele){
        this.ele = ele;
        this.prev = null;
        this.next = null;
    }
}

```
**常见操作的封装:**
增
1. append(element):向列表尾部添加一个新的项
2. insert(position,element):向列表指定位置插入一个新的项
查
3. get(position):获取对应位置的元素
4. indexOf(element):返回元素在链表中的索引，如果列表中没有该元素则返回1
改
5. update(position,element):修改元素某个位置的值
删
6. removeAt(position):从列表特定位置删除一项
7. remove(element):从列表中删除一项

8. isEmpty():如果链表不包含任何元素返回true
9. size():返回链表包含的元素个数
10. toString():由于链表使用了内部类，就需要重写继承自Javascript对象默认的toString方法，让其只输出元素的值。

11. forwardString():返回正向遍历的节点字符串形式。
12. backfordString():返回反向遍历的节点字符串形式。

#### append(element)
在链表尾部添加一个节点。如图双向链表-append(ele)所示：
考虑问题的思路是：
1. 创建一个新的节点
2. 考虑新节点的prev和最后一个节点的next
3. 修改this.tail的指向
4. 由于双向链表链表存在一个tail直接表示最后一个节点，因此不需要再循环从头开始找第一个节点。

如果链表为空.
```
    let newNode = new Node(ele);
    if(this.length == 0){
        this.head = newNode;
        this.tail = newNode;
    }
```
如果链表不为空。
```
    newNode.prev = this.tail; //新节点的prev
    this.tail.next = newNode;//最后一个节点的next
    this.tail = newNode;//修改this.tail的指向
```
完整的append(element)代码：
```
    DoublyLinkedlist.prototype.append = function(ele){
        let newNode = new Node(ele);
        //如果链表为空
        if(this.length == 0){
            this.head = newNode;
            this.tail = newNode;
        }else{
            newNode.prev = this.tail;
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.length += 1;
    }
```



#### 双向链表总结：
双向链表需要考虑的因素：
1. 新创建节点的prev和next
2. 前一个节点的next
3. 用于指向第一个节点的head和指向最后一个节点的tail










