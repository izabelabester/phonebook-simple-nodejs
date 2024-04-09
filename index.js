require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Person = require('./models/person')
app.use(express.static('dist'))
app.use(cors())
app.use(express.json())
// app.use(morgan('tiny'));
morgan.token('body', req => {
    return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
 
const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
  }
app.use(requestLogger) 

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.get('/api/persons', (request, response) => {
    console.log("app.get triggerred")
// response.json(phonebookEntries)
    Person.find({}).then(persons => {
        console.log("found persons: ", persons)
        response.json(persons)
    })
})

// app.get('/api/info', (request, response) => {
//     const options = {
//         weekday: 'long',
//         month: 'long',
//         day: 'numeric',
//         year: 'numeric',
//         hour: 'numeric',
//         minute: 'numeric',
//         second: 'numeric',
//         timeZoneName: 'long'
//     }
//     const formatter = new Intl.DateTimeFormat('en-us', options)
//     const formattedDate = formatter.format(new Date()) 
//     const message = `Phonebook has info for ${phonebookEntries.length} people`
//     response.send(`${message}<br>${formattedDate}`)
// })


app.get('/api/persons/:id', (request, response) => {
    // const id = Number(request.params.id)
    // const person = phonebookEntries.find(person => person.id === id)
    // if (person) {
    //     response.json(person)
    //   } else {
    //     response.status(404).end()
    //   }

      Person.findById(request.params.id).then(person => {
        response.json(person)
      })
})

// app.get('/api/notes', (request, response) => {
//     Note.find({}).then(notes => {
//       response.json(notes)
//     })
// })

// app.delete('/api/persons/:id', (request, response) => {
//     const id = Number(request.params.id)
//     phonebookEntries = phonebookEntries.filter(person => person.id !== id)
//     response.status(204).end()
// })

// const generateId = () => {
//     const maxId = phonebookEntries.length > 0
//       ? Math.max(...phonebookEntries.map(n => n.id))
//       : 0
//     return maxId + 1
//   }
  
// app.post('/api/persons', (request, response) => {
//   const body = request.body
  
//   if (!body.name || !body.number) {
//     return response.status(400).json({ 
//       error: 'request is malformed' 
//     })
//   }
//   const entryAlreadyExists = phonebookEntries.find(person => person.name == body.name)
//   if (entryAlreadyExists) {
//     return response.status(400).json({ 
//         error: 'name must be unique' 
//     })
//   }
  
//   const person = {
//     name: body.name,
//     number: body.number,
//     id: generateId(),
//   }
  
//   phonebookEntries = phonebookEntries.concat(person)
//   response.json(person)
// })

app.post('/api/persons', (request, response) => {
    const body = request.body
  
    if (!body.name || !body.number) {
        return response.status(400).json({ 
            error: 'request is malformed' 
        })
    }
    
    const person = new Person({
        name: body.name,
        number: body.number,
        id: Math.floor(Math.random() * 100)
    })
  
    person.save().then(savedPerson => {
      response.json(savedPerson)
    })
})
  
const PORT = 3001
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`)
})