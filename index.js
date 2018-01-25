#!/usr/bin/env node
//Imports
const program = require('commander');
const fs = require('fs');
const readline = require('readline');
//Config
const filepath = './todos.md';

//Create todo file
if(!fs.existsSync(filepath)) { 
  console.log('creating ' + filepath);
  fs.closeSync(fs.openSync(filepath, 'w'));
}

let taskList = fs.readFileSync(filepath, { encoding: 'utf8' });

//Functions
const prettyPrintList = () => {
  console.log('Tasks:');
  taskList.split('\n').forEach((line, index) => {
    if(index != 0) {
      console.log(index + ") " + line);
    }
  })
}

const appendToList = (task) => {
  fs.appendFileSync(filepath, "\n" + task);
  console.log("added: " + task);
}

const deleteFromList = (taskNumber) => {
  let taskArr = taskList.split('\n');
  const deleted = taskArr.splice(taskNumber - 1, 1);
  fs.writeFileSync(filepath, taskArr.join('\n'));
  console.log('deleted: ' + deleted);
}

//Commands
program
  .command('add <task>')
  .description('add a task')
  .action(appendToList);

program
  .command('delete <taskNumber>')
  .description('delete a task')
  .action(deleteFromList);

program
  .command('list')
  .description('list tasks')
  .action(prettyPrintList)

//Execution
program.parse(process.argv);


