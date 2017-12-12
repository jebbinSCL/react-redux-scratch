# react-redux-scratch
This is a startup project to act as a seed for a react redux project. 
Alternatively, the commits can be used to learn all the steps required for setting up the project. 

## Prerequisites: 

If you don't have them already, please install the following before the steps below. 

1. Git (2.15.0 was used, but any version should be fine) : https://git-scm.com/download/ 
    - Check version with `git --version`
2. Node and NPM (Node 9.1.0 and NPM 5.5.1 was used, similar or higher should be fine) : https://nodejs.org/en/ 
    - Check versions with `node --version` and `npm --version`

## Dependencies Installed in steps

1. Babel

## Setup

The following setup was done using git bash on windows. Each step below should hopefully have a corresponding commit. If you are following the steps manually, make sure to change the project name and other related information

### 1. Initialise the project folder

```
mkdir react-redux-scratch
cd react-redux-scratch
```

Initialise the git repository, and add a .gitignore and readme.md file. In bash you can create an empty file with `> filename`

```
git init
> .gitignore
echo -e "# react-redux-scratch\nInitial Commit" > README.md
git add . 
git commit -m "Initial Commit"
```

### 2. Initialise basic npm package.json

This is done by simply adding a basic package.json file. Either add one manually with the folloing content: 

```
{
  "name": "react-redux-scratch",
  "version": "1.0.0",
  "description": "Add Custom Description",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "git+https://your/repo/url"
  },
  "keywords": [],
  "author": "",
  "license": "",
}

```

Or generate a basic one using the command below and cut out anything you don't care about (I took out a couple of extra things from mine). Note that if you have added more to your readme file such as an initial description, the npm command tries to use that in the pacakge description. 

```
npm init -y
```

Update the git ignore file to ingore the node_modules folder created by npm

Add the following to the .gitignore: 
```
node_modules/
```

Commit the changes

```
git add . 
git commit -m "Initialise basic npm package.json"
```
