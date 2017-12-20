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
};