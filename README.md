# 📝 textlint-rule-footnote-dearu-desumasu

[![Test](https://github.com/erutobusiness/textlint-rule-footnote-dearu-desumasu/actions/workflows/test.yml/badge.svg)](https://github.com/erutobusiness/textlint-rule-footnote-dearu-desumasu/actions/workflows/test.yml)
[![npm version](https://badge.fury.io/js/textlint-rule-footnote-dearu-desumasu.svg)](https://badge.fury.io/js/textlint-rule-footnote-dearu-desumasu)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A textlint rule that checks strict Dearu/Desumasu style specifically within footnotes.

## Features

- 🛡️ **Footnote Specific**: Checks writing style *only* inside footnotes.
- 🇯🇵 **Japanese Style Support**: Detects mixed "Dearu" and "Desumasu" styles.
- ⚙️ **Configurable**: Choose your preferred style (`"prefer": "ですます"` or `"である"`).

## Practical Use Case

In Japanese technical writing, it is common to use **"Dearu" style (da/de-aru)** for the main text. However, footnotes are sometimes written in **"Desumasu" style (desu/masu)** depending on the style guide.

This rule specifically targets footnotes to ensure consistency within them, independent of the main text's style.

## Installation

```bash
npm install textlint-rule-footnote-dearu-desumasu
```

## Usage

Via `.textlintrc`(Recommended):

```json
{
    "rules": {
        "footnote-dearu-desumasu": {
             // "ですます" (default) or "である"
            "prefer": "ですます"
        }
    }
}
```

## Development

Contributions are welcome!

1. Clone the repository:
   ```bash
   git clone https://github.com/erutobusiness/textlint-rule-footnote-dearu-desumasu.git
   cd textlint-rule-footnote-dearu-desumasu
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run tests & lint:
   ```bash
   npm test
   npm run check
   ```

## License

MIT © [erutobusiness](https://github.com/erutobusiness)
