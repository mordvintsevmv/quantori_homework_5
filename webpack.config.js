const path = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin")

module.exports = {
    entry: './oop/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: "bundle.js"
    },
    mode: "development",
    devServer: {
        static: path.resolve(__dirname, "./build"),
        compress: true,
        port: 8080,
        open: true,
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: 'file-loader'
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            title: 'Webpack Config',
            template: './public/index.html',
        }),
        new CopyWebpackPlugin({
                patterns: [
                    {
                        from: 'public',
                        globOptions: {
                            ignore: ['**/index.html'],
                        },
                    },
                ],
            }
        ),
    ]
}
