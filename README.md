# tags2dlx

[![GitHub issues](https://img.shields.io/github/issues/digitallinguistics/tags2dlx)][issues]
[![GitHub release (latest SemVer)](https://img.shields.io/github/v/release/digitallinguistics/tags2dlx?sort=semver)][releases]
[![Travis (.com) branch](https://img.shields.io/travis/com/digitallinguistics/tags2dlx/master)][Travis]
[![GitHub](https://img.shields.io/github/license/digitallinguistics/tags2dlx)][license]
[![GitHub stars](https://img.shields.io/github/stars/digitallinguistics/tags2dlx?style=social)][GitHub]

_Have a question or need to report an issue? [Open an issue here.][issues]_

## Introduction

This is a JavaScript library for Node.js that converts a tagged linguistic text to [DLx JSON format][Daffodil]. It is useful for anybody working with a monolingual (single-language) corpus whose words have been tagged for some feature.

For example, here is an example sentence from the [Open American National Corpus][OANC]:

```text
All_DT hotels_NNS accept_VBP major_JJ credit_NN cards_NNS ._.
```

Each word in this sentence has been tagged for part of speech by adding an underscore at the end of the word, followed by an abbreviation indicating the part of speech. For example, the word _hotels_ has been tagged as a plural noun using the abbreviation `NNS`. Punctuation is typically tagged as well (`._.` in the above example).

Using this library, you can convert tagged texts like this to JSON format, like so:

```json
{
  "utterances": [
    {
      "words": [
        {
          "transcription": "All",
          "tags": {
            "pos": "DT"
          }
        },
        {
          "transcription": "hotels",
          "tags": {
            "pos": "NNS"
          }
        },
        …
      ]
    },
  ]
}
```

The format of the resulting JSON can be adjusted by passing options to the `tags2dlx` converter. See the [Options section](#options) below.

## Installation & Basic Usage

Installation:

```cmd
npm install @digitallinguistics/tags2dlx
```

Usage in Node.js (latest stable release):

```js
import convert from '@digitallinguistics/tags2dlx';

const text = `This_DEM is_V a_DET sentence_N ._.`;

// The output is a plain-old JavaScript object (POJO), formatted as a DLx Text object
const output = convert(text, options);

// Do something with the output, like write it to text.json
```

## Options

The `tags2dlx` function accepts an options hash as the second argument. The options hash accepts the following options:

Option              | Default | Description
------------------- | ------- | -----------
metadata            | `{}`    | An object containing additional metadata to add to the Text, such as title, etc. This metadata should adhere to the [DLx Text format][Text].
punctuation         | `,`     | Punctuation to ignore. Tagged items consisting of one of these characters will be removed from the output.
tagName             | `null`  | The name of the property to store the tag in
tagSeparator        | `_`     | The character(s) delimiting the word token from its tag
utteranceSeparators | `.!?"'` | A string containing all the characters to treat as utterance separators

## Contributing

Want to contribute to this project? Feel free to [open an issue][issues] or create a pull request. If your pull request does anything other than fix a bug, please [open an issue][issues] to discuss the change first.

Tests are run using [Jasmine][Jasmine]. They can be run from the command line with `npm test`.

<hr>

This library is written and maintained by [Daniel W. Hieber][me] ([@dwhieb][profile]) and made available under an [MIT license][license].

[Daffodil]: https://format.digitallinguistics.io
[GitHub]:   https://github.com/digitallinguistics/tags2dlx
[issues]:   https://github.com/digitallinguistics/tags2dlx/issues
[Jasmine]:  https://jasmine.github.io/
[license]:  https://github.com/digitallinguistics/tags2dlx/blob/master/LICENSE.md
[me]:       https://danielhieber.com
[OANC]:     http://www.anc.org/
[profile]:  https://github.com/dwhieb
[releases]: https://github.com/digitallinguistics/tags2dlx/releases
[Text]:     https://format.digitallinguistics.io/schemas/Text
[Travis]:   https://travis-ci.com/digitallinguistics/tags2dlx/branches
