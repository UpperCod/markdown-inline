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

| Col 1 | Col 2 |
| ----- | ----- |
| c-1-1 | c-1-2 |

Image : ![image](./demo.jpg)
Link : [link](#link)
        `,
        [
            tag("h1", null, ["title"]),
            tag(
                "ol",
                null,
                tag("li", null, "Item 1"),
                tag("li", null, "Item 2")
            ),
            tag("p", null, tag("strong", null, "Bold")),
            tag(
                "table",
                null,
                tag(
                    "tr",
                    null,
                    tag("td", null, "Col 1"),
                    tag("td", null, "Col 2")
                ),
                tag(
                    "tr",
                    null,
                    tag("td", null, "c-1-1"),
                    tag("td", null, "c-1-2")
                )
            ),
            tag(
                "p",
                null,
                "Image : ",
                tag("img", { src: "./demo.jpg", title: "image" })
            ),
            tag("p", null, "Link : ", tag("a", { href: "#link" }, "link")),
            tag("p", null, " "),
        ]
    );
});
