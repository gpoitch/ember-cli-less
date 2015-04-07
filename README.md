# ember-cli-less

Use [Less](http://lesscss.org/) to preprocess your [ember-cli](http://www.ember-cli.com/) app's css.

## Installation

```
npm install --save-dev ember-cli-less
```

## Usage

By default, this addon will compile `app/styles/app.less` into `dist/assets/app.css`.  
Additional options can be specified using the `lessOptions` config property in `Brocfile.js`:

```javascript
var app = new EmberApp({
  lessOptions: {...}
});
```

**Options:**  
- `paths`: an array of include paths
- `sourceMap`: whether to generate source maps. Defaults to `true` in development.

## Configuring Input/Output Paths

You can configure the input and output files using ember-cli's `outputPaths` option in `Brocfile.js`:
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

## Usage in Addons

You can also use this to precompile LESS files in an addon. By default, this
will compile `addon/styles/addon.less` into a CSS file that can be used by the
host app. *(requires ember-cli >= 0.2.0)*:

To use `ember-cli-less` this way, specify it under the `dependencies` hash in your addon's `package.json`.

## Examples

Using Bootstrap Less source in your app:

Install Bootstrap source:  
```
bower install --S bootstrap
```

Specify the include paths in Brocfile.js:  
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

When setting `sourceMap: true`, a source map will be generated inline in the compiled css file.
When inspecting elements in dev tools (Chrome), you'll see the correct references to the original less files and their corresponding line numbers.
However, if you would like to click into the less source files directly, you have to link them to your local filesystem:

1. Open dev tools > Sources tab
2. Expand the sources pane on the left if it's not open
3. Right-click anywhere, _Add folder to workspace_, add your project's folder
4. Locate any less source file in the tree, right-click, _Map to Network Resource..._ to create the mapping

## References

- Code inspired by: [ember-cli-sass](https://github.com/aexmachina/ember-cli-sass). Credits to the author.
- [broccoli-less-single](https://github.com/gabrielgrant/broccoli-less-single)

