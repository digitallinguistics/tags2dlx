/**
 * Default options for the tags2dlx function
 * @type {Object}
 */
const defaultOptions = {
  metadata: {},
};

/**
 * Default (empty) DLx Text object
 * @type {Object}
 */
const defaultText = {
  title:      {},
  utterances: [],
};

/**
 * Convert a tagged text to DLx JSON format
 * @param  {String} [text=``]                The tagged text to convert
 * @param  {Object} [options=defaultOptions] An options object
 * @param  {Object} [options.metadata={}]    An object containing additional metadata to add to the text, such as title, etc.
 * @return {Object}                          Returns a DLx Text object
 */
function tags2dlx(text = ``, { metadata } = defaultOptions) {

  const json = { ...defaultText, ...Object(metadata) };

  json.utterances = [];

  return json;

}

export default tags2dlx;
