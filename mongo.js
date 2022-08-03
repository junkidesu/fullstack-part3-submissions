const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('provide the password as the third argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0.ply7d.mongodb.net/phonebook?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

mongoose
  .connect(url)
  .then(result => {
    if (process.argv.length < 5) {
      console.log('Phonebook')
      Person
        .find({})
        .then(persons => {
          persons.forEach(p => console.log(p.name, p.number))
        })
        .then(() => mongoose.connection.close())
    } else {
      const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
      })

      person.save()
        .then(result => {
          console.log(`added ${person.name} number ${person.number} to phonebook`)
        })
        .then(() => mongoose.connection.close())
    }
  })
