const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");

module.exports = {
	output: {
		filename: './static/js/[name].[contenthash].js',
		path: path.resolve(__dirname, '../build'),
	},

	mode: "production",

	devtool: false,

	performance: {
		hints: 'error',
	},

	optimization: {
		chunkIds: 'deterministic',
		moduleIds: 'deterministic',
		runtimeChunk: 'single',
		splitChunks: {
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					name: 'modules',
					chunks: 'initial',
				},
			},
		},
	},

	plugins: [
		new ESLintPlugin({
			extensions: ["js", "jsx", "ts", "tsx"],
		})
	],

	module: {
		rules: [
			{
				test: /\.(css|sass|scss)$/i,
				use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
				exclude: /\.module\.(css|scss|sass)$/i,
			},

			{
				test: /\.(css|sass|scss)$/i,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: "css-loader",
						options: {
							importLoaders: 1,
							modules: {
								mode: "local",
								localIdentName: '[name]--[local]--[hash:base64:5]',
							},
						},
					},
					"sass-loader"
				],
				include: /\.module\.(css|scss|sass)$/i,
			},
		]
	}
};