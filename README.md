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

### 3. Install Babel 

Here we perform the basic install and setup for Babel.

install the dependencies we care about, then create the babel config file `.babelrc`

```
npm install --save-dev babel-cli babel-core babel-loader 
npm install --save-dev babel-preset-env babel-preset-react
> .babelrc
```

In the .babelrc file, add the basic configuration:
```
{
  "presets": ["env", "react"]
}
```

Commit the changes

```
git add . 
git commit -m "Add basic Babel setup"
```

### 4. Install and setup Webpack

Install webpack 

```
npm install --save-dev webpack
```

Create a source folder `src` and add a basic `main.js` file to it:

main.js:
```
console.log('Hello world!');
```

We've have not configured webpack yet, but it is possible to manually call it to create a bundle now. We will output the bundle to the `dist/` (distribution) folder: 

```
npx webpack ./src/main.js --output-filename ./dist/main.bundle.js
```

Add the output `dist/` folder to the `.gitignore`

Now we need to create the core configuration for webpack. Create a folder `config/` and a file `webpack.config.js` within it. 
Place the following inside it:

```
const path = require('path');
const fs = require('fs');

//Resolve the root directory of the application to create absolute paths
const appDirectory = fs.realpathSync(process.cwd());
const getAbsolutePath = relativePath => path.resolve(appDirectory, relativePath);

// Paths constants
const paths = {
    DIST: getAbsolutePath('dist'),
    JS: getAbsolutePath('src'),
};

// Webpack configuration
module.exports = {
    // Context: The base directory, for resolving entry points and loaders from configuration. https://webpack.js.org/configuration/entry-context/#context
    context: paths.JS,
    // Entrypoint: https://webpack.js.org/concepts/entry-points/
    entry: path.join(paths.JS, 'main.js'),
    // Output: https://webpack.js.org/configuration/output/
    output: {
        path: paths.DIST,
        filename: 'main.bundle.js',
    },
};
```

Now we can run webpack and specify the configuration

```
npx webpack --config ./config/webpack.config.js
```

Now we can an npm build task to simplfy running the build. In the `package.json` file, modify the scripts section so that it looks like this: 
```
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "build": "webpack --config ./config/webpack.config.js"
},
```

Now we can run the build using a basic npm build task

```
npm run build
```

Commit the changes

```
git add . 
git commit -m "Add basic source folder. Add webpack, core webpack configuration and basic npm build task
"
```

### References
- Setting up Webpack, Babel and React from scratch, revisited:  https://stanko.github.io/webpack-babel-react-revisited/
- Build Your Own Starter: https://www.andrewhfarmer.com/build-your-own-starter/#0-intro
- Create React App: https://github.com/facebookincubator/create-react-app




