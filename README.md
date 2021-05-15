# @uppercod/markdown-inline

This package allows the use of markdown thanks to the use of [Template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals), the parser `@uppercod/markdown-inline` transforms the template into tree format created from a createElement type function, example `pragma(tag: string, props: any, ...children: any []):any`, being this friendly with the virtualDOM.

## Install

```
npm install @uppercod/markdown-inline
```

## Usage

```jsx
import { createElement } from "react";
import { setup } from "@uppercod/markdonn";

const md = setup(createElement);

md`
# example

bla bla bla...

**bold**

_italic_

[link](#link)

![image](./my.jpg)

Custom ${(<MyComponent />)}

`;
```

## Todo

-   [ ] **Nested lists**: The parser generates a tag index that defines the depth of the tag. I have not applied that argument to create nested lists.
-   [ ] **Line division**.
-   [ ] **Task lists**.

```jsx
import { c, useHost } from "atomico";

const counter = () => {
    const { current } = useHost();
    return (
        <host>
            <button onclick={() => current.count--}>decrement</button>
            <strong>{current.count}</strong>
            <button onclick={() => current.count++}>increment</button>
        </host>
    );
};

counter.props = {
    count: { type: Number, value: 0 },
};
```

```jsx
import { c } from "atomico";

const decrement = (state) => state - 1;
const increment = (state) => state + 1;

function useCounter(prop) {
    const [count, setCount] = useProp(prop);
    return [count, () => setCount(increment), () => setCount(decrement)];
}

function counter() {
    const [count, increment, decrement] = useCounter("count");
    return (
        <host>
            <button onclick={increment}>decrement</button>
            <strong>{count}</strong>
            <button onclick={decrement}>increment</button>
        </host>
    );
}

counter.props = {
    count: { type: Number, value: 0 },
};
```
