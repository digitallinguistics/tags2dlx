const path         = require(`path`);
const { readFile } = require(`fs`).promises;

describe(`tags2dlx`, function() {

  let convert;
  let text;

  beforeAll(async function() {
    ({ default: convert } = await import(`../src/index.js`));
    text = await readFile(path.join(__dirname, `./test.txt`), `utf8`);
  });

  it(`returns a valid DLx Text object`, function() {

    const output = convert(text);

    expect(typeof output.title).toBe(`object`);
    expect(Array.isArray(output.utterances)).toBe(true);

  });

});
