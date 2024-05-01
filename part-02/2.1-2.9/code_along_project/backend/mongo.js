/* eslint-disable no-unused-vars */
const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('given password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  //`mongodb+srv://kristianfullstack:${password}@kristian-fullstack.8ihwvmx.mongodb.net/noteApp?retryWrites=true&w=majority`
  `mongodb+srv://kristianhannula:${password}@notestesting.zbfw603.mongodb.net/?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

/*Note.find({}).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})*/

/* ------- SECTION FOR CREATING NEW NOTES ------- */

const note = new Note({
  content: 'HTML is Easy',
  important: true,
})

const test = new Note({
  content: 'Giggels goggels',
  important: true,
})


/* MongoDB operations are asynchronous, so all save operations should be executed before the connection is closed */


Promise.all([
  note.save().then(() => console.log('note ' + note.content + ' saved!')),
  test.save().then(() => console.log('note ' + test.content + ' saved!')),
]).then(results => {
  mongoose.connection.close()
}).catch(error => {
  console.log('error:', error)
  mongoose.connection.close()
})

/* ------- SECTION FOR CREATING NEW NOTES ------- */