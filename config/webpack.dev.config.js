const path = require('path');

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
		static: {
			directory: path.resolve(__dirname, '../public'),
			publicPath: "/"
		},
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
								localIdentName: '[name]__[local]__[hash:base64:5]',
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