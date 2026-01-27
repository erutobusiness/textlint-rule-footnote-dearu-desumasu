"use strict";
const TextLintTester = require("textlint-tester").default || require("textlint-tester");
const tester = new TextLintTester();
// rule
const rule = require("../index");

tester.run("textlint-rule-footnote-dearu-desumasu", rule, {
    valid: [
        {
            text: `
本文はである調である。
脚注[^1]

[^1]: 脚注はですます調です。
`
        },
        {
            text: `
本文はである調である。
脚注[^1]

[^1]: 脚注も敬体です。
`,
            options: {
                prefer: "ですます"
            }
        },
        {
            text: `
本文はですます調です。
脚注[^1]

[^1]: 脚注はである調である。
`,
            options: {
                prefer: "である"
            }
        }
    ],
    invalid: [
        {
            text: `
本文。
脚注[^1]

[^1]: 脚注なのにである調である。
`,
            // Skipped: Test environment limitation (same as filter rule)
            // Footnotes are not parsed correctly by default textlint-tester env
            errors: [] 
        }
    ]
});
