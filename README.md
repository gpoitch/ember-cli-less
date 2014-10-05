# ember-cli-less

Use LESS to preprocess your ember-cli app's css, with support for source maps and include paths.  
***This is copied from https://github.com/aexmachina/ember-cli-sass. All credits to the author.***

## Installation

```
npm install --save-dev ember-cli-less
```

## Usage

By default, this addon will compile `app/styles/app.less` into `dist/assets/app.css` along with a source map.

If you want more control, you can specify options using the `lessOptions` config property:

```javascript
var app = new EmberApp({
  ...
  lessOptions: {...}
});
```

- `inputFile`: the input LESS file, defaults to `app.less`
- `outputFile`: the output CSS file, defaults to `app.css`
- `paths`: an array of include paths
- `sourceMap`: controls whether to generate source maps. Defaults to `true` in development. The source map file will be saved to `outputFile + '.map'`

## Example

The following example assumes your bower packages are installed into `bower_components/`.

Install some LESS:

```shell
bower install --save bootstrap
```

Specify some include paths in Brocfile.js:

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
