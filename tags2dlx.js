#!/usr/bin/env node --experimental-modules --no-warnings

import createSpinner from 'ora';
import fs            from 'fs';
import meta          from './package.json';
import path          from 'path';
import program       from 'commander';
import recurse       from 'recursive-readdir';
import tags2dlx      from './src/index.js';

const {
  readFile,
  stat: getStats,
  writeFile,
} = fs.promises;

program
.version(meta.version, `-v, --version`, `output the current version`)
.arguments(`<path>`)
.option(`-n, --tagName <tagName>`, `name of the property to store the tag in`)
.option(`-p, --punctuation <punctuation>`, `punctuation to ignore`, `,`)
.option(`-s, --tagSeparator <separator>`, `character(s) delimiting the word token from its tag`, `_`)
.option(`-u, --utteranceSeparators <separators>`, `string containing all the characters to treat as utterance separators`, `.!?"'`);

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

  const files = await recurse(pathArg, [ignore]);

  return Promise.all(files.map(convertFile));

}

function ignore(filepath, stats) {
  if (stats.isFile() && path.extname(filepath) !== `.txt`) return true;
}

void async function main() {

  const spinner = createSpinner(`Converting texts`).start();

  try {
    await convertFiles();
  } catch (e) {
    return spinner.fail(e.message);
  }

  spinner.succeed(`Texts converted`);

}();
