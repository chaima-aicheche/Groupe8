#!/bin/bash

if [ -z "$1" ]; then
  echo "Usage: $0 <project-name>"
  exit 1
fi

PROJECT_NAME=$1

mkdir $PROJECT_NAME
cd $PROJECT_NAME

npm init -y

npm install react react-dom

npm install webpack webpack-cli webpack-dev-server babel-loader @babel/core @babel/preset-env @babel/preset-react html-webpack-plugin

echo '{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}' > .babelrc

echo "const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  devServer: {
    static: path.join(__dirname, 'dist'),
    compress: true,
    port: 3000
  }
};" > webpack.config.js

mkdir -p src
echo '<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>'$PROJECT_NAME'</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>' > src/index.html

echo "import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));" > src/index.js

echo "import React from 'react';

const App = () => {
  return (
    <div>
      <h1>Hello World!</h1>
    </div>
  );
};

export default App;" > src/App.js

sed -i.bak '/"scripts": {/a \
    "start": "webpack serve --mode development",\
    "build": "webpack --mode production",' package.json

if ! grep -q '"start": "webpack serve --mode development"' package.json; then
  echo '  "start": "webpack serve --mode development",
    "build": "webpack --mode production"' > temp_scripts.json
  jq -s '.[0] * .[1]' package.json temp_scripts.json > package_temp.json && mv package_temp.json package.json
  rm temp_scripts.json
fi

