# ember-cli-less

Use [Less](http://lesscss.org/) to preprocess your [ember-cli](http://www.ember-cli.com/) app's css.

[![npm version](https://badge.fury.io/js/ember-cli-less.svg)](http://badge.fury.io/js/ember-cli-less)
[![Ember Observer Score](http://emberobserver.com/badges/ember-cli-less.svg)](http://emberobserver.com/addons/ember-cli-less)
[![Build Status](https://travis-ci.org/gdub22/ember-cli-less.svg)](https://travis-ci.org/gdub22/ember-cli-less)

## Installation

```
npm install --save-dev ember-cli-less
```

## Usage

By default, this addon will compile `app/styles/app.less` into `dist/assets/app.css`.
Additional options can be specified using the `lessOptions` config property in `ember-cli-build.js`:

```javascript
var app = new EmberApp({
  lessOptions: {...}
});
```

**Available Options:**

- `paths`: An array of include paths
- `sourceMap`: Whether to generate source maps. Defaults to `true` in development and can also
take an object of sub options: http://lesscss.org/usage/#programmatic-usage
- `mergeTrees`: An object of the available options to pass to the internal [merge trees] plugin

## Configuring Input/Output Paths

You can configure the input and output files using ember-cli's `outputPaths` option in `ember-cli-build.js`:

```javascript
var app = new EmberApp({
  outputPaths: {
    app: {
      css: {
        'app': '/assets/my-project.css'
      }
    }
  }
});
```

You can also configure multiple input/output paths to generate multiple css files:

```javascript
var app = new EmberApp({
  outputPaths: {
    app: {
      css: {
        'theme-orange': '/assets/theme-orange.css',
        'theme-purple': '/assets/theme-purple.css'
      }
    }
  }
});
```

*Notice that you cannot specify the name of the Source Map if multiple input/output paths are used.
The name gets generated from the output path (`/assets/theme-orange.css` -> `/assets/theme-orange.css.map`).*

## Usage in Addons

You can also use this to precompile less files in an addon. By default, this
will compile `addon/styles/addon.less` into css that will be merged into the
host app's css. *(requires ember-cli >= 0.2.0)*:

1. Install `ember-cli-less` in your addon's `package.json` under `dependencies`
2. Create your addon less file at `addon/styles/addon.less` (or where you specify in your options)
3. To run the addon's dummy app, be sure to create `tests/dummy/app/styles/app.less` if it doesn't exist
4. To make less files available for applications that consume this addon, create `app/styles/app.less` in your addon and add `@import 'addon/styles/addon';` to its content

To include custom css files, use `@import` statment in `addon/styles/addon.less`. For example:
```less
// addon/styles/addon.less
@import "bower_components/bootstrap/less/bootstrap";  // look for "bower_components/bootstrap/less/bootstrap.less"
```


## Examples

Using Bootstrap Less source in your app:

Install Bootstrap source:
```
bower install --S bootstrap
```

Specify the include paths in `ember-cli-build.js`:

```javascript
var app = new EmberApp({
  lessOptions: {
    paths: [
      'bower_components/bootstrap/less'
    ]
  }
});
```

Import into app.less:

```less
@import 'bootstrap';
```

## Linking source maps

When sourcemaps are enabled, you'll see the correct references to the original less files and their corresponding
line numbers in Dev Tools. If you would like to link the less source files directly, you have to link them to
your local filesystem in Chrome:

1. Open dev tools > Sources tab
2. Expand the sources pane on the left if it's not open
3. Right-click anywhere, _Add folder to workspace_, add your project's folder
4. Locate any less source file in the tree, right-click, _Map to Network Resource..._ to create the mapping

## References

- Code inspired by: [ember-cli-sass](https://github.com/aexmachina/ember-cli-sass). Credits to the author.
- [broccoli-less-single](https://github.com/gabrielgrant/broccoli-less-single)
- [less](https://github.com/less/less.js)

[merge trees]: https://github.com/broccolijs/broccoli-merge-trees#options
