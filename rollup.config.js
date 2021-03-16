import builtins from "builtin-modules";
import renameExtensions from "@betit/rollup-plugin-rename-extensions";
import pkg from "./package.json";

export default {
    input: ["./src/module.js"],
    external: Object.keys(pkg.dependencies || {}).concat(builtins),
    output: {
        dir: "./",
        format: "cjs",
        sourcemap: true,
    },
    plugins: [
        renameExtensions({
            include: ["**/*.js"],
            mappings: {
                ".js": ".cjs",
            },
        }),
    ],
};
