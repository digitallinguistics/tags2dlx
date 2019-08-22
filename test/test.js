describe(`tags2dlx`, function() {

  let convert;

  beforeAll(async function() {
    ({ default: convert } = await import(`../src/index.js`));
  });

  // TODO: remove this test
  it(`is a function`, function() {
    expect(typeof convert).toBe(`function`);
  });

});
