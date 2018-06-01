#!/usr/bin/env node
import path from "path";
import fs from "fs";
import program from "commander";
import flatten from "lodash/flatten";
import parse from "./parse";

program
  .version("0.0.1")
  .usage("[options] <file ...>")
  .option(
    "-t, --template",
    "Use javascript template exporting default function without .js"
  )
  .option("-o, --out [out]", "Convert all input files into a single file")
  .parse(process.argv);

main();

function main() {
  const csvFiles = program.args
    .map(relativePath => path.resolve(relativePath))
    .map(absolutePath => fs.readFileSync(absolutePath, { encoding: "utf8" }));
  console.log(`${csvFiles.length} files are loaded!`);
  const persons = flatten(csvFiles.map(parse));
  console.log(`${persons.length} people were converted!`);

  const userTemplate = program.template && path.resolve(program.template);
  const templateFunc = require(userTemplate || "./template").default;

  const pages = persons.map(templateFunc);
  const json = JSON.stringify({ pages });
  fs.writeFileSync(path.resolve(program.out || "./export.json"), json);
}
