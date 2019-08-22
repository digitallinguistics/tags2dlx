const AJV          = require(`../node_modules/@digitallinguistics/spec/test/utilities/ajv.js`);
const path         = require(`path`);
const { readFile } = require(`fs`).promises;

describe(`tags2dlx`, function() {

  let ajv;
  let convert;
  let text;
  let validate;

  beforeAll(async function() {

    ajv      = await AJV(); // eslint-disable-line new-cap
    validate = data => ajv.validate(`Text`, data);

    ({ default: convert } = await import(`../src/index.js`));

    text = await readFile(path.join(__dirname, `./test.txt`), `utf8`);

  });

  it(`returns a valid DLx Text object`, function() {

    const output  = convert(text);
    const isValid = validate(output);

    if (!isValid) fail(JSON.stringify(ajv.errors, null, 2));

  });

});
