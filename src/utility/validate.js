const path = require('path');
const fs = require('fs')
const ora = require('ora');
const content = require('./content')


const lintProject = (dir,rules) => {

    // lint the project root folder
    rootDirChildren = listDir(dir, rules)
    rootDirChildren.forEach(child => {

        const spinner = ora("Checking directory : "+ child+ " ...").start();
        spinner.color = 'yellow' 
        
        // loop through root project directories and log the info
        console.log(validateDirectoryStruture(child, rules))
        console.log("---------\n")
            
    });    
   
}


const validateDirectoryStruture = (dir,rules) => {
    
    // Check if linting rules file exists, run linting and return string containing logging info
    if(rules){
        const {allowed_sub_directories} = rules
        const dir_list = listDir(dir, rules)
        const max_count_of_sub_dirs = allowed_sub_directories.length
        dir_path = path.join(__dirname, dir)

        if (dir_list.length > max_count_of_sub_dirs){
            
            return content.error_count_exceeds(dir_path, max_count_of_sub_dirs)
        
        }else if (dir_list.length < max_count_of_sub_dirs){

            return content.error_low_count(dir_path, max_count_of_sub_dirs)
        
        }else{

            for(let i=0;i<dir_list.length;i++){
                let child_dirname = dir_list[i]
                let dir_path = path.join(__dirname, child_dirname)
                if (!allowed_sub_directories.includes(child_dirname)) return content.error_invalid_name(dir_path)
                
            }
            
            return content.INFO_OK
            
        }
        }else{
            return content.ERROR_LINT_FILE
        }
    
    
}


const isRulesFileValid = (rules) => {

    try{

        if(typeof rules != 'object'){
            return false
        }else if(rules === null){
            return false
        } 
        else if(rules.allowed_sub_directories === undefined || !Array.isArray(rules.allowed_sub_directories)){
            return false
        }else if(rules.exclude_directories === undefined || !Array.isArray(rules.exclude_directories)){
            return false
        }else{
            return true
        }

    }catch(err){
        console.log('err occured', err)
        return false
    }

}

const listDir = (dir, rules) => {

   // list only folders of a directory and exclude the directories mention in the linting rules.json
   if(rules){
        const excludeDirs = [ ...new Set(rules.exclude_directories) ]
        let dirList =  fs.readdirSync(dir, { withFileTypes: true })
                        .filter(dirent => dirent.isDirectory() && !excludeDirs.includes(dirent.name))
                        .map(dirent => dirent.name)
        return dirList
 
   }else{
       return []
   }
}


module.exports = {
    lintProject,
    isRulesFileValid
}