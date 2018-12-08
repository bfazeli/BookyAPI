const uuid = require('uuid')
const db = require('./dynamodb')

module.exports.getAll = (params) => {
    const data = {
        TableName: process.env.BOOK_TABLE
    }

    return db.scan(data).promise()
}

module.exports.getBooksByTheme = (text) => {
    console.log("\n\n" + text + "\n\n");
    

    
    // Figure out a way to return from inside the then block
    console.log(arrOfPromises.length);
    
}

module.exports.getBooksByKeyword = (keyword) => {
    const data = {
        TableName: process.env.BOOK_TABLE,
        FilterExpression: "contains(title, :lowerK) OR contains(description, :lowerK) OR contains(title, :upperK) OR contains(description, :upperK)",
        ExpressionAttributeValues: {
            ':upperK' : `${keyword}`,
            ':lowerK' : `${keyword}`
        }
    }

    return db.scan(data).promise()
}

module.exports.getBooksByTitle = (title) => {
    const data = {
        TableName: process.env.BOOK_TABLE,
        FilterExpression: "contains(title, :t)",
        ExpressionAttributeValues: {
            ':t' : `${title}`
        }
    }

    return db.scan(data).promise()
}

module.exports.getBooksByAuthor = (author) => {
    const data = {
        TableName: process.env.BOOK_TABLE,
        FilterExpression: "contains(author, :a)",
        ExpressionAttributeValues: {
            ":a" : `${author}`
        }
    }

    return db.scan(data).promise()
}

module.exports.getSynonyms = (text) => {
    const url = `https://od-api.oxforddictionaries.com/api/v1/entries/en/${text}/synonyms`
    const otherParams = {
        
        // Insert your app id and app key below
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
            title: {Action: "PUT", Value: book.title.toLowerCase()},
            author: {Action: "PUT", Value: book.author.toLowerCase()},
            genre: {Action: "PUT", Value: book.genre.toLowerCase()},
            condition: {Action: "PUT", Value: book.condition.toLowerCase()},
            isbn: {Action: "PUT", Value: book.isbn},
            price: {Action: "PUT", Value: book.price},
            description: {Action: "PUT", Value: book.description.toLowerCase()},
            purchasers: {Action: "PUT", Value: {}},
            sellers: {Action: "PUT", Value: book.sellers}
        },
        ReturnValues: 'ALL_NEW'
    }
    return db.update(data).promise()
}

module.exports.update = (book) => {
    const data = {
        TableName: process.env.BOOK_TABLE,
        Key: {
            id: book.id
        },
        AttributeUpdates: {
            title: {Action: "PUT", Value: book.title.toLowerCase()},
            author: {Action: "PUT", Value: book.author.toLowerCase()},
            genre: {Action: "PUT", Value: book.genre.toLowerCase()},
            condition: {Action: "PUT", Value: book.condition.toLowerCase()},
            isbn: {Action: "PUT", Value: book.isbn},
            price: {Action: "PUT", Value: book.price},
            description: {Action: "PUT", Value: book.description.toLowerCase()},
            purchasers: {Action: "PUT", Value: {}},
            sellers: {Action: "PUT", Value: book.sellers}
        },
        ReturnValues: 'ALL_NEW'
    }
    return db.update(data).promise()
}


