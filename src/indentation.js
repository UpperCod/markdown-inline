const getValueIndentation = (str) =>
  str.split("").reduce((total, str) => (total += str.charCodeAt()), 0);

/**
 *
 * @param {*} lines
 * @returns {[number,string][]}
 */
export function indentation(lines) {
  const deep = [];
  return lines
    .split(/\n/)
    .map((line) => {
      const test = line.match(/^(\s+)(.+)/);
      if (test) {
        const [, space, line] = test;
        const indentation = getValueIndentation(space);
        if (!deep.includes(indentation)) {
          deep.push(indentation);
        }
        return [indentation, line];
      }
      return [0, line];
    })
    .map(([indentation, line]) => [deep.indexOf(indentation), line]);
}
