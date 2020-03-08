module.exports = {
    module: {
        rules: [
            {
                test: /\.html$/,
                exclude: /node_modules/,
                loader: 'html-loader'
            }
        ]
    }
};
