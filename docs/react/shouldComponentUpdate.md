# shouldComponentUpdate

`shouldComponentUpdate`顾名思义组件应该被更新吗？即根据 `shouldComponentUpdate()` 的返回值，判断 `React` 组件的输出是否受当前 `state` 或 `props` 更改的影响。默认行为是 `state` 每次发生变化组件都会重新渲染。

在什么情况下我们会使用`shouldComponentUpdate`生命周期函数，接下来我们来看几个例子。

还是用我们的计数器组件为例：

```typescript jsx
import React, {Component, useState} from "react"

interface Iprops {
    number: number
}

interface Istate {
    name: string
}

class Child extends Component<Iprops> {
    state = {
        name:"hello"
    }

    onClick = ()=> {
        this.setState({
            name:"hello"
        })
    }
    render() {
        console.log("Child render")
        return (
            <div>
                <button onClick={this.onClick}>click</button>
                <p>{this.state.name}</p>
                <p>Child: count is {this.props.number}</p>
            </div>
        )
    }
}

const ShouldComponentUpdate = () => {
    const [count, setCount] = useState(0);
    const [tile,setTitle] = useState("计数器");
    return (
        <div>
            <p>{tile}</p>
            <button onClick={() => setCount(count + 1)}>Counter</button>
            <button onClick={() => setTitle("改变计数器标题")}>Change Title</button>
            <Child number={count}/>
        </div>
    )
}

export default ShouldComponentUpdate;
```

这个组件和之前稍有不同，父组件多了一个修改标题的方法，子组件也新增了一个点击事件。

- 当我们点击修改标题按钮，会触发子组件渲染，虽然子组件并没有使用该数据。
- 当我们点击子组件中的按钮，会触发组件渲染，虽然数据没有发生变化。

::: tip 注意
但这正是`react`的核心概念，数据是向下流动的，不管是父组件或是子组件都无法知道某个组件是有状态的还是无状态的，并且它们也并不关心它是函数组件还是 `class` 组件。
:::

于是这里 `react` 生命周期中的 `shouldComponentUpdate` 函数就派上用场了。我们修改一下代码：

```typescript jsx
shouldComponentUpdate(nextProps: Readonly<Iprops>, nextState: Readonly<Istate>, nextContext: any): boolean {
        return nextProps.number !== this.props.number;
}
```

修改完后，我们就会发现点击修改标题子组件没有渲染了，只有点击计数器按钮并且计数器发生变化才更新子组件。

在实际开发中往往我们会有很多值，这么多值如果我们手动控制不仅会很麻烦，也会产生意想不到的bug。我们应该考虑使用内置的 `PureComponent` 组件，而不是手动编写 `shouldComponentUpdate()`。

我们用`PureComponent`修改一下代码：

```typescript jsx
import React, {PureComponent, useState} from "react"

interface Iprops {
    number: number
}

interface Istate {
    name: string
}

class Child extends PureComponent<Iprops> {
    state = {
        name: "hello"
    }

    onClick = () => {
        this.setState({
            name: "hello"
        })
    }

    render() {
        console.log("Child render")
        return (
            <div>
                <button onClick={this.onClick}>click</button>
                <p>{this.state.name}</p>
                <p>Child: count is {this.props.number}</p>
            </div>
        )
    }
}

const ShouldComponentUpdate = () => {
    const [count, setCount] = useState(0);
    const [tile, setTitle] = useState("计数器");
    return (
        <div>
            <p>{tile}</p>
            <button onClick={() => setCount(count + 1)}>Counter</button>
            <button onClick={() => setTitle("改变计数器标题")}>Change Title</button>
            <Child number={count}/>
        </div>
    )
}

export default ShouldComponentUpdate;
```

这样就解决了我们之前遇到的问题。官方也对[shouldComponentUpdate](https://zh-hans.reactjs.org/docs/react-component.html#shouldcomponentupdate)做了详细的说明。
