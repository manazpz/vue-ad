'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://59.110.157.132/aq"',
  RESOURCE_URL: '"http://59.110.157.132:8081/contract"',
})

