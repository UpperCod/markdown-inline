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
    tab: "    ",
};
/**
 * @param {(type:string,props:any,...children:any)=>any} tag
 * @param { Partial<import("./syntax").Elements>} [elements]
 * @returns {(part:TemplateStringsArray,...args:any[])=>any}
 */
export const setup =
    (tag, elements) =>
    (parts, ...args) =>
        parse(
            parts.reduce(
                (value, part, index) =>
                    value + (part + (args[index] ? createArg(index) : "")),
                ""
            ),
            tag,
            args,
            { ...DEFAULT_ELEMENTS, ...elements }
        );
