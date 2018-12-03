'use strict';
const UserRepository = require('../repository/BookRepository')

module.exports.getAll = (event, context, callback) => {
  UserRepository.getAll(event)
    .then(value => {
      const response = {
        statusCode: 200,
        body: JSON.stringify({ "books": value.Items})
      }
      console.log(response);
      callback(null, response)
    })
    .catch( error => {
      console.log(error);
      callback(null, error)
    })
}

module.exports.getOne = (event, context, callback) => {
  const {userId} = JSON.parse(event.body)
  UserRepository.getOne(userId)
  .then(value => {
    const response = {
      statusCode: 200,
      body: JSON.stringify(value.Item)
    }
    console.log(response);
    callback(null, response)
  })
  .catch( error => {
    console.log(error);
    callback(null, error)
  })
}

module.exports.delete = (event, context, callback) => {
  console.log(event.body);
  
  const {userId} = JSON.parse(event.body)
  UserRepository.delete(userId)
  .then(value => {
    const response = {
      statusCode: 204,
      body: JSON.stringify(value)
    }
    console.log(response);
    callback(null, response)
  })
  .catch( error => {
    console.log(error);
    callback(null, error)
  })
}

module.exports.create = (event, context, callback) => {
  const user = JSON.parse(event.body)
  UserRepository.create(user)
  .then(value => {
    
    const response = {
      isBase64Encoded: false,
      statusCode: 201,
      body: JSON.stringify(value.Attributes)
    }
  
    console.log(response);
    callback(null, response)
  })
  .catch( error => {
    console.log(error);
    callback(null, error)
  })
}
