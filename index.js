/* jshint node: true */
'use strict';

var LESSCompiler = require('broccoli-less-single');
var path         = require('path');
var merge        = require('lodash.merge');
var mergeTrees   = require('broccoli-merge-trees');
var checker      = require('ember-cli-version-checker');

function LESSPlugin(optionsFn) {
  this.name = 'ember-cli-less';
  this.ext = 'less';
  this.optionsFn = optionsFn;
}

LESSPlugin.prototype.toTree = function(tree, inputPath, outputPath, inputOptions) {
  var options = merge({}, this.optionsFn(), inputOptions);

  var ext = this.ext;
  var paths = options.outputPaths || {
    app: options.registry.app.options.outputPaths.app.css
  };

  var trees = Object.keys(paths).map(function(file) {
    var input = path.join(inputPath, file + '.' + ext);
    var output = paths[file];

    return new LESSCompiler([tree], input, output, options);
  });

  return mergeTrees(trees, options.mergeTrees);
};

module.exports = {
  name: 'Ember CLI LESS',
  project: this.project,

  shouldSetupRegistryInIncluded: function() {
    return !checker.isAbove(this, '0.2.0');
  },

  lessOptions: function() {
    var env = process.env.EMBER_ENV;
    var app = this.app;

    // fix issue with nested addons, in which case our app.options hash is actually on app.app.options.
    // n.b. this can be removed once ember-cli better supports nested addons.
    //   (see https://github.com/gdub22/ember-cli-less/issues/36)
    if (app && !app.options && app.app) {
      app = app.app;
    }

    var options = (app && app.options && app.options.lessOptions) || {};

    if ((options.sourceMap === undefined) && (env === 'development')) {
      options.sourceMap = true;
    }

    return options;
  },

  setupPreprocessorRegistry: function(type, registry) {
    registry.add('css', new LESSPlugin(this.lessOptions.bind(this)));

    // prevent conflict with broccoli-less-single if it's installed
    if (registry.remove) {
      registry.remove('css', 'broccoli-less-single');
    }
  },

  included: function(app) {
    this.app = app; // used to provide back-compat for ember-cli < 0.2.0 in lessOptions()
    this._super.included.apply(this, arguments);

    if (this.shouldSetupRegistryInIncluded()) {
      this.setupPreprocessorRegistry('parent', app.registry);
    }
  },

  buildError: function(error) {
    if (error) {
      error.stack = error.stack || JSON.stringify(error, null, 2);
    }
  }
}
