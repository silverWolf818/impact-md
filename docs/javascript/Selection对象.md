## Selection对象

`Selection`对象表示用户选择的文本范围或插入符号的当前位置。它代表页面中的文本选区，可能横跨多个元素。文本选区由用户拖拽鼠标经过文字而产生。要获取用于检查或修改的`Selection`对象，请调用 `window.getSelection()`。

创建一个`selection`对象非常简单，代码如下：

```js
const selection = window.getSelection();
console.log(selection);
```

在控制台查看一下结果，`selection`对象中的属性及方法如下图：

![selection1](../images/selection1.png)

### 属性

| 属性          | 说明 |
| -------------|------|
| anchorNode   |返回该选区起点所在的节点。|
| anchorOffset | 返回一个数字，其表示的是选区起点在 anchorNode 中的位置偏移量。如果 anchorNode 是文字节点，那么返回的就是从该文字节点的第一个字开始，直到被选中的第一个字之间的字数（如果第一个字就被选中，那么偏移量为零）。如果 anchorNode 是一个元素，那么返回的就是在选区第一个节点之前的同级节点总数。(这些节点都是 anchorNode 的子节点) |
| focusNode    |返回该选区终点所在的节点。|
| focusOffset  |返回一个数字，其表示的是选区终点在 focusOffset 中的位置偏移量。如果 focusNode 是文字节点，那么选区末尾未被选中的第一个字，在该文字节点中是第几个字（从0开始计），就返回它。如果 focusNode 是一个元素，那么返回的就是在选区末尾之后第一个节点之前的同级节点总数。|
| isCollapsed  |返回一个布尔值，用于判断选区的起始点和终点是否在同一个位置。|
| rangeCount   |返回该选区所包含的连续范围的数量。|
| type         |返回该选区节点类型。|
| baseNode     |等价于 anchorNode|
| baseOffset   |等价于 anchorOffset|
| extentNode   |等价于 focusNode|

### 方法

| 方法               | 说明  |
| ------------------|-------|
| getRangeAt        |返回选区开始的节点|
| addRange          |一个区域（Range）对象将被加入选区。|
| removeRange       |从选区中移除一个区域。|
| removeAllRanges   |将所有的区域都从选区中移除。|
| empty             |等价于 removeAllRanges （IE9以下使用）|
| collapse          |将当前的选区折叠为一个点。|
| setPosition       |       |
| collapseToStart   |将当前的选区折叠到起始点。|
| collapseToEnd     |将当前的选区折叠到最末尾的一个点。|
| extend            |将选区的焦点移动到一个特定的位置。|
| selectAllChildren |将某一指定节点的子节点框入选区。|
| deleteFromDocument|从页面中删除选区中的内容。|
| containsNode      |判断某一个node是否为当前选区的一部分。|
| modify            |修改当前的选区。|
| toString          |返回当前选区的纯文本内容。|