const uuid = require('uuid')
const db = require('./dynamodb')

module.exports.getAll = (params) => {
    const data = {
        TableName: process.env.BOOK_TABLE
    }

    return db.scan(data).promise()
}

module.exports.getBooksByTheme = (data) => {
    console.log("\n\n" + data.word + "\n\n");
    
    
        // .then ( data => {
        //     return data.json()
        // })
        // .catch ( 
        //     err => {return err}
        // )

    // const data = {
    //     TableName: process.env.BOOK_TABLE,
    //     KeyConditionExpression: "condition = :c and contains(description, :w)"
    // }
}

module.exports.getSynonyms = (data) => {
    const url = `https://od-api.oxforddictionaries.com/api/v1/entries/en/${data.word}/synonyms`
    const otherParams = {
        headers: {
            "app_id": "87370f42",
            "app_key": "69daf2ab9761c11273dd3bb264babec9"
        }
    }
    
    return fetch(url, otherParams)
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


