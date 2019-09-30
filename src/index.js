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
 * A regular expression to match newlines
 * @type {RegExp}
 */
const newlineRegExp = /(?:\r?\n)+/gu;

/**
 * Regular expression for finding one or more white spaces
 * @type {RegExp}
 */
const whiteSpaceRegExp = /\s+/gu;

// METHODS

/**
 * Creates a function to parse a tagged word into the word token and its tag.
 * @param  {String}   tagSeparator The tag separator to split on (sits between the word token and its tag)
 * @param  {String}   tagName      The property name to use for the tag in the tags object
 * @return {Function}              Returns the parseTaggedWord function
 */
function createWordParser(tagSeparator, tagName) {
  /**
   * Parses a tagged word into the word token and its tag
   * @param  {String} taggedWord The tagged word to parse
   * @return {Object}            Returns an object with "tag" and "token" properties
   */
  return taggedWord => {

    const [transcription, tag] = taggedWord.split(tagSeparator);

    return {
      tags: {
        ...tagName ? { [tagName]: tag } : { [tag]: true },
      },
      transcription,
    };

  };
}

// MAIN

/**
 * Convert a tagged text to DLx JSON format
 * @param  {String} [text=``]                          The tagged text to convert
 * @param  {Object} [options]                          An options object
 * @param  {Object} [options.metadata={}]              An object containing additional metadata to add to the Text, such as title, etc.
 * @param  {String} [options.punctuation=`,.!?"'‘’“”`] Punctuation to ignore. Tagged items consisting of one of these characters will be removed from the output.
 * @param  {String} [options.tagName=null]             The name of the property to store the tag in
 * @param  {String} [options.tagSeparator=`_`]         The character(s) delimiting the word token from its tag
 * @return {Object}                                    Returns a DLx Text object
 */
function tags2dlx(
  text = ``,
  {
    metadata     = {},
    punctuation  = `,.!?"'‘’“”`,
    tagName      = null,
    tagSeparator = `_`,
  } = {},
) {

  punctuation = [...punctuation]; // eslint-disable-line no-param-reassign

  const parseTaggedWord = createWordParser(tagSeparator, tagName);

  const utterances = text
  .split(newlineRegExp)
  .map(str => str.trim())
  .filter(Boolean)
  .map(u => {

    const words = u
    .split(whiteSpaceRegExp)
    .filter(Boolean)
    .map(parseTaggedWord)
    .filter(({ transcription }) => !punctuation.includes(transcription));

    return { words };

  });

  return {
    ...defaultText,
    ...Object(metadata),
    utterances,
  };

}

module.exports = tags2dlx;
