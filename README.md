# ember-cli-less

Use LESS to preprocess your ember-cli app's css, with support for sourceMaps and include paths.
*This is copied from https://github.com/aexmachina/ember-cli-sass. All credits to the author*

## Installation

```
npm install --save-dev ember-cli-less
```

## Usage

By default this addon will compile `app/styles/app.less` into `dist/assets/app.css` and produce a sourceMap for your delectation.

Or, if you want more control then you can specify options using the `lessOptions` config property:

```javascript
var app = new EmberApp({
  ...
  lessOptions: {...}
});
```

- `inputFile`: the input LESS file, defaults to `app.less`
- `outputFile`: the output CSS file, defaults to `app.css`
- `paths`: an array of include paths
- `sourceMap`: controls whether to generate sourceMaps, defaults to `true` in development. The sourceMap file will be saved to `outputFile + '.map'`
