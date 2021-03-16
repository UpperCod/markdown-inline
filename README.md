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
