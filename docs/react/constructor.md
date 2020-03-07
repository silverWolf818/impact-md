# react组件中的constructor和super

通常我们会像下面一样创建一个`react`的`class`语法组件。

```js
class MyClass extends React.component {
    constructor(props){
        super(props)
    }
}
```

创建一个`class`组件是不是必须需要`constructor`和`super`。

这时候我们先回忆一下`ES6`中的`class`关于`extends`继承的语法。

下面代码定义了一个`ColorPoint`类，该类通过extends关键字，继承了`Point`类的所有属性和方法。

```js
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y
      }
}

class ColorPoint extends Point {
    constructor(x, y) {
        super(x, y); // 调用父类Point的constructor(x, y)
    }
}
```

子类必须在`constructor`方法中调用`super`方法，否则新建实例时会报错。这是因为子类自己的`this`对象，必须先通过父类的构造函数完成塑造，得到与父类同样的实例属性和方法，然后再对其进行加工，加上子类自己的实例属性和方法。如果不调用`super`方法，子类就得不到`this`对象。

```js
class Point {
   // ...
}

class ColorPoint extends Point {
    constructor(x, y) {
      
    }
}

new ColorPoint()   // ReferenceError
```

上面代码中，`ColorPoint`继承了父类`Point`，但是它的构造函数没有调用`super`方法，导致新建实例时报错。

如果子类没有定义`constructor`方法，这个方法会被默认添加，代码如下。也就是说，不管有没有显式定义，任何一个子类都有`constructor`方法。

```js
class ColorPoint extends Point {
}

// 等同于
class ColorPoint extends Point {
  constructor(...args) {
    super(...args);
  }
}
```

回到`react`也是同理，如果我们在组件内部声明`constructor`那就要添加`super`，如果不声明`constructor`默认添加。

```jsx harmony
class MyClass1 extends React.component {
    constructor(props){
        super(props)
    }
    render(){
        return <div> { this.props.name }</div>;
    }
}

class MyClass2 extends React.component {
    render(){
        return <div> { this.props.name }</div>;
    }
}
```

上面两个组件实现相同的功能，那么声明`constructor`和不声明`constructor`有什么区别吗？

通常，在`React`中，构造函数仅用于以下两种情况：

::: tip 

1. 通过给 this.state 赋值对象来初始化内部 state。

2. 为事件处理函数绑定实例
:::

官网也对`constructor`有详细说明和使用[constructor](https://zh-hans.reactjs.org/docs/react-component.html#constructor)








