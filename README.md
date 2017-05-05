# metalsmith-summary

A [Metalsmith](http://www.metalsmith.io/) plugin to extract a summary from Markdown files. Useful for blog posts.

## Install

```
$ npm install metalsmith-summary
```

Or

```
$ yarn add metalsmith-summary
```

## Usage

```js
const summary = require('metalsmith-summary')

metalsmith.use(summary())
```

By default `metalsmith-summary` will take Markdown files and look for the `READMORE` keyword on an otherwise empty paragraph. If it finds it, it will set the `summary` property on that file with all the content up to that keyword. If it doesn't, it will set the first non-empty paragraph as the file's summary.

## Options

### `pattern` (default `'**/*.@(md|markdown)'`)

Files for which to generate a summary.

### `keyword` (default `'READMORE'`)

Keyword to use as a delimiter for the summary.
