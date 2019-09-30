const path         = require(`path`);
const { readFile } = require(`fs`).promises;
const convert      = require(`../src/index`);

describe(`tags2dlx`, function() {

  let text;

  const tinyText = `
    This_DEM is_COP a_DET sentence_N ._.
    Is_COP this_DEM a_DET question_N ?_?
  `;

  beforeAll(async function() {
    text = await readFile(path.join(__dirname, `./test.txt`), `utf8`);
  });

  describe(`options`, function() {

    describe(`metadata`, function() {

      it(`copies metadata to the Text`, function() {

        const hello = `world`;
        const title = `How the world began`;

        const options = {
          metadata: {
            hello,
            title,
          },
        };

        const output = convert(text, options);

        expect(output.hello).toBe(hello);
        expect(output.title).toBe(title);

      });

      it(`does not overwrite the utterances property`, function() {

        const options = {
          metadata: {
            utterances: [{}, {}, {}],
          },
        };

        const output = convert(tinyText, options);

        expect(output.utterances.length).toBe(2);

      });

    });

    it(`punctuation`, function() {

      const input       = `word_N -_- word_N`;
      const punctuation = `-`;

      const { utterances: [{ words }] } = convert(input, { punctuation });

      expect(words.length).toBe(2);

    });

    it(`tag name`, function() {

      const tagName = `pos`;

      const { utterances: [{ words: [{ tags }] }] } = convert(text, { tagName });

      expect(typeof tags.pos).toBe(`string`);

    });

    it(`tag separator`, function() {

      const input        = `home^N`;
      const tagSeparator = `^`;

      const { utterances: [{ words: [{ transcription }] }] } = convert(input, { tagSeparator });

      expect(transcription).toBe(`home`);

    });

  });

  describe(`result`, function() {

    it(`is a valid DLx Text object`, function() {

      const output = convert(text);

      expect(typeof output.title).toBe(`object`);
      expect(Array.isArray(output.utterances)).toBe(true);

    });

    it(`tokenizes text into utterances`, function() {

      const { utterances } = convert(tinyText);

      expect(utterances.length).toBe(2);

    });

    it(`tokenizes utterances into words`, function() {

      const { utterances: [{ words }] } = convert(tinyText);

      expect(words.length).toBe(4); // eslint-disable-line no-magic-numbers

    });

    it(`applies tags to words`, function() {

      const input = `home_N`;

      const { utterances: [{ words: [{ tags }] }] } = convert(input);

      expect(tags.N).toBe(true);

    });

  });

});
