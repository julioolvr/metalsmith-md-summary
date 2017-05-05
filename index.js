const debug = require('debug')('metalsmith-summary')
const minimatch = require('minimatch')

const DEFAULT_OPTIONS = {
  keyword: 'READMORE',
  pattern: '**/*.@(md|markdown)'
}

function plugin(userOptions) {
  const options = Object.assign({}, DEFAULT_OPTIONS, userOptions)

  return function(files, metalsmith, done) {
    let log = true
    Object.keys(files).filter(minimatch.filter(options.pattern)).forEach(function(filename) {
      const file = files[filename]
      const contents = file.contents.toString()
      const splitContent = contents.split('\n')
      const keywordIndex = splitContent.indexOf(options.keyword)

      if (keywordIndex >= 0) {
        const newContents = splitContent.filter(function(line) {
          return line !== options.keyword
        })

        file.contents = new Buffer(newContents.join('\n'))
        file.summary = splitContent.slice(0, keywordIndex).join('\n')
      } else {
        file.summary = splitContent.filter(Boolean)[0]
      }

      if (log) {
        debug('Summary: %s', file.summary)
        debug('New contents: %s', file.contents.toString())
      }

      log = false
    })
    setImmediate(done)
  }
}

module.exports = plugin