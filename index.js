'use strict';

const LESSCompiler = require('broccoli-less-single');
const path = require('path');
const mergeTrees = require('broccoli-merge-trees');
const VersionChecker = require('ember-cli-version-checker');

function LESSPlugin(optionsFn) {
  this.name = 'ember-cli-less';
  this.ext = 'less';
  this.optionsFn = optionsFn;
}

LESSPlugin.prototype.toTree = function (
  tree,
  inputPath,
  outputPath,
  inputOptions
) {
  let options = Object.assign(
    {
      cacheInclude: [/.*\.(css|less)$/],
    },
    this.optionsFn(),
    inputOptions
  );

  let ext = this.ext;
  let paths = options.outputPaths || {
    app: options.registry.app.options.outputPaths.app.css,
  };

  /* remove `registry` object we pass into Less */
  delete options.registry;

  let trees = Object.keys(paths).map(function (file) {
    let input = path.join(inputPath, file + '.' + ext);
    let output = paths[file];

    return new LESSCompiler([tree], input, output, options);
  });

  return mergeTrees(trees, options.mergeTrees);
};

module.exports = {
  name: require('./package').name,
  project: this.project,

  shouldSetupRegistryInIncluded: function () {
    const checker = new VersionChecker(this.project);
    const cliDep = checker.for('ember-cli');
    return !cliDep.isAbove('0.2.0');
  },

  lessOptions: function () {
    let env = process.env.EMBER_ENV;
    let app = this.app;

    // fix issue with nested addons, in which case our app.options hash is actually on app.app.options.
    // n.b. this can be removed once ember-cli better supports nested addons.
    //   (see https://github.com/gdub22/ember-cli-less/issues/36)
    if (app && !app.options && app.app) {
      app = app.app;
    }

    let options = (app && app.options && app.options.lessOptions) || {};

    if (options.sourceMap === undefined && env === 'development') {
      options.sourceMap = true;
    }

    return options;
  },

  setupPreprocessorRegistry: function (type, registry) {
    registry.add('css', new LESSPlugin(this.lessOptions.bind(this)));

    // prevent conflict with broccoli-less-single if it's installed
    if (registry.remove) {
      registry.remove('css', 'broccoli-less-single');
    }
  },

  included: function (app) {
    this.app = app; // used to provide back-compat for ember-cli < 0.2.0 in lessOptions()
    this._super.included.apply(this, arguments);

    if (this.shouldSetupRegistryInIncluded()) {
      this.setupPreprocessorRegistry('parent', app.registry);
    }
  },

  buildError: function (error) {
    if (error) {
      try {
        error.stack = error.stack || JSON.stringify(error, null, 2);
      } catch (err) {} // eslint-disable-line no-empty
    }
  },
};
