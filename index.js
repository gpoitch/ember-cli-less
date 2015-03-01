var LESSCompiler = require('broccoli-less-single');
var path         = require('path');
var merge        = require('lodash-node/modern/objects/merge');
var mergeTrees   = require('broccoli-merge-trees');

function LESSPlugin(options) {
  this.name = 'ember-cli-less';
  this.ext = 'less';
  this.options = options;
}

LESSPlugin.prototype.toTree = function(tree, inputPath, outputPath, options) {
  options = merge({}, this.options, options);
  var ext = this.ext;
  var paths = options.outputPaths || { app: options.registry.app.options.outputPaths.app.css };

  var trees = Object.keys(paths).map(function(file) {
    var sourceFileName = file + '.' + ext;
    var output = paths[file];
    var sourceFolderAbsolutePath = path.resolve('.' + inputPath);

    return new LESSCompiler([sourceFolderAbsolutePath], sourceFileName, output, options);
  });

  return mergeTrees(trees);
};

function EmberCLILESS(project) {
  this.project = project;
  this.name = 'Ember CLI LESS';
}

EmberCLILESS.prototype.included = function(app) {
  var options = app.options.lessOptions || {};
  if ((options.sourceMap === undefined) && (app.env === 'development')) {
    options.sourceMap = true;
  }
  app.registry.add('css', new LESSPlugin(options));
};

module.exports = EmberCLILESS;
