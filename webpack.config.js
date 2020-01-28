const dotenv =  require('dotenv');
const result = dotenv.config();
if (result.error) {
    throw result.error
}

const path = require("path");
const webpack = require("webpack");
// Inside of webpack.config.js:
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const react_prefix = "assets";
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP==='true';
const devPort = process.env.APP_DEVELOPMENT_PORT||3000;
const developmentServerPath = `${process.env.APP_DEVELOPMENT_URL}:${devPort}/`;

module.exports = env =>{
    const isEnvDevelopment = env.NODE_ENV === 'development';
    const isEnvProduction = env.NODE_ENV === 'production';

    const appDir = env.NODE_DIR?`${env.NODE_DIR}`:'';
    const publicPath =  isEnvProduction?`${process.env.APP_URL}/`:developmentServerPath;
    const entryPath = path.join(__dirname, `/../`);
    const inject_file = path.join(entryPath, `public/delivery-frontend/index1.html`);
    return {
        entry: `./${appDir}/index.js`,
        node: {
        //    child_process: 'empty',
            fs: 'empty',
       //    crypto: 'empty',
            net: 'empty',
            tls: 'empty',
            dns: 'empty',
        },
        mode: isEnvProduction ? 'production' : isEnvDevelopment && 'development',
        // Stop compilation early in production
        bail: isEnvProduction,
        devtool: isEnvProduction
            ? shouldUseSourceMap===true
                ? 'source-map'
                : false
            : isEnvDevelopment && 'cheap-module-source-map',
        // cache: true,
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                   // exclude: /(node_modules|bower_components|@babel(?:\/|\\{1,2})runtime)/,
                    exclude: /(node_modules|bower_components)/,
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/env"],
                    }
                },
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {hmr: isEnvDevelopment},
                        },
                        'css-loader',
                        'sass-loader',
                    ],
                },
                {
                    test: /\.(png|jpe?g|gif|svg)$/i,
                    use: [
                        {
                            loader: 'file-loader',
                        },
                    ],
                },
            ]
        },
        resolve: {extensions: ["*", ".js", ".jsx"]},
        output: {
            path: path.join(entryPath, `public`),
            publicPath:`${publicPath}`,
            filename: "assets/js/app.js",
            chunkFilename: 'assets/js/[name].[chunkhash:8].chunk.js'
        },
        devServer: {
            https: false,
            disableHostCheck: true,
            contentBase: path.join(__dirname, "public/"),
            headers: {'Access-Control-Allow-Origin': '*'},
            port: devPort,
            hotOnly: true
        },
        optimization:isEnvDevelopment===true?undefined:{
            minimize: isEnvProduction,
            namedChunks:true,
            namedModules:true,
            runtimeChunk: 'single',
            splitChunks: {
                chunks: 'all',
                minSize: 30000,
                maxSize: 200000,
            //    minChunks: 1,
           //     maxAsyncRequests: 5,
                maxInitialRequests: Infinity,
                automaticNameDelimiter: '~',
                name: true,
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name(module) {
                            // получает имя, то есть node_modules/packageName/not/this/part.js
                            // или node_modules/packageName
                            const n = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/);

                            const packageName = (Array.isArray(n)&&n.length>1)?n[1]:'vendor';

                            // имена npm-пакетов можно, не опасаясь проблем, использовать
                            // в URL, но некоторые серверы не любят символы наподобие @
                            return `npm.${packageName.replace('@', '')}`;
                        },
                        // cacheGroupKey here is `commons` as the key of the cacheGroup
                       /* name(module, chunks, cacheGroupKey) {
                            const moduleFileName = module.identifier().split('/').reduceRight(item => item);
                            const allChunksNames = chunks.map((item) => item.name).join('~');
                            return `${cacheGroupKey}_${allChunksNames}_${moduleFileName}`;
                        },*/
                        priority: -10,
                        enforce: true,
                        chunks: 'all'
                    },
                    default: {
                        minChunks: 2,
                        priority: -20,
                        reuseExistingChunk: true
                    }
                },
            }
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new MiniCssExtractPlugin({
                filename: isEnvDevelopment ? 'css/[name].css' : 'assets/css/[name].[contenthash].css',
                chunkFilename: isEnvDevelopment ? 'css/[id].css' : 'assets/css/[id].[contenthash].css',
            }),
            new HtmlWebpackPlugin({
                  inject: false,
                  filename: inject_file,
                  template: `tmpl.ejs`,
            }),
        ],

    };
}
