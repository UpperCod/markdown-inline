import test from "ava";
import { setup } from "../src/markdown.js";

test("simple replace", async (t) => {
    const tag = (type, props, ...children) => ({
        type,
        props,
        children: children.flat(),
    });

    const md = setup(tag);

    const data = md`
~~~jsx
const tag = <host />;
~~~
    `;

    t.deepEqual(data, [
        tag(
            "pre",
            { type: "jsx", "data-type": "jsx", meta: false },
            tag("code", null, "const tag = <host />;")
        ),
    ]);
});
