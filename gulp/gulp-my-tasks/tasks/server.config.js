module.exports = function() {
  var main = './src/showcase/';
  var config = {
    main: main,
    index: main + 'index.html',
    port: 9000,
    script: './server.js',
    directory: './server/'
  };

  return config;
};
