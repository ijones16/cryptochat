var path = require('path');
var node_modules_dir = path.resolve(__dirname, 'node_modules');

var config = {
    entry: path.resolve(__dirname, 'app/App.js'),
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,

            // There is not need to run the loader through
            // vendors
            exclude: [node_modules],
            loader: 'babel'
        },
        {
            test: /\.css$/,
            loader: "style-loader!css-loader"
        }]
    }
};

module.exports = config;