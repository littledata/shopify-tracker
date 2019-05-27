const path = require('path');

module.exports = {
	entry: {
		gaTracker: './src/gaTracker.js',
		segmentTracker: './src/segmentTracker.js',
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist'),
	},
	mode: 'production',
};
