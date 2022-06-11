const webpack = require('webpack')
const path = require('path')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')


const { copyFileSync } = require('fs')
const { dirname } = require('path')

const IS_DEVELOPMENT = process.env.NODE_ENV === 'dev'

const dirApp = path.join(__dirname, 'app')
// const dirImages = path.join(__dirname, 'images')
const dirShared = path.join(__dirname, 'shared')
const dirStyles = path.join(__dirname, 'styles')
const dirNode = 'node-modules'
// const dirVideos = path.join(__dirname, 'videos')


// conventions from npm to export objects from files to others.
module.exports = {
    entry: [
        path.join(dirApp, './app/index.js'),
        path.join(dirStyles, './styles/index.scss')
    ],

    resolve: {
        modules: [
            dirApp,
            // dirImages,
            dirShared,
            dirStyles,
            // dirVideos,
            dirNode

        ]
    },

    plugins: [
        new webpack.DefinePlugin({
            IS_DEVELOPMENT
        }),

        new CopyWebpackPlugin({
            patterns: [
                {
                    from: './shared',
                    to: ''
                }
            ]
        }),

        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].cs'
        }),
        new ImageMinimizerPlugin({
            minimizer: {
                implementation: ImageMinimizerPlugin.imageminMinify,
                options: {
                    // Lossless optimization with custom option
                    // Feel free to experiment with options for better result for you
                    plugins: [
                        ["gifsicle", { interlaced: true }],
                        ["jpegtran", { progressive: true }],
                        ["optipng", { optimizationLevel: 8 }],
                        // // Svgo configuration here https://github.com/svg/svgo#configuration
                        // [
                        //     "svgo",
                        //     {
                        //         plugins: extendDefaultPlugins([
                        //             {
                        //                 name: "removeViewBox",
                        //                 active: false,
                        //             },

                        //         ]),
                        //     },
                        // ],
                    ],
                },
            },
        }),
    ],

    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: ''
                        }
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'postcss-loader',
                    },
                    {
                        loader: 'sass-loader',
                    }
                ]
            },
            {
                test: /\.(jpe?g|png|gif|svg|woff2?|fnt|webp)$/,
                loader: 'file-loader',
                options: {
                    // outputPath:'images',
                    name(file) {
                        return '[hash].[ext]'
                    }
                }
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    {
                        loader: ImageMinimizerPlugin.loader,
                        // enforce: "pre",
                        options: {
                            minimizer: {
                                implementation: ImageMinimizerPlugin.imageminMinify,

                            },
                        },
                    }
                ]

            },
            {
                test: /\.(glsl|frag|vert)$/,
                loader: 'raw-loader',
                exclude: /node_module/
            },
            {
                test: /\.(glsl|frag|vert)$/,
                loader: 'glslify-loader',
                exclude: /node_module/
            },
        ]
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
    },
};
