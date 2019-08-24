const path         = require(`path`);
const { readFile } = require(`fs`).promises;

describe(`tags2dlx`, function() {

  let convert;
  let text;

  beforeAll(async function() {
    ({ default: convert } = await import(`../src/index.js`));
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

        const output = convert(text, options);

        expect(output.utterances.length).toBe(0);

      });

    });

  });

  describe(`result`, function() {

    it(`is a valid DLx Text object`, function() {

      const output = convert(text);

      expect(typeof output.title).toBe(`object`);
      expect(Array.isArray(output.utterances)).toBe(true);

    });

    fit(`tokenizes utterances correctly`, function() {

      const input = `This_DEM is_COP a_DET sentence_N ._. Is_COP this_DEM a_DET question_N ?_?`;

      const { utterances } = convert(input);

      expect(utterances.length).toBe(2);

    });

  });

});
