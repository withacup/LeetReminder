var path = require('path')
var childProcess = require('child_process')
var phantomjs = require('phantomjs')
var binPath = phantomjs.path
 
var childArgs = [
  path.join(__dirname, 'actions/craw.js')
]
 
childProcess.execFile(binPath, childArgs, function(err, stdout, stderr) {
  console.log('fron test.js:', stdout);
})