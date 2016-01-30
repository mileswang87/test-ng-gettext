var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: "./app.entry.ts",
  output: {
    path: __dirname,
    filename: "tmp/app.js"
  },
  debug: true,
  devtool: '#sourcemap',
  watch: true,
  watchOptions: {
    aggregateTimeout: 200
  },
  resolve: {
    modulesDirectories: ["node_modules", 'bower_components'],
    extensions: ["", ".js", ".ts", ".coffee"]
  },
  plugins: [
    new webpack.ResolverPlugin([
      new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("package.json", ["main"]),
      new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
    ]),
    new ExtractTextPlugin("tmp/app.css"),
    new HtmlWebpackPlugin({
      inject: true,
      template: 'index.template.html',
      filename: 'index.html'
    })
  ],
  module: {
    loaders: [
      {test: /\.(jpg|png|svg|ttf|woff2|woff|eot)$/, loader: "file?name=tmp/assets/[name]-[hash].[ext]"},
      {test: /\.scss$/, loader: ExtractTextPlugin.extract("style", "css?sourceMap!autoprefixer!sass?sourceMap")},
      {test: /\.css$/, loader: ExtractTextPlugin.extract("style", "css?sourceMap!autoprefixer")},
      {test: /\.html$/, loader: "html"},
      //{test: /\.template\.jade$/, loader: "ngtemplate?relativeTo=src/&prefix=app/!html!jade-html"},
      {test: /\.jade$/, loader: "html!angular-gettext-extract-loader?pofile=po/template.pot!jade-html", exclude: [/\.template\.jade$/]},
      {test: /\.js$/, exclude: /node_modules/, loader: "angular-gettext-extract-loader?pofile=po/template.pot!babel-loader!imports?define=>false"},
      {test: /\.js$/, include: /node_modules/, loader: "imports?define=>false"},

      {test: /\.tsx?$/, loader: 'angular-gettext-extract-loader?pofile=po/template.pot!ts-loader?silent=true'}
    ]
  }
};
