const path = require('path')

const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin")

module.exports = {
    entry: './oop/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: "bundle.js",
        assetModuleFilename: 'img/[name][ext]'

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
                test: /\.(jpe?g|png|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.svg/,
                type: 'asset/inline',
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
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
