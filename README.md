# tags2dlx

[![GitHub issues](https://img.shields.io/github/issues/digitallinguistics/tags2dlx)][issues]
[![GitHub release (latest SemVer)](https://img.shields.io/github/v/release/digitallinguistics/tags2dlx?sort=semver)][releases]
[![Travis (.com) branch](https://img.shields.io/travis/com/digitallinguistics/tags2dlx/master)][Travis]
[![GitHub](https://img.shields.io/github/license/digitallinguistics/tags2dlx)][license]
[![DOI](https://zenodo.org/badge/203644170.svg)][Zenodo]
[![GitHub stars](https://img.shields.io/github/stars/digitallinguistics/tags2dlx?style=social)][GitHub]

_Have a question or need to report an issue? [Open an issue here.][issues]_

## Introduction

This is a JavaScript library for Node.js that converts a tagged linguistic text to [DLx JSON format][Daffodil]. It is useful for anybody working with a monolingual (single-language) corpus whose words have been tagged for some feature.

For example, here is an example sentence from the [Open American National Corpus][OANC]:

```text
All_DT hotels_NNS accept_VBP major_JJ credit_NN cards_NNS ._.
I_PRP guess_VBP I_PRP was_VBD in_IN a_DT wing_NN of_IN the_DT hospital_NN ._.
```

Each word in this sentence has been tagged for part of speech by adding an underscore at the end of the word, followed by an abbreviation indicating the part of speech. For example, the word _hotels_ has been tagged as a plural noun using the abbreviation `NNS`. Punctuation is typically tagged as well (`._.` in the above example). The text is divided into utterances, with each new utterance starting on a new line.

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

Usage on the command line:

```cmd
tags2dlx corpora/English
```

## Options

The `tags2dlx` function accepts an options hash as the second argument. The options hash accepts the following options:

Option                | Flag | Default      | Description
--------------------- | ---- | ------------ | -----------
`metadata`            | N/A  | `{}`         | An object containing additional metadata to add to the Text, such as title, etc. This metadata should adhere to the [DLx Text format][Text].
`punctuation`         | `-p` | `,.!?"'‘’“”` | Punctuation to ignore. Tagged items consisting of one of these characters will be removed from the output.
`tagName`             | `-n` | `null`       | The name of the property to store the tag in
`tagSeparator`        | `-s` | `_`          | The character(s) delimiting the word token from its tag

## Command Line

The `tags2dlx` library can also be run from the command line. The script accepts one required argument, which is the path to either a file or folder to convert. If a single file is passed, that file will be converted to JSON and a new JSON file generated alongside the original. If a folder is passed, the script will recurse the directory and convert each file with a `.txt` extension to JSON, saving the new file alongside the original.

The command line version supports each of the same options as the module version, with the exception of the `metadata` option. This option is not available on the command line.

If this library is installed globally, you should be able to run it from the command line simply by typing `tags2dlx text.txt`. Otherwise you will need to run the script as a regular node script, using `node node_modules/@digitallinguistics/tags2dlx/tags2dlx.js text.txt`.

## Contributing

Want to contribute to this project? Feel free to [open an issue][issues] or create a pull request. If your pull request does anything other than fix a bug, please [open an issue][issues] to discuss the change first.

Tests are run using [Jasmine][Jasmine]. They can be run from the command line with `npm test`.

<hr>

This library is written and maintained by [Daniel W. Hieber][me] ([@dwhieb][profile]) and made available under an [MIT license][license]. Please cite this library using the following model:

```
Hieber, Daniel W. 2019. digitallinguistics/tags2dlx. https://doi.org/10.5281/zenodo.3376957
```

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
[Zenodo]:   https://zenodo.org/badge/latestdoi/203644170
