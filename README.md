# textlint-rule-footnote-dearu-desumasu

A textlint rule that checks strict Dearu/Desumasu style specifically within footnotes.

## Install

```
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
