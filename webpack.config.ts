import path from "path";
import { Configuration as WebpackConfiguration, HotModuleReplacementPlugin } from "webpack";
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';
import HtmlWebpackPlugin from "html-webpack-plugin";
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ESLintPlugin from "eslint-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import {readFileSync} from "fs";
import dotEnvWebpack from 'dotenv-webpack'
import webpack from 'webpack';
import NodePolyfillPlugin from 'node-polyfill-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin';
// import {WebpackManifestPlugin} from 'webpack-manifest-plugin';
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ReactRefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import TerserPlugin from 'terser-webpack-plugin';
import os from "os";
import { EsbuildPlugin } from "esbuild-loader";
import * as process from "process";

const PROD = process.env.NODE_ENV === 'production';
const DEV = process.env.NODE_ENV === 'development';
const DEBUG = process.env.DEBUG;
const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development';

interface Configuration extends WebpackConfiguration {
    devServer?: WebpackDevServerConfiguration;
}

const scriptsLoader = {
    test: /\.(ts|js)x?$/i,
    loader: 'esbuild-loader',
    options: {
        target: 'es2015'
    }
};

const imagesLoader = {
    test: /\.(png|jpe?g|gif|svg|eot|ttf|otf|woff|woff2|avif)$/i,
    // More information here https://webpack.js.org/guides/asset-modules/
    type: "asset",
};

const stylesLoader = {
    test: /\.(sa|sc|c)ss$/i,
    use: [
        DEV ? "style-loader" : MiniCssExtractPlugin.loader,
        {
            loader: "css-loader",
            options: {
                importLoaders: 1,
                modules: true
            }
        },
        "sass-loader",
    ],
}

const devToolOptions = {
    debugProd: 'source-map',
    prod: undefined,
    dev: 'eval'
}

function getDevTool() {
    if (DEV) return devToolOptions.dev
    if (PROD && DEBUG) return devToolOptions.debugProd
    return false;
}


export default (env: Record<string, string>) => {
    const envKeys = Object.keys(env).reduce((prev, next) => {
        // @ts-ignore
        prev[`process.env.${next}`] = JSON.stringify(env[next]);
        return prev;
    }, {});

    const config: Configuration = {
        mode:  mode,
        entry: {
            app: "./src/index.tsx",
            // 'service-worker': "./src/serviceWorker.ts"
        },
        output: {
            path: path.resolve(__dirname, "build"),
            filename: (pathData: any) => {
                return (pathData.chunk.name === 'service-worker') ? '[name].js' : '[name].[contenthash].js';
            },
            assetModuleFilename: 'images/[name][ext]',
            publicPath: "",
        },
        module: {
            rules: [
                scriptsLoader,
                imagesLoader,
                stylesLoader,
            ],
        },
        resolve: {
            extensions: [".tsx", ".ts", ".js"],
            alias: {
                'Components': path.resolve(__dirname, './src/Components/'),
                'Thunks': path.resolve(__dirname, './src/thunks/'),
                'Services': path.resolve(__dirname, './src/services/'),
                'Features': path.resolve(__dirname, './src/features/'),
                'Constants': path.resolve(__dirname, './src/constants'),
            },
        },
        optimization: DEV ? {
            runtimeChunk: 'single'
        } : {
            minimize: true,
            minimizer: [
                new TerserPlugin({
                    minify: TerserPlugin.esbuildMinify,
                    parallel: Math.min(3, os.cpus().length - 1),
                    extractComments: false,
                    terserOptions: {}
                }),
                new EsbuildPlugin({
                    target: 'es6',
                    css: true
                })
            ],
        },
        plugins: [
            new CleanWebpackPlugin(),
            new ForkTsCheckerWebpackPlugin({
                async: false
            }),
            new ESLintPlugin({
                extensions: ["js", "jsx", "ts", "tsx"],
                threads: 2,
                emitWarning: false
            }),
            new webpack.DefinePlugin(envKeys),
            new dotEnvWebpack({
                allowEmptyValues: true
            }),
            new NodePolyfillPlugin(),
            new HtmlWebpackPlugin({
                template: "src/index.html",
                favicon: "public/images/favicon-196x196.ico",
                manifest: "public/manifest.json",
                environment: process.env.NODE_ENV
            }),
            new MiniCssExtractPlugin(),
            // new WebpackManifestPlugin({
            //     fileName: 'webpackManifest.json',
            //     writeToFileEmit: true
            // })
            ...(DEV ? [new HotModuleReplacementPlugin()] : []),
            ...(DEV ? [new ReactRefreshPlugin()] : []),
            ...(PROD ? [new CopyWebpackPlugin({
                patterns: [{
                    from: 'public/images',
                    to: 'images'
                }, {
                    from: 'public/manifest.json',
                }]
            }),] : [])
        ],
        devtool: getDevTool(),
        devServer: DEV ? {
            historyApiFallback: true,
            port: 4000,
            host: '0.0.0.0',
            allowedHosts: "all",
            open: false,
            // proxy: {
            //     '/api': {
            //         target: API_URL,
            //         secure: false,
            //         changeOrigin: true,
            //         logLevel: 'debug',
            //         pathRewrite: {
            //             '^/api': ''
            //         }
            //     }
            // },
            server: {
                // type: 'https',
                // options: {
                //     minVersion: 'TLSv1.1',
                //     // key: readFileSync(path.join(__dirname, 'certs', 'mydomain3.key')),
                //     // cert: readFileSync(path.join(__dirname, 'certs', 'mydomain3.crt')),
                // },
            },
            static: [
                {
                    directory: path.resolve(__dirname, 'public'),
                },
            ],
            devMiddleware: {
                writeToDisk: true
            }
        } : {},
    };

    return config
}
