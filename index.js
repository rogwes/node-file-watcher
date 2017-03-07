#!/usr/bin/env node

const Notify = require('fs.notify');
const program = require('commander');
const exec = require('child_process').exec;

var command;

var onFileEvent = function(file, event, path) {

  console.log(`Executing command: ${command}`)

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
    }
  });
}

program
  .arguments('<file> <command>')
  .action(function(file, commandString) {

    var notifications = new Notify([file]);

    command = commandString;

    notifications.on('change', onFileEvent);

    console.log('Started listening to file changes on:');
    console.log(file);
  })
  .parse(process.argv);
