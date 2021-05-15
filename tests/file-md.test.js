import test from "ava";
import { readFile } from "fs/promises";
import { setup } from "../src/markdown.js";

test("parseFile", async (t) => {
    const tag = (type, props, ...children) => ({
        type,
        props,
        children: children.flat(),
    });

    const md = setup(tag);

    const content = await readFile(
        new URL("./example.md", import.meta.url),
        "utf-8"
    );

    t.deepEqual(md.call(null, [content]), [
        { type: "h1", props: null, children: ["every"] },
        {
            type: "pre",
            props: { type: "jsx", "data-type": "jsx" },
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
