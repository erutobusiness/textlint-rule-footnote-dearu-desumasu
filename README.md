# textlint-rule-footnote-dearu-desumasu

[![npm](https://img.shields.io/npm/v/textlint-rule-footnote-dearu-desumasu.svg)](https://www.npmjs.com/package/textlint-rule-footnote-dearu-desumasu)
[![test](https://github.com/erutobusiness/textlint-rule-footnote-dearu-desumasu/actions/workflows/test.yml/badge.svg)](https://github.com/erutobusiness/textlint-rule-footnote-dearu-desumasu/actions/workflows/test.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

textlint rule to check mixed writing style (Dearu/Desumasu) in footnotes.

This rule enforces a consistent writing style ("Desumasu" or "Dearu") specifically within footnotes, independently of the main text.

## Installation

```bash
npm install textlint-rule-footnote-dearu-desumasu
```

## Usage

Add this rule to your `.textlintrc` (or `.textlintrc.json`).

```json
{
    "rules": {
        "footnote-dearu-desumasu": true
    }
}
```

## Configuration

| Option | Type | Default | Description |
|---|---|---|---|
| `prefer` | `"ですます"` \| `"である"` | `"ですます"` | Preferred style in footnotes. |

### Example

To prefer "Dearu" style in footnotes:

```json
{
    "rules": {
        "footnote-dearu-desumasu": {
            "prefer": "である"
        }
    }
}
```

## Recommended Combination

It is highly recommended to use this rule together with [textlint-filter-rule-footnote](https://github.com/erutobusiness/textlint-filter-rule-footnote).

This combination allows you to:
1.  Ignore global rules (like main text style) inside footnotes using the filter rule.
2.  Enforce strict "Dearu/Desumasu" style inside footnotes using this rule.

**Example `.textlintrc`:**

```json
{
    "filters": {
        "footnote": true
    },
    "rules": {
        "preset-ja-technical-writing": true,
        "footnote-dearu-desumasu": {
            "prefer": "ですます"
        }
    }
}
```

## Development

Contributions are welcome!

1.  Clone the repository:
    ```bash
    git clone https://github.com/erutobusiness/textlint-rule-footnote-dearu-desumasu.git
    cd textlint-rule-footnote-dearu-desumasu
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Run tests & lint:
    ```bash
    npm test
    npm run lint
    npm run format
    ```

## License

MIT © [erutobusiness](https://github.com/erutobusiness)
