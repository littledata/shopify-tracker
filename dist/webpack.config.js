const path = require('path');
module.exports = {
    entry: {
        gaTracker: './src/gaTracker/gaTracker.ts',
        segmentTracker: './src/segmentTracker/segmentTracker.ts',
        cartHookTracker: './src/cartHookTracker/cartHookTracker.ts',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
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
    mode: 'production',
};
