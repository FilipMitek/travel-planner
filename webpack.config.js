const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports ={
    entry: './src/index.ts',
    devtool: 'inline-source-map',
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    externals: nodeExternals(),
    mode: "development",
    output: {
        path: path.resolve( "lib"),
        filename: 'index.js',
        devtoolModuleFilenameTemplate: '[absolute-resource-path]'
    },
    target: "node",
    module: {
        rules: [
            {
                use: 'ts-loader',
                test: /\.ts?$/
            },
            {
                test: /\.node$/,
                use: 'node-loader'
            }
        ]
    },
    node: {
        __dirname: false
    }
};
