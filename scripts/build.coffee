concurrently = require 'concurrently'
path = require 'path'
fs = require 'fs-extra'
rimraf = require 'rimraf'

do ->
  buildDir = path.resolve(__dirname, '..', 'dist')

  if not (await fs.exists buildDir)
    fs.mkdir buildDir

  rimraf.sync buildDir

  concurrently ['yarn compile'],
    {
      killOthers: ['failure']
      maxProcesses: 1
      raw: true
    }

  await fs.remove path.resolve(__dirname, '..', 'dist', 'types.js')
