const path = require('path');


module.exports = {
    entry: './src/main.js',
    output: {
        filename: 'routePortrayal.min.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'routePortrayal',
        libraryTarget: 'umd',
        globalObject: 'this'
    },
    resolve: {
        fallback: {
            "stream": false,
            "string_decoder": false,
            "buffer": false
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    mode: 'production'
};