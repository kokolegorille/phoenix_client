# React client for Phoenix backend

Stand alone client using React.

It runs with webpack-dev-server in the build folder. You start server with 

$ yarn start

Server listen on http://localhost:8080

## Initialization

```bash
$ mkdir phoenix_client
$ cd phoenix_client
$ yarn init -y
$ yarn -D add babel-core babel-eslint babel-loader babel-preset-env babel-preset-react babel-preset-stage-0 css-loader eslint file-loader style-loader webpack webpack-cli webpack-extract-text-plugin@next
```

## Webpack dev server

```bash
$ yarn add -D webpack-dev-server html-webpack-plugin
```

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
  
## Configure webpack

See package.json and webpack.config.js

## Client side

$ yarn add babel-polyfill phoenix axios

$ yarn add prop-types react react-dom react-redux redux redux-devtools-extension redux-logger redux-thunk

This does not include any routing solution.