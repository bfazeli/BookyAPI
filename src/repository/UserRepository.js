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
        Item: {
            id: uuid.v1(),
            name: user.name,
            phone: user.phone,
            email: user.email
        }
    }
    console.log(data);
    console.log(db);
    return db.put(data).promise()
}

