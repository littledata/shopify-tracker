const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
	entry: {
		gaTracker: './src/gaTracker/gaTracker.ts',
		segmentTracker: './src/segmentTracker/segmentTracker.ts',
		carthookTracker: './src/cartHookTracker/carthookTracker.ts',
		segmentThankYouPageTracker: './src/segmentThankYouPageTracker/segmentThankYouPageTracker.ts',
		gaThankYouPageTracker: './src/gaThankYouPageTracker/gaThankYouPageTracker.ts',
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env'],
							sourceType: 'script',
						},
					},
					'ts-loader',
				],
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js', '.d.ts'],
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist'),
	},
	optimization: {
		minimizer: [
			new TerserPlugin({
				terserOptions: { compress: { pure_funcs: ['console.debug'] } },
			}),
		],
	},
	mode: 'production',
};
