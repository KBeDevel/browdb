concurrently = require 'concurrently'
path = require 'path'
fs = require 'fs-extra'
rimraf = require 'rimraf'

do ->
  buildDirs = [
    path.resolve __dirname, '..', 'lib'
    path.resolve __dirname, '..', 'lib-esm'
    path.resolve __dirname, '..', '_bundles'
  ]

  for dir in buildDirs then do (dir) ->
    if not (await fs.exists dir)
      fs.mkdir dir
    rimraf.sync dir

  concurrently ['yarn transpile', 'yarn transpile:esm', 'yarn bundle'],
    {
      killOthers: ['failure']
      maxProcesses: 1
      raw: true
    }
