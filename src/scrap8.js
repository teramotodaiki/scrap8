#!/usr/bin/env node
import fs from 'fs';
import program from 'commander';
import main from './main';

program
  .version('0.0.1')
  .usage('[options] <file ...>')
  .option(
    '-t, --template',
    'Use javascript template exporting default function without .js'
  )
  .option('-o, --out [out]', 'Convert all input files into a single file')
  .option('--no-debug', 'Disable debug log')
  .parse(process.argv);

const json = JSON.stringify(
  main({
    args: program.args,
    template: program.template,
    debug: program.debug
  })
);

if (program.out) {
  fs.writeFileSync(path.resolve(program.out), json);
} else {
  process.stdout.write(json);
}
