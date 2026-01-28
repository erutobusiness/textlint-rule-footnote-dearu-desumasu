const { analyze, isDearu, isDesumasu } = require("analyze-desumasu-dearu");

/**
 * 注釈(Footnote)専用の文体チェッカー
 * textlint-rule-no-mix-dearu-desumasu を参考に、Definition ノードのみを対象とする
 */

const PreferTypes = {
  DESUMASU: "ですます",
  DEARU: "である",
};

const defaultOptions = {
  // 注釈での優先文体（デフォルトは「ですます」）
  prefer: "ですます",
  // 文末以外でも厳しくチェックするか
  strict: false,
};

/**
 * 注釈内の文体をチェックするクラス
 */
class FootnoteMixedChecker {
  constructor(context, options) {
    this.context = context;
    this.options = options;
    this.dearuCount = 0;
    this.desumasuCount = 0;
    this.dearuHitList = [];
    this.desumasuHitList = [];
    this._queue = Promise.resolve();
  }

  check(node, text) {
    this._queue = this._queue.then(() => {
      const analyzeOptions = {
        ignoreConjunction: !this.options.strict,
      };
      return analyze(text, analyzeOptions).then((results) => {
        const retDearu = results.filter(isDearu);
        const retDesumasu = results.filter(isDesumasu);
        const dearuCount = this.dearuCount + retDearu.length;
        const desumasuCount = this.desumasuCount + retDesumasu.length;
        if (this.dearuCount !== dearuCount) {
          this.dearuCount = dearuCount;
          this.dearuHitList.push({
            node,
            matches: retDearu,
          });
        }
        if (this.desumasuCount !== desumasuCount) {
          this.desumasuCount = desumasuCount;
          this.desumasuHitList.push({
            node,
            matches: retDesumasu,
          });
        }
      });
    });
  }

  checkout() {
    return this._queue.then(() => {
      if (!this.isOver()) {
        return;
      }
      const RuleError = this.context.RuleError;
      const report = this.context.report;
      const overType = this.getOverType();
      const overHitList = this.overHitList(overType);

      for (const { node, matches } of overHitList) {
        for (const token of matches) {
          const ruleError = new RuleError(this.outputMessage(token), {
            index: token.index,
          });
          report(node, ruleError);
        }
      }
    });
  }

  isOver() {
    if (this.options.prefer === PreferTypes.DESUMASU) {
      return this.dearuCount !== 0;
    }
    if (this.options.prefer === PreferTypes.DEARU) {
      return this.desumasuCount !== 0;
    }
    return this.dearuCount !== 0 && this.desumasuCount !== 0;
  }

  getOverType() {
    if (this.options.prefer === PreferTypes.DEARU) {
      return "である";
    }
    if (this.options.prefer === PreferTypes.DESUMASU) {
      return "ですます";
    }
    if (this.dearuCount > this.desumasuCount) {
      return "である";
    }
    return "ですます";
  }

  overHitList(overType) {
    if (overType === "である") {
      return this.desumasuHitList;
    }
    if (overType === "ですます") {
      return this.dearuHitList;
    }
    return [];
  }

  outputMessage(token) {
    const overType = this.getOverType();
    let topMessage = "";
    if (overType === "である") {
      topMessage = `注釈: "である"調 でなければなりません
=> "である"調 であるべき箇所に、次の "ですます"調 の箇所があります`;
    } else if (overType === "ですます") {
      topMessage = `注釈: "ですます"調 でなければなりません
=> "ですます"調 であるべき箇所に、次の "である"調 の箇所があります`;
    }
    return `${topMessage}: "${token.value}"
Total:
である  : ${this.dearuCount}
ですます: ${this.desumasuCount}
`;
  }
}

/**
 * メインのルール関数
 */
module.exports = function footnoteDesumasuDearu(
  context,
  options = defaultOptions,
) {
  const { Syntax, getSource } = context;

  const prefer = options.prefer || defaultOptions.prefer;
  const isStrict =
    options.strict !== undefined ? options.strict : defaultOptions.strict;

  const footnoteChecker = new FootnoteMixedChecker(context, {
    prefer,
    strict: isStrict,
  });

  return {
    // 注釈定義 (e.g., [^footnote]: 内容)
    [Syntax.FootnoteDefinition](node) {
      const text = getSource(node);
      footnoteChecker.check(node, text);
    },
    [`${Syntax.Document}:exit`]() {
      return footnoteChecker.checkout();
    },
  };
};
