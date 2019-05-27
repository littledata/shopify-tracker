const path = require('path');

module.exports = {
	entry: './src/gaTrackingScript.js',
	output: {
		filename: 'gaTrackingScript.js',
		path: path.resolve(__dirname, 'dist'),
	},
};
