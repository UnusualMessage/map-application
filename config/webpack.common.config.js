const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
	entry: path.resolve(__dirname, '../src', 'index.tsx'),

	output: {
		clean: true,
	},

	plugins: [
		new HtmlWebpackPlugin({
			filename: "index.html",
			template: path.resolve(__dirname, "../public", "index.html")
		}),
		new MiniCssExtractPlugin({
			filename: "./static/css/style.[contenthash].css",
		}),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, "../public"),
					to: "[path][name][ext]",
					globOptions: {
						dot: true,
						gitignore: true,
						ignore: ["**.html"]
					}
				},
			]
		}),
	],

	resolve: {
		extensions: [".ts", ".tsx", ".js", ".jsx", ".css", ".scss"],
	},

	stats: "minimal",

	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ["babel-loader"]
			},

			{
				test: /\.(ts|tsx)$/,
				exclude: /node_modules/,
				use: [{
					loader: "ts-loader",
					options: {
						transpileOnly: true
					}
				}],
			},
		]
	}
};