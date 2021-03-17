import test from "ava";
import { setup } from "../src/markdown.js";

test("simple replace", async (t) => {
    const tag = (type, props, ...children) => ({
        type,
        props,
        children: children.flat(),
    });

    const md = setup(tag);

    t.deepEqual(
        md`
            ~~~jsx
            const tag = <host />;
            ~~~
        `,

        [
            tag(
                "pre",
                { type: "jsx", "data-type": "jsx" },
                tag("code", null, "const tag = <host />;")
            ),
            tag("p", null, " "),
        ]
    );
});
