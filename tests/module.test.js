import test from "ava";
import { example } from "../src/module.js";

test("simple replace", async (t) => {
    t.is(example("a"), "a");
});
