#!/usr/bin/env node --experimental-modules --no-warnings

const { version } = require(`./package.json`);
const path        = require(`path`);
const program     = require(`commander`);
const ProgressBar = require(`progress`);
const recurse     = require(`recursive-readdir`);
const tags2dlx    = require(`./src/index.js`);

const {
  readFile,
  stat: getStats,
  writeFile,
} = require(`fs`).promises;

program
.version(version, `-v, --version`, `output the current version`)
.arguments(`<path>`)
.option(`-n, --tagName <tagName>`, `name of the property to store the tag in`)
.option(`-p, --punctuation <punctuation>`, `punctuation to ignore`, `,`)
.option(`-s, --tagSeparator <separator>`, `character(s) delimiting the word token from its tag`, `_`);

program.parse(process.argv);

const [pathArg] = program.args;

if (!pathArg) console.error(new Error(`Please pass a path to a file or directory as the first argument`));

const options = program.opts();
const convert = text => tags2dlx(text, options);

async function convertFile(filepath) {
  const text        = await readFile(filepath, `utf8`);
  const json        = JSON.stringify(convert(text), null, 2);
  const filename    = path.basename(filepath, `.txt`);
  const directory   = path.dirname(filepath);
  const destination = path.join(directory, `${filename}.json`);
  await writeFile(destination, json, `utf8`);
}

async function convertFiles() {

  const stats = await getStats(pathArg);

  if (stats.isFile()) return convertFile(pathArg);

  const files       = await recurse(pathArg, [ignore]);
  const progressBar = new ProgressBar(`:bar`, { total: files.length });
  const tasks       = files.map(filepath => () => convertFile(filepath));

  for (const runTask of tasks) {
    await runTask(); // eslint-disable-line no-await-in-loop
    progressBar.tick();
  }

}

function ignore(filepath, stats) {
  if (stats.isFile() && path.extname(filepath) !== `.txt`) return true;
}

convertFiles().catch(console.error);
