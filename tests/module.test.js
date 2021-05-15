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
# title

1. Item 1
2. Item 2

**Bold**

~code~

\`code\`

| Col 1 | Col 2 |
| ----- | ----- |
| c-1-1 | c-1-2 |

Image : ![image](./demo.jpg)
Link : [link](#link)
        `,
        [
            { type: "h1", props: null, children: ["title"] },
            {
                type: "ol",
                props: null,
                children: [
                    { type: "li", props: null, children: ["Item 1"] },
                    { type: "li", props: null, children: ["Item 2"] },
                ],
            },
            {
                type: "p",
                props: null,
                children: [{ type: "strong", props: null, children: ["Bold"] }],
            },
            {
                type: "p",
                props: null,
                children: [{ type: "code", props: null, children: ["code"] }],
            },
            {
                type: "p",
                props: null,
                children: [{ type: "code", props: null, children: ["code"] }],
            },
            {
                type: "table",
                props: null,
                children: [
                    {
                        type: "tr",
                        props: null,
                        children: [
                            { type: "td", props: null, children: ["Col 1"] },
                            { type: "td", props: null, children: ["Col 2"] },
                        ],
                    },
                    {
                        type: "tr",
                        props: null,
                        children: [
                            { type: "td", props: null, children: ["c-1-1"] },
                            { type: "td", props: null, children: ["c-1-2"] },
                        ],
                    },
                ],
            },
            {
                type: "p",
                props: null,
                children: [
                    "Image : ",
                    {
                        type: "img",
                        props: { src: "./demo.jpg", title: "image" },
                        children: [],
                    },
                ],
            },
            {
                type: "p",
                props: null,
                children: [
                    "Link : ",
                    { type: "a", props: { href: "#link" }, children: ["link"] },
                ],
            },
        ]
    );
});
