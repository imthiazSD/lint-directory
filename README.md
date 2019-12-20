# lint-project
### Overview
A simple CLI tool built on NodeJS that helps you to keep an eye on your project structure.
Decscribe your project structure in a rules.json file at the root level of your project and
lint-project watches your project directory to warn you when the structure does not comply 
with the rules described.



### Future update
1. Easy installation by just globally installing the package via NPM. No cloning, no linking
2. Construct more complex rules to suit your project needs

## Installation

```angular2
git clone https://gitlab.com/imthiazdev/awell-candidate-evaluation lint-project

cd lint-project

git checkout linting_for_files_and_directories-Muhammed-Imthiaz

npm install 

npm link
```

## Usage

```angular2

cd my_project_root

lint-project
```

lint-project CLI tool expects a rules.json file at the Project root level.

### rules.json format

```angular2

{
  "allowed_sub_directories" : ["lenses", "methods", "type"],
  "exclude_directories" : ["node_modules", ".git"]

}

```


### Usecase 1
Inside a Project, Child directories should always contain 3 directories

```angular2

Root\ 
    Child1\
          1\
          2\
          3\
    child2\
          1\
          2\

WARNING : Directory 'Root/Child2' does not mactch the required count of directories
```
### Usecase 2
Inside a Project, Child directories should always contain 3 directories named 1,2,3

```angular2

Root\
    Child1\
          1\
          2\
          5\
    child2\
          1\
          2\
          3\
WARNING : Directory 'Root/Child1/5' is not a valid directory name 
```

## Output

The tool logs to the console with handles WARNING, ERROR or INFO followed by the message 
describing the rule that is being broken.