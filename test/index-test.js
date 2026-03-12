const assert = require("assert");
const { TextlintKernel } = require("@textlint/kernel");
const rule = require("../index");
const markdownPlugin =
  require("@textlint/textlint-plugin-markdown").default ||
  require("@textlint/textlint-plugin-markdown");

const kernel = new TextlintKernel();

describe("textlint-rule-footnote-dearu-desumasu", () => {
  const lint = (text, options = {}) => {
    return kernel.lintText(text, {
      ext: ".md",
      plugins: [
        {
          pluginId: "markdown",
          plugin: markdownPlugin,
        },
      ],
      rules: [
        {
          ruleId: "footnote-dearu-desumasu",
          rule: rule,
          options: options,
        },
      ],
    });
  };

  context("default (prefer: ですます)", () => {
    it("should not report when footnote uses desumasu", async () => {
      const text = `本文はである調である。脚注[^1]

[^1]: 脚注はですます調です。
`;
      const result = await lint(text);
      const errors = result.messages.filter(
        (m) => m.ruleId === "footnote-dearu-desumasu",
      );
      assert.strictEqual(errors.length, 0);
    });

    it("should report when footnote uses dearu", async () => {
      const text = `本文。脚注[^1]

[^1]: 脚注なのにである調である。
`;
      const result = await lint(text);
      const errors = result.messages.filter(
        (m) => m.ruleId === "footnote-dearu-desumasu",
      );
      assert.ok(errors.length > 0, "Should detect dearu in footnote");
    });
  });

  context("prefer: である", () => {
    it("should not report when footnote uses dearu", async () => {
      const text = `本文です。脚注[^1]

[^1]: 脚注はである調である。
`;
      const result = await lint(text, { prefer: "である" });
      const errors = result.messages.filter(
        (m) => m.ruleId === "footnote-dearu-desumasu",
      );
      assert.strictEqual(errors.length, 0);
    });

    it("should report when footnote uses desumasu", async () => {
      const text = `本文です。脚注[^1]

[^1]: 脚注なのにですます調です。
`;
      const result = await lint(text, { prefer: "である" });
      const errors = result.messages.filter(
        (m) => m.ruleId === "footnote-dearu-desumasu",
      );
      assert.ok(errors.length > 0, "Should detect desumasu in footnote");
    });
  });

  context("body text should be ignored", () => {
    it("should not report dearu in body text", async () => {
      const text = `本文はである調である。

脚注なし。
`;
      const result = await lint(text);
      const errors = result.messages.filter(
        (m) => m.ruleId === "footnote-dearu-desumasu",
      );
      assert.strictEqual(errors.length, 0);
    });
  });
});
