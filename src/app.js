#!/usr/bin/env node
const chokidar = require('chokidar');
const path = require('path')
const {lintProject, isRulesFileValid} = require('./utility/validate')
const fs = require('fs')

const lint_rules_file_path = path.join(process.cwd(),'rules.json')
var rules = null

// try to get linint rules json file
try{

    if(fs.existsSync(lint_rules_file_path))  rules = require(lint_rules_file_path)

}catch(err){
    console.log('Error occured while trying to import file: ')
}

if (!isRulesFileValid(rules)){
  
  console.log('The rules.json files is not valid')

}else{
  var ignoredFiles = [ ...new Set(rules.exclude_directories) ].map(dirname =>{ return new RegExp(dirname)})
  var watcher = chokidar.watch(process.cwd(), {ignored: ignoredFiles, persistent: true,ignoreInitial: true, depth:1});

  // Watch root folder for changes
  const event_types = ['ready', 'addDir', 'unlinkDir' ]
  event_types.forEach(event_type => {
      watcher.on(event_type, ()=>{
                  const root_dir = process.cwd()
                  lintProject(root_dir, rules)
                })
  })

  
}

