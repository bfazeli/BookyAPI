const uuid = require('uuid')
const db = require('./dynamodb')

module.exports.getAll = (params) => {
    const data = {
        TableName: process.env.USER_TABLE
    }

    return db.scan(data).promise()
}

module.exports.getOne = (id) => {
    const data = {
        TableName: process.env.USER_TABLE,
        Key: {
            id: id
        }
    }
    
    return db.get(data).promise()
}

module.exports.delete = (id) => {
    const data = {
        TableName: process.env.USER_TABLE,
        Key: {
            id: id
        }
    }

    return db.delete(data).promise()
}

module.exports.create = (user) => {
    const data = {
        TableName: process.env.USER_TABLE,
        Key: {
            id: uuid.v1()
        },
        AttributeUpdates: {
            firstName: {Action: "PUT", Value: user.firstName.toLowerCase()},
            lastName: {Action: "PUT", Value: user.lastName.toLowerCase()},
            usermame: {Action: "PUT", Value: user.username.toLowerCase()},
            password: {Action: "PUT", Value: user.password},
            phone: {Action: "PUT", Value: user.phone},
            email: {Action: "PUT", Value: user.email},
            address: {Action: "PUT", Value: user.address},
            soldBooKs: {Action: "PUT", Value: {}},
            purchasedBooks: {Action: "PUT", Value: {}}
        },
        ReturnValues: 'ALL_NEW'
    }
    return db.update(data).promise()
}


