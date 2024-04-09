// import { createRequire } from 'module';
// const require = createRequire(import.meta.url);

// const mongoose = require('mongoose')

// if (process.argv.length<3) {
//   console.log('give password as argument')
//   process.exit(1)
// }

// const password = process.argv[2]
// const name = process.argv[3]
// const number = process.argv[4]

// const url =
//   `mongodb+srv://izabester1:${password}@cluster0.o4bh3qk.mongodb.net/phonebook?retryWrites=true&w=majority`

// mongoose.set('strictQuery',false)

// mongoose.connect(url)

// const personSchema = new mongoose.Schema({
//   name: String,
//   number: String,
//   id: Number
// })

// const Person = mongoose.model('Person', personSchema)

// if (name) {
//   const person = new Person({
//     name: name,
//     number: number,
//     id: Math.floor(Math.random() * 100)
//   })

//   person.save().then(result => {
//     console.log(`added ${person.name} number ${person.number} to phonebook!`)
//     mongoose.connection.close()
//   })

// } else {
//     Person.find({}).then(result => {
//       console.log("phonebook:")
//     result.forEach(person => {
//       console.log(`${person.name} ${person.number}`)
//     })
//     mongoose.connection.close()
//   })
// }

// // noteSchema.set('toJSON', {
// //   transform: (document, returnedObject) => {
// //     returnedObject.id = returnedObject._id.toString()
// //     delete returnedObject._id
// //     delete returnedObject.__v
// //   }
// // })