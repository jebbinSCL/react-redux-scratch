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

### Setup the Webpack dev server
Documentation: https://webpack.js.org/configuration/dev-server/

Lets setup the dev server so that we can view the application in the browser during development. First install the dev server

```
npm install --save-dev webpack-dev-server
```

We will also modify the scripts section of the `package.json` file to simplify running the dev server. Add the following to the scripts section: 
```
"dev": "webpack-dev-server --config ./config/webpack.config.js",
```

Now we can run 
```
npm run dev
```
To start the dev server. At the moment this will simply server our project files at `http://localhost:8080`.

Now we will add a basic main html page. Create a `index.html` file in the `src` folder with the following: 

```
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">

    <title>React Redux Scratch</title>
  </head>
  <body>
    <h1>React Redux Scratch</h1>
  </body>
</html>
```

We will also need to update the webpack configuration to use the src folder as the content base:

Add `SRC` to the path constants
```
SRC: getAbsolutePath('src'), 
```

and add a `devServer` configuration section with the following: 
```
devServer: {
  contentBase: paths.SRC,
},
```

Now running `npm run dev` will serve our html, but we aren't doing anything with Javascript. We'll need to inject out bundled JavaScript into the `index.html` with the [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin) . Install it with:

```
npm install --save-dev html-webpack-plugin
```

Now update the configuration to use it, by importing it and replacing the devServer configuration with configuration for the plugin. The new full config looks like this:

```
const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');

//Resolve the root directory of the application to create absolute paths
const appDirectory = fs.realpathSync(process.cwd());
const getAbsolutePath = relativePath => path.resolve(appDirectory, relativePath);

// Paths constants
const paths = {
    DIST: getAbsolutePath('dist'),
    SRC: getAbsolutePath('src'), 
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
    plugins: [
        new HtmlWebpackPlugin({
          template: path.join(paths.SRC, 'index.html'),
        }),
    ],
};
```

Now if we run `npm run dev`, our javascript will be injected to the `index.html` page, which is being used as a template. 

Finally, Commit the changes

```
git add . 
git commit -m "Setup webpack dev server to serve basic index.html and javascript"
```

### Configure Babel
At the moment we have done the most basic configuration for [Babel](https://babeljs.io/). We have installed all of the dependencies, and we have created the basic config file: `.babelrc`. Now we need to configure it to work with webpack. Add all of the following to the module.exports: 
```
// Tell webpack to use babel-loader for .js and .jsx files
module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
        ],
      },
    ],
},
// Enable importing JS files wihtout specifying their extension
// So we can write: import MyComponent from './my-component';
// Instead of: import MyComponent from './my-component.jsx';
resolve: {
    extensions: ['.js', '.jsx'],
},
```

Nothing will change yet, but if you add any modern javascript features it will be transpiled. 

Commit the changes

```
git add . 
git commit -m "Configure Babel for ES5+ features"
```

### Install React
We can finally install [React](https://reactjs.org/). 

First install it as a regular dependency: 

```
npm install --save react react-dom
```

And modify the `index.html` to add a div which will will render our React app to: 

```
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">

    <title>React Redux Scratch</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

Also, replace the javascript in main.js with a basic react Component. 

```
import React from 'react';
import { render } from 'react-dom';

function Hello() {
    return (
        <div>
          Hello from react
        </div>
    );
}

render(<Hello />, document.getElementById('root'));
```

Now if you run `npm run dev` we have a basic react application. 

Commit the changes

```
git add . 
git commit -m "Complete setup of basic react application"
```

### Moving towards a basic React redux project
Now we have a basic react project, lets work towards a basic counter React Redux application. We will create a simple two page application with a header. It will have a home and about page. The home page will display a count that can be incremented, and the about page will have a simple about message. The header will have navigation links for the two pages, and will make it clear which page is active. We will also allow navigation between the pages using react router.

#### Install Redux and React-Redux and create core components. 

First, lets simply install `redux` and `react-redux`. 

```
npm install --save redux react-redux
```

Now lets start creating out containers and components. First we'll do the home page, with a header and counter. First we will add an empty initial state for the app. 

Create a `reducers` folder under source, and add a file `index.js` to it. Add the following as our empty intial state and reducer. 

```
const rootAppReducer = (state = {}, action) => state;

export default rootAppReducer
```

Now we will add a `Root` container as the main container of the app. We will replace the Hello component from above with this in `main.js`. You can do this first. Change `main.js` to: 

```
import React from 'react';
import { render } from 'react-dom';
import Root from './containers/Root'

render(<Root />, document.getElementById('root'));
```

Now create a containers folder and a `Root.js` within it, with the following within it. 

```
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootAppReducer from '../reducers';
import Header from './Header';
import Home from './Home';

const store = createStore(rootAppReducer) 

const Root = () => (
    <Provider store={store}>
        <div>
            <Header />
            <Home />
        </div>
    </Provider>
)

export default Root
```

Now we need to create the header and home containers. 
Create the file `containers/Header.js` with the following: 

```
import React from 'react';

const Header = () => (
    <p>
        <span>Home</span>
        <span>About</span>
    </p>
)

export default Header
```

and `containers/Home.js` with the following: 

```
import React from 'react';
import Counter from '../components/Counter';

const Home = () => (
    <div>
        <Counter />
    </div>
)

export default Home
```

Finally create the Counter container.
Create and fill the file `components/Counter.js` with the following:

```
import React from 'react';

const Counter = () => (
    <p>
        Current count: 0
        <button> + </button> 
        <button> - </button>
    </p>
)

export default Counter
```

Now we have a basic outline for the Home page of the app (Can be viewed with `npm run dev`). Now we'll commit this. 

```
git add . 
git commit -m "Install Redux and React Redux. Add basic outline for Counter app"
```

### References
- Setting up Webpack, Babel and React from scratch, revisited:  https://stanko.github.io/webpack-babel-react-revisited/
- Build Your Own Starter: https://www.andrewhfarmer.com/build-your-own-starter/#0-intro
- Create React App: https://github.com/facebookincubator/create-react-app
- Setting up a React project from scratch: https://medium.com/netscape/setting-up-a-react-project-from-scratch-d62f38ab6d97




