const uuid = require('uuid')
const db = require('./dynamodb')

module.exports.getAll = (params) => {
    const data = {
        TableName: process.env.BOOK_TABLE
    }

    return db.scan(data).promise()
}

module.exports.getOne = (id) => {
    const data = {
        TableName: process.env.BOOK_TABLE,
        Key: {
            id: id
        }
    }

    return db.get(data).promise()
}

module.exports.delete = (id) => {
    const data = {
        TableName: process.env.BOOK_TABLE,
        Key: {
            id: id
        }
    }

    return db.delete(data).promise()
}

module.exports.create = (book) => {
    const data = {
        TableName: process.env.BOOK_TABLE,
        Key: {
            id: uuid.v1()
        },
        AttributeUpdates: {
            title: {Action: "PUT", Value: book.title},
            author: {Action: "PUT", Value: book.author},
            genre: {Action: "PUT", Value: book.genre},
            condition: {Action: "PUT", Value: book.condition},
            isbn: {Action: "PUT", Value: book.isbn},
            description: {Action: "PUT", Value: book.description},
            purchasers: {Action: "PUT", Value: {}},
            sellers: {Action: "PUT", Value: {}}
        },
        ReturnValues: 'ALL_NEW'
    }
    return db.update(data).promise()
}


