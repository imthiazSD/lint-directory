const chalk = require('chalk')

/**
text content for logging 
**/ 

// Number of sub folders exceeds the allowed number
const error_count_exceeds = (dir_path, count) => (`${chalk.bgRed('WARNING : ')} ${chalk.underline(dir_path)} Exceeds the allowed number of sub-directories ${chalk.yellowBright("("+count+")")}`)

// Number of sub folder is lower than reqiured
const error_low_count = (dir_path, count) => (`${chalk.bgRed('WARNING : ')} ${chalk.underline(dir_path)}  Does not match allowed number of sub-directories ${chalk.yellowBright("("+count+")")}`)

// Directory name doesnot match with allowed directory names
const error_invalid_name = (dir_path) => (`${chalk.bgRed('WARNING : ')} Directory${chalk.underline(dir_path)} is not a valid directory name`)

// Structure conforms to linitng rules
const INFO_OK = `${chalk.bgWhite('INFO : ')} Looks good`

// No linitng rules found at root level
const ERROR_LINT_FILE = `${chalk.bgRed('ERROR :')} No lint rules file found ` 



module.exports = {
    
    error_count_exceeds,
    error_invalid_name,
    error_low_count,
    ERROR_LINT_FILE,
    INFO_OK

}