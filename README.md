# ember-cli-less

Use LESS to preprocess your ember-cli app CSS.  
***This is copied from https://github.com/aexmachina/ember-cli-sass. All credits to the author.***

## Installation

```
npm install --save-dev ember-cli-less
```

## Usage

By default, this addon will compile `app/styles/app.less` into `dist/assets/app.css`.  
In your development environment, a source map will be automatically be generated.  

Additional options can be specified using the `lessOptions` config property in Brocfile.js:

```javascript
var app = new EmberApp({
  lessOptions: {...}
  ...
});
```

**Options:**  
- `inputFile`: the input LESS file (defaults to `app.less`)
- `outputFile`: the output CSS file (defaults to `app.css`)
- `paths`: an array of include paths
- `sourceMap`: whether to generate source maps. Defaults to `true` in development. The source map file will be saved to `outputFile + '.map'`

## Example

Using Bootstrap LESS source in your app:

Install Bootstrap source:  
```
bower install --save bootstrap
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

## References

- [broccoli-less-single](https://github.com/gabrielgrant/broccoli-less-single)

