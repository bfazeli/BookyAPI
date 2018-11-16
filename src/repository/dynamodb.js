'use strict';

const AWS = require('aws-sdk') // eslint-disable-line import/no-extraneous-dependencies

let options = {}

// connect to local DB if running offline
if (process.env.IS_OFFLINE) {
	console.log('+ using offline database')
  options = {
    region: 'localhost',
    endpoint: 'http://localhost:8000',
  }
} else {
	console.log('+ using online database')
}

// Use bluebird implementation of Promise
AWS.config.setPromisesDependency(require('bluebird'))
const client = new AWS.DynamoDB.DocumentClient(options)

module.exports = client
