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