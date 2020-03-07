# getDerivedStateFromProps

官方的说法是`getDerivedStateFromProps` 会在调用 `render` 方法之前调用，并且在初始挂载及后续更新时都会被调用。它应返回一个对象来更新 `state`，如果返回 `null` 则不更新任何内容。

`getDerivedStateFromProps` 的作用就是为了让 `props` 能更新到组件内部 `state` 中。

使用场景：

1. 无条件的根据 `props` 来更新内部 `state`，也就是只要有传入 `props` 值， 就更新 `state`
2. 只有 `props` 值和 `state` 值不同时才更新 `state` 值。

接下来看几个例子。

我们有一个计数器按钮，他会传入一个`number`来更新子组件数据。

```typescript jsx
import React, {Component, useState} from "react"

interface Iprops {
    number: number;
}

class Child extends Component<Iprops> {
    state = {
        count: 0
    }

    static getDerivedStateFromProps(props: Iprops) {
        return {
            count: props.number
        }
    }

    render() {
        return (
            <div>Child: count is {this.state.count}</div>
        )
    }
}

const GetDerivedStateFromProps = () => {
    const [count, setCount] = useState(1);

    return (
        <div>
            <button onClick={() => setCount(count + 1)}>Counter</button>
            <Child number={count}/>
        </div>
    )
}

export default GetDerivedStateFromProps;
```

上面的例子就是第一种使用场景，但是无条件从 `prop` 中更新 `state`，我们完全没必要使用这个生命周期，直接对 `prop` 值进行操作就好了，无需用 `state` 值类保存。

接下来我们还想再子组件也声明一个`setCount`方法，修改子组件内部的`count`值。

```typescript jsx
setCount = ()=> {
    this.setState({
        count:this.state.count + 1
    })
}
```

我们传入了一个默认值给`Child`组件。但是这个组件有一个 `bug`，如果我们传入一个值后，再使用组件内部的`setCount`方法，我们会发现`count`不会变化，一直是传入的`number`值。这是使用生命周期常见的一个问题。

::: tip 注意
在 `React 16.4`之后 的版本中 `setState` 和 `forceUpdate` 也会触发这个生命周期，所以内部 `state` 变化后，又执行 `getDerivedStateFromProps` 方法，并把 `state` 值更新为传入的 `prop`。
:::

接下来我们来修复一下这个问题。

```typescript jsx
import React, {Component, useState} from "react"

interface Iprops {
    number: number
}

interface Istate {
    count: number,
    prevCount: number
}

class Child extends Component<Iprops> {
    state = {
        count: 0,
        prevCount: -1
    }

    static getDerivedStateFromProps(props: Iprops, state: Istate) {
        if (props.number !== state.prevCount) {
            return {
                count: props.number,
                prevCount: props.number
            }
        }
        return null
    }

    setCount = () => {
        this.setState({
            count: this.state.count + 1
        })
    }

    render() {
        return (
            <div>
                <div>
                    <button onClick={this.setCount}>Child Counter</button>
                </div>
                Child: count is {this.state.count}
            </div>
        )
    }
}

const GetDerivedStateFromProps = () => {
    const [count, setCount] = useState(0);

    return (
        <div>
            <button onClick={() => setCount(count + 1)}>Counter</button>
            <Child number={count}/>
        </div>
    )
}

export default GetDerivedStateFromProps;
```

通过保存一个之前 `prop` 值，我们就可以在只有 `prop` 变化时才去修改 `state`。这样就解决上述的问题。

::: tip 注意
- 在使用此生命周期时，要注意把传入的 `prop` 值和之前传入的 `prop` 进行比较。
- 因为这个生命周期是静态方法，同时要保持它是纯函数，不要产生副作用。
:::

我们应该尽可能使用替代方案来解决问题。
官方也给出了一些[getDerivedStateFromProps](https://zh-hans.reactjs.org/docs/react-component.html#static-getderivedstatefromprops)建议。
