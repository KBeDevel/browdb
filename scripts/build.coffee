concurrently = require 'concurrently'
path = require 'path'
fs = require 'fs-extra'
rimraf = require 'rimraf'

do ->
  rootDir = path.resolve __dirname, '..'

  buildDirs = [
    path.join rootDir, 'lib'
    path.join rootDir, 'lib-esm'
    path.join rootDir, '_bundles'
  ]

  for dir in buildDirs then do (dir) ->
    unless await fs.pathExists dir
      await fs.mkdir dir
    rimraf.sync dir

  await concurrently(
    [
      'yarn transpile'
      'yarn transpile:esm'
      'yarn bundle'
    ]
    {
      killOthers: ['failure']
      maxProcesses: 1
      raw: true
    }
  )

  return
