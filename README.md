# React client for Phoenix backend

Stand alone client using React.

It runs with webpack-dev-server in the build folder. You start server with 

$ yarn start

Server listen on http://localhost:8080

# Webpack dev server

$ yarn add -D webpack-dev-server html-webpack-plugin

Update webpack.config.js

  // Webpack dev server
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: './src/index.template',
    inject: 'body'
  }),
  
  devServer: {
    historyApiFallback: true
  },