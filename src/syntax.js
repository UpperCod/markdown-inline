import { getIndentation } from "@uppercod/indentation";

/**
 * @type {Tag}
 */
let TAG;
/**
 * @type {Args}
 */
let ARGS;
/**
 * @type {Elements}
 */
let ELEMENTS;
/**
 * Capture simple generic syntax that does not depend on indentation
 * @type {[RegExp,(...args:any[])=>any][]}
 */
const generic = [
    [
        /!\[([^\]]+)\]\(([^)]+)\)/g,
        (title, src) => TAG(ELEMENTS.image, { src, title }),
    ],
    [
        /\[([^\]]+)\]\(([^)]+)\)/g,
        (title, href) => TAG("a", { href }, syntax(title)),
    ],
    [
        /\*\*([^*]+)\*\*/g,
        (content) => TAG(ELEMENTS.bold, null, syntax(content)),
    ],
    [/_([^_]+)_/g, (content) => TAG(ELEMENTS.italic, null, syntax(content))],
    [
        ///~([^~]+)~/g,
        /(?:~([^~]+)~|`([^`]+)`)/g,
        (opt1, opt2) => TAG(ELEMENTS.inlineCode, null, syntax(opt1 || opt2)),
    ],
];
/**
 * Create an argument marker to be associated with the template
 * @param {number} index
 * @returns
 */
export const createArg = (index) => `<${index}>`;
/**
 * Analyst the syntax that does not depend on indentation
 * @param {string} line
 * @returns
 */
export function syntax(line) {
    return generic
        .reduce(
            (value, [search, create]) =>
                value.replace(search, (ignore, ...args) => {
                    return createArg(ARGS.push(create(...args)) - 1);
                }),
            line
        )

        .split(/(<\d+>)/)
        .map((part) => {
            const test = part.match(/^<(\d+)>/);
            if (test) {
                const [, index] = test;
                return ARGS[index];
            }
            return part;
        })
        .filter((value) => value);
}
/**
 *
 * @param {string} content
 * @param {Tag} tag
 * @param {Args} args
 * @param {Elements} elements
 * @returns
 */
export function parse(content, tag, args, elements) {
    /**
     * The variables TAG, ARGS and ELEMENTS pass
     * to the scope of the module, to be used by
     * the functions without the need to resiv the
     * argument and ensuring the impermeability
     * between setup between instances.
     */
    TAG = tag;
    ARGS = args;
    ELEMENTS = elements;
    const lines = getIndentation(content);
    const { length } = lines;
    const children = [];
    /**@type {[string,any[]]} */
    let currentList;
    /**@type {any[]} */
    let currentTable;
    for (let i = 0; i < length; i++) {
        /**
         * @todo the deep variable already captures the indentation, use to generate deep lists.
         */
        const [deep, line] = lines[i];
        const testCode = line.match(/^(~~~|```|---)(.*)/);
        if (testCode) {
            const [, block, type] = testCode;
            let content = [];
            while (++i) {
                if (lines[i] && lines[i][1] !== block) {
                    content.push(
                        ELEMENTS.tab.repeat(
                            lines[i][0] > -1 ? lines[i][0] : 0
                        ) + lines[i][1]
                    );
                } else break;
            }
            children.push(
                TAG(
                    ELEMENTS.code,
                    { type, "data-type": type, meta: block === "---" },
                    TAG(ELEMENTS.nestedCode, null, content.join("\n"))
                )
            );
            continue;
        }
        const testList = line.match(/^(\d+\.|-|\+)\s*(.+)/);
        if (testList) {
            const [, type, content] = testList;
            if (!currentList) {
                currentList = [ELEMENTS.list[/\d+\./.test(type) ? 0 : 1], []];
            }
            currentList[1].push(TAG(ELEMENTS.listItem, null, syntax(content)));
            continue;
        }
        const testTable = line.match(/^\|(.+)/);
        if (testTable) {
            const [, content] = testTable;
            if (!currentTable) {
                currentTable = [];
            }
            const td = content.split(/\|/);

            if (!/^-+$/.test(td[0].trim())) {
                currentTable.push(
                    TAG(
                        ELEMENTS.tableRow,
                        null,
                        td
                            .slice(0, td.length - 1)
                            .map((content) =>
                                TAG(
                                    ELEMENTS.tableCol,
                                    null,
                                    syntax(content.trim())
                                )
                            )
                    )
                );
            }
            continue;
        }

        if (currentList) {
            children.push(TAG(currentList[0], null, currentList[1]));
            currentList = null;
        }
        if (currentTable) {
            children.push(TAG(ELEMENTS.table, null, currentTable));
            currentTable = null;
        }

        const testTitle = line.match(/^([\#]+)\s*(.+)/);
        if (testTitle) {
            const [, lvl, content] = testTitle;
            children.push(
                tag(
                    ELEMENTS.title.replace("*", lvl.length + ""),
                    null,
                    syntax(content)
                )
            );
            continue;
        }
        const testQuote = line.match(/^>\s*(.+)/);
        if (testQuote) {
            const [, content] = testQuote;

            children.push(TAG(ELEMENTS.quote, null, syntax(content)));
            continue;
        }

        if (!line) continue;
        children.push(TAG(ELEMENTS.text, null, syntax(line)));
    }
    return children;
}

/**
 * @callback Tag
 * @param {string} type
 * @param {any} [props]
 * @param {any} [children]
 */

/**
 * @typedef {any[]} Args
 */

/**
 * @typedef {Object}  Elements
 * @property {string} title
 * @property {string} text
 * @property {string} link
 * @property {string} inlineCode
 * @property {string} code
 * @property {string} nestedCode
 * @property {string} quote
 * @property {string} table
 * @property {string} tableRow
 * @property {string} tableCol
 * @property {string} bold
 * @property {string} italic
 * @property {string} image
 * @property {[string,string]} list
 * @property {string} listItem
 * @property {string} tab
 */
