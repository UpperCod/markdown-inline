import test from "ava";

import { setup } from "../src/markdown.js";

const content = `
---
name: age
---

# every

my \`code\`

\`\`\`jsx
import { c } from "atomico";

function component() {
    return <host></host>;
}

export const Component = c(component);
\`\`\`

`;

test("parseFile", async (t) => {
    const tag = (type, props, ...children) => ({
        type,
        props,
        children: children.flat(),
    });

    const md = setup(tag);

    t.deepEqual(md.call(null, [content]), [
        {
            type: "pre",
            props: { type: "", "data-type": "", meta: true },
            children: [{ type: "code", props: null, children: ["name: age"] }],
        },
        { type: "h1", props: null, children: ["every"] },
        {
            type: "p",
            props: null,
            children: [
                "my ",
                { type: "code", props: null, children: ["code"] },
            ],
        },
        {
            type: "pre",
            props: { type: "jsx", "data-type": "jsx", meta: false },
            children: [
                {
                    type: "code",
                    props: null,
                    children: [
                        'import { c } from "atomico";\n\nfunction component() {\n    return <host></host>;\n}\n\nexport const Component = c(component);',
                    ],
                },
            ],
        },
    ]);
});
