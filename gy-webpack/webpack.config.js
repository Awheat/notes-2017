/* 
	webpack配置文件 
	by: wuwangcheng
	date: 2017-01-05
*/
var webpack = require('webpack');
var path 	= require('path');
var glob 	= require('glob');
var autoprefixer = require('autoprefixer');

/* 提取文本插件 */
var ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
/* html模板插件 */
var HtmlWebpackPlugin = require('html-webpack-plugin');

/* 入口文件路径 */
var entrySrc = './src/js/page/*.js';

/* 调用获取入口的方法获取入口文件 */
var entries = getEntry(entrySrc);

/* 配置插件 */
var plugins = [
	
	/* 配置插件 */
	new webpack.ProvidePlugin({
		$:'jquery',
		jQuery: 'jquery'
	}),
	/*
		对每个entry抽取css依赖,生成css文件(ExtractTextPlugin需在config的plugin及loader中一起使用)
	*/
	new ExtractTextWebpackPlugin('css/[name].css'),
	/* 提取公共模块 */
	new webpack.optimize.CommonsChunkPlugin({
            name: ['libs'],
            minChunks: Infinity
    }),
    /* 提取公共模块 */
	new webpack.optimize.CommonsChunkPlugin({
		name: 'commons',
		filename: 'js/[name].js',
		minChunks: 4
	}),
	/* 压缩css和js */
	new webpack.optimize.UglifyJsPlugin({	//压缩代码
	    compress: {
	        warnings: false
	    },
	    except: ['$super', '$', 'exports', 'require']	//排除关键字
	}),
	// 去重
    new webpack.optimize.DedupePlugin(),

	new webpack.HotModuleReplacementPlugin()
];

/* 遍历生成html模板 */
Object.keys(entries).forEach(function(item){
	plugins.push(
	    new HtmlWebpackPlugin({
	        template:'./src/views/' + item+'.html',
	        filename:'./views/' + item+'.html',
	        inject: 'body',
			hash: true,
			chunks: ['libs','commons',item]
	    })
   );
});

/* 通用第三方模块 ，最后和抽离的公共模块合并 */
entries['libs'] = ['jquery'];


/* 对外暴露接口 */
module.exports = {
	//devtool: 'eval-source-map',
	entry: entries,
	output: {
		path: path.join(__dirname,'dist'),
		/* 本地服务所监听的资源文件夹 */
		publicPath:'/dist/',
		filename:'js/[name].js',
		chunkFilename: "js/[id].chunk.js"
	},
	module:{
		/* 各种loader */
		loaders:[
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel',
				query: {
		          presets: ['es2015']
		        }
			},
			{
				test: /\.css$/,
				loader: ExtractTextWebpackPlugin.extract('style-loader', 'css-loader') 
			},
			{
                //文件加载器，处理文件静态资源
                test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader?name=./fonts/[name].[ext]'
            },
			{
				test: /\.(png|jpg|gif)$/,
				loader: 'url-loader?limit=8192&name=./images/[hash].[ext]'
			},
			{
				test: /\.html$/,
				loader: 'html?attrs=img:src img:data-original li:data-img'
			}
		]
	},
	/* 其它解决方案配置 */
	resolve:{
		root:path.join(__dirname,'src'),
		extensions: ['', '.js', '.json'],
		alias:{
			artTemplate: 'js/lib/artTemplate.js',
			jqueryConfirm: 'js/lib/jquery-confirm.min.js',
			jqueryLazyLoad: 'js/lib/jquery.lazyload.js',
			jqueryPagination: 'js/lib/jquery.pagination.min.js',
			jqueryValidate: 'js/lib/jquery.validate.min.js',
			province: 'js/lib/province.js'
		}
	},
	/* 插件部分 */
	plugins:plugins,

	/* 本地服务 */
	devServer: {
		contentBase: './dist',
        host: '0.0.0.0',
        port: 9090, //默认8080
        inline: true, //可以监控js变化
        hot: true, //热启动
	}
}


/* 获取入口的方法 */
function getEntry(filepath){
	var entries = {};
	var files = glob.sync(filepath);

	files.forEach(function(item){
		var pathname = path.basename(item,path.extname(item));
		entries[pathname] = item;
	});
	return entries;
}

