import path from "path";
import fs from "fs";
import flatten from "lodash/flatten";
import parse from "./parse";

export default function main({ args = [], template, debug = false }) {
  const csvFiles = args
    .map(relativePath => path.resolve(relativePath))
    .map(absolutePath => fs.readFileSync(absolutePath, { encoding: "utf8" }))
    .map(text => text.trim());
  if (debug) {
    console.log(`📄 ${csvFiles.length}  files are loaded!`);
  }
  const persons = flatten(csvFiles.map(parse));
  if (debug) {
    console.log(`👦 ${persons.length} people were converted!`);
  }

  const userTemplate = template && path.resolve(template);
  const templateFunc = require(userTemplate || "./template").default;
  if (userTemplate && debug) {
    console.log(`📑 ${userTemplate} is loaded!`);
  }

  const pages = persons.map(templateFunc);
  return { pages };
}
