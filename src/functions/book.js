'use strict';
const BookRepository = require('../repository/BookRepository')

module.exports.getAll = (event, context, callback) => {
  BookRepository.getAll(event)
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

module.exports.getBooksByTitle = (event, context, callback) => {
    const {title} = JSON.parse(event.body)
    
    BookRepository.getBooksByTitle(title)
    .then(value => {
        console.log(value);
        
        const response = {
            statusCode: 200,
            body: JSON.stringify({"books" : value.Items})
        }
        console.log(response);
        callback(null, response)
    })
    .catch(error => {
        console.log(error);
        callback(null, error)
    })
}

module.exports.getBooksByAuthor = (event, context, callback) => {
    const {text} = JSON.parse(event.body)

    BookRepository.getBooksByAuthor(text)
    .then(value => {
        console.log(value);
        
        const response = {
            statusCode: 200,
            body: JSON.stringify({"books": value.Items})
        }
        console.log(response);
        callback(null, response)  
    })
    .catch(error => {
        console.log(error);
        callback(null, error)
    })
}

module.exports.getBooksByTheme = (event, context, callback) => {
    const {text} = JSON.parse(event.body)

    console.log(text);
    
    BookRepository.getSynonyms(text)
    .then(value => {
        return value.json()
    })
    .then(result => {
        let arrOfSenses = result.results[0].lexicalEntries[0].entries[0].senses
        let listOfSynonyms = []

        arrOfSenses.forEach(sense => {
            sense.synonyms.forEach(synObj => {
                listOfSynonyms.push(synObj.text)
            })
        });
        listOfSynonyms.unshift(text)

        return listOfSynonyms
    })
    .then( synonyms => {
        const arrOfPromises = []
        synonyms.forEach(synonym => {
            arrOfPromises.push(BookRepository.getBooksByKeyword(synonym))
        })
        
        Promise.all(arrOfPromises).then( values => {
          // const set = [new Set()]
          const set = []
          const result = []

          // Gets rid of duplicates
          values.forEach(obj => {
            obj.Items.forEach(book => {
              if (!(set.indexOf(book.isbn) > -1)) {
                set.push(book.isbn)
                result.push(book)
              }
            })
          })

          const response = {
            statusCode: 200,
            body: JSON.stringify(
              {
                "Synonyms": synonyms,
                "books": result
              })
          }
          console.log(response)
          callback(null, response)
        })
    })
    .catch( error => {
        console.log(error)
        callback(null, error)
    })
  }

module.exports.getBooksByKeyword = (event, context, callback) => {
  const {text} = JSON.parse(event.body)

  BookRepository.getBooksByKeyword(text)
  .then(value => {
    const response = {
      statusCode: 200,
      body: JSON.stringify({"books" : value.Items})
    }
    console.log(response);
    callback(null, response)
  })
  .catch(error => {
    console.log(error);
    callback(null, error)
  })
}

module.exports.getOne = (event, context, callback) => {
    const {id} = JSON.parse(event.body)

  BookRepository.getOne(id)
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
  const {id} = JSON.parse(event.body)
  BookRepository.delete(id)
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

module.exports.update = (event, context, callback) => {
  console.log(event.body);
  
  const book = JSON.parse(event.body)
  BookRepository.update(book)
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

module.exports.create = (event, context, callback) => {
    console.log(event.body);
    
  const book = JSON.parse(event.body)
  BookRepository.create(book)
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
