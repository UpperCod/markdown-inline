import { parse, createArg } from "./syntax.js";

/**
 * @type {import("./syntax").Elements}
 */
const DEFAULT_ELEMENTS = {
    link: "a",
    title: "h*",
    text: "p",
    inlineCode: "code",
    code: "pre",
    nestedCode: "code",
    quote: "blockquote",
    table: "table",
    tableRow: "tr",
    tableCol: "td",
    bold: "strong",
    italic: "i",
    image: "img",
    list: ["ol", "ul"],
    listItem: "li",
};
/**
 * @param {(type:string,props:any,...children:any)=>any} tag
 * @returns {Inline & InlineStatic}
 */
export const setup = (tag, elements) => {
    const md = (parts, ...args) =>
        parse(
            parts.reduce(
                (value, part, index) =>
                    value + (part + (args[index] ? createArg(index) : "")),
                ""
            ),
            tag,
            args,
            md.elements
        );
    /**
     * allows to replace the elements from the function that generates the tree
     * @type {import("./syntax").Elements}
     **/
    md.elements = { ...DEFAULT_ELEMENTS, ...elements };

    return md;
};

/**
 * @typedef {(part:TemplateStringsArray,...args:any[])=>any} Inline
 */

/**
 * @typedef {Object} InlineStatic
 * @property {import("./syntax").Elements} elements
 */
