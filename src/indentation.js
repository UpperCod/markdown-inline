/**
 * @todo  Ts does not infer that "" does not generate an error?
 * @param {string} str
 * @returns {any}
 */
const getValueIndentation = (str) =>
    str.split("").reduce((total, str) => (total += str.charCodeAt(0)), 0);

/**
 *
 * @param {string} content
 * @returns {[number,string][]}
 */
export function indentation(content) {
    /**@type {number[]} */
    const deep = [];
    return content
        .split(/\n/)
        .map((value) => {
            const test = value.match(/^(\s*)(.*)/);
            const [, space, line] = test;
            const indentation = getValueIndentation(space);
            if (!deep.includes(indentation)) deep.push(indentation);
            return [indentation, line];
        })
        .map(([indentation, line]) => [deep.indexOf(indentation), line]);
}
