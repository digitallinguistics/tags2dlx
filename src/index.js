// CONSTANTS

/**
 * Default (empty) DLx Text object
 * @type {Object}
 */
const defaultText = {
  title:      {},
  utterances: [],
};

/**
 * Regular expression for finding one or more white spaces
 * @type {RegExp}
 */
const whiteSpaceRegExp = /\s+/gu;


// METHODS

/**
 * Creates a function to parse a tagged word into the word token and its tag.
 * @param  {String}   tagSeparator The tag separator to split on (sits between the word token and its tag)
 * @return {Function}              Returns the parseTaggedWord function
 */
function createWordParser(tagSeparator) {
  /**
   * Parses a tagged word into the word token and its tag
   * @param  {String} taggedWord The tagged word to parse
   * @return {Object}            Returns an object with "tag" and "token" properties
   */
  return taggedWord => {
    const [token, tag] = taggedWord.split(tagSeparator);
    return { tag, token };
  };
}

// MAIN

/**
 * Convert a tagged text to DLx JSON format
 * @param  {String} [text=``]                             The tagged text to convert
 * @param  {Object} [options]                             An options object
 * @param  {Object} [options.metadata={}]                 An object containing additional metadata to add to the Text, such as title, etc.
 * @param  {String} [options.punctuation=`,`]             Punctuation to ignore. Tagged items consisting of one of these characters will be removed from the output.
 * @param  {String} [options.tagSeparator=`_`]            The character(s) delimiting the word token from its tag
 * @param  {String} [options.utteranceSeparators=`.!?"'`] A string containing all the characters to treat as utterance separators.
 * @return {Object}                                       Returns a DLx Text object
 */
export default function tags2dlx(
  text = ``,
  {
    metadata            = {},
    punctuation         = `,`,
    tagSeparator        = `_`,
    utteranceSeparators = `.!?"'`,
  } = {},
) {

  punctuation         = [...punctuation];         // eslint-disable-line no-param-reassign
  utteranceSeparators = [...utteranceSeparators]; // eslint-disable-line no-param-reassign

  const parseTaggedWord = createWordParser(tagSeparator);

  const taggedWords = text.split(whiteSpaceRegExp);
  const parsedWords = taggedWords.map(parseTaggedWord);

  const rawUtterances = parsedWords.reduce((arr, word) => {

    if (punctuation.includes(word.token)) return arr;

    if (utteranceSeparators.includes(word.token)) {

      arr.push({ words: [] });

    } else {

      const lastUtterance = arr[arr.length - 1];
      lastUtterance.words.push(word);

    }

    return arr;

  }, [{ words: [] }]);

  const nonEmptyUtterances = rawUtterances.filter(u => u.words.length);

  const json = { ...defaultText, ...Object(metadata) };

  json.utterances = nonEmptyUtterances;

  return json;

}
