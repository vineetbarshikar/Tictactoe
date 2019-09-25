const path = require('path');

module.exports = {
    entry: './js/app.js',
    mode: 'development',
    output: {
        path: path.resolve(__dirname, './public'),
        filename: 'app.bundle.js'
    },
    devServer: {
        publicPath: './public',
        contentBase: path.resolve(__dirname, './'),
        watchContentBase: true,
        open: true,
        inline: true,
        hot: true,
        openPage: './views/index.html'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: [path.resolve(__dirname, './js')],
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.(sc|c)ss$/,
                use: ['style-loader','css-loader']
            }
        ]
    }
};