const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()
app.use(express.static('dist'))
app.use(cors())
app.use(express.json())
// app.use(morgan('tiny'));
morgan.token('body', req => {
    return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let phonebookEntries = 
[
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

// app.get('/dist/index.html', (request, response) => {
//     response.send('<h1>Welcome!</h1>')
// })
  
app.get('/api/persons', (request, response) => {
response.json(phonebookEntries)
})

app.get('/api/info', (request, response) => {
    const options = {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZoneName: 'long'
    }
    const formatter = new Intl.DateTimeFormat('en-us', options)
    const formattedDate = formatter.format(new Date()) 
    const message = `Phonebook has info for ${phonebookEntries.length} people`
    response.send(`${message}<br>${formattedDate}`)
})


app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = phonebookEntries.find(person => person.id === id)
    if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
})
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    phonebookEntries = phonebookEntries.filter(person => person.id !== id)
    response.status(204).end()
})

const generateId = () => {
    const maxId = phonebookEntries.length > 0
      ? Math.max(...phonebookEntries.map(n => n.id))
      : 0
    return maxId + 1
  }
  
app.post('/api/persons', (request, response) => {
  const body = request.body
  
  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'request is malformed' 
    })
  }
  const entryAlreadyExists = phonebookEntries.find(person => person.name == body.name)
  if (entryAlreadyExists) {
    return response.status(400).json({ 
        error: 'name must be unique' 
    })
  }
  
  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  }
  
  phonebookEntries = phonebookEntries.concat(person)
  response.json(person)
  })
  
const PORT = 3001
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`)
})