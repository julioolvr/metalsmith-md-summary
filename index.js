const debug = require('debug')('metalsmith-md-summary')
const minimatch = require('minimatch')

const DEFAULT_OPTIONS = {
  keyword: 'READMORE',
  pattern: '**/*.@(md|markdown)'
}

function plugin(userOptions) {
  const options = Object.assign({}, DEFAULT_OPTIONS, userOptions)

  return function(files, metalsmith, done) {
    Object.keys(files).filter(minimatch.filter(options.pattern)).forEach(function(filename) {
      debug('Generating summary for: %s', filename)

      const file = files[filename]
      const contents = file.contents.toString()
      const splitContent = contents.split('\n')
      const keywordIndex = splitContent.indexOf(options.keyword)

      if (keywordIndex >= 0) {
        debug('Found keyword %s, using it to delimit the summary', options.keyword)
        const newContents = splitContent.filter(function(line) {
          return line !== options.keyword
        })

        file.contents = new Buffer(newContents.join('\n'))
        file.summary = splitContent.slice(0, keywordIndex).join('\n')
      } else {
        debug('Didn\'t find keyword %s, using first non-empty paragraph as summary', options.keyword)
        file.summary = splitContent.filter(Boolean)[0]
      }

      debug('Generated summary: %s', file.summary)
    })

    setImmediate(done)
  }
}

module.exports = plugin