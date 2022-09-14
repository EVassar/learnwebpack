const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const glob = require('glob');

let htmlPlugins = [];

let files = glob.sync('./src/views/*.twig');
files.forEach(file => {
  let htmlPlugin = new HtmlWebpackPlugin({
    filename: file.split('/').pop().replace('.twig', '.html'),
    template: file
  });
  htmlPlugins.push(htmlPlugin);
});


module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 9000,
  },
  module: {
    rules: [
        {
        test: /\.twig$/,
        use: {
            loader: 'twig-loader',
            options: {
                // See options section below
            },
        },
    },  
    {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
    },
    {
        test: /\.scss$/i,
        use: [MiniCssExtractPlugin.loader,"css-loader", "sass-loader"],
    },
    ],
  },
  plugins: [
        ...htmlPlugins,
        new MiniCssExtractPlugin(),
    ],
};


node: {
    fs: "empty" // avoids error messages
}