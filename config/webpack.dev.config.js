const path = require('path');
const ESLintPlugin = require("eslint-webpack-plugin");

module.exports = {
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, '../build-dev'),
	},

	mode: "development",

	devtool: "eval-source-map",

	performance: {
		hints: 'warning',
	},

	devServer: {
		port: 3000,

		client: {
			logging: 'error',
			overlay: {
				errors: true,
				warnings: false,
			},
		},

		compress: true,
		historyApiFallback: true,
		open: true,
		hot: true
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
				use: ["style-loader", "css-loader", "sass-loader"],
				exclude: /\.module\.(css|scss|sass)$/i,
			},

			{
				test: /\.(css|sass|scss)$/i,
				use: [
					"style-loader",
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