import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) // more names
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
    }

    if (!persons.some(person => person.name === newName)) {
      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewNumber('')
    } else {
      window.alert(`${newName} is already in the phonebook!`)
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    console.log(event.target.value)
    setSearchTerm(event.target.value)
  }

  /**
   * Break-down of the following for later reference:
   * 1. !searchTerm = if the search term is not null, false etc.
   * 2. ? persons = then, the results is persons, who...
   * 3. persons.filter(person, predicate) ... fill the predicate term
   * 4. person.name.toLowerCase().includes(searchTerm.toLocaleLowerCase()) = the search term in lower case
   * 
   */
  const results = !searchTerm ? persons
    : persons.filter(person =>
      person.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())
    );

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        Search:
        <input
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <h2>Add a new</h2>
      <form onSubmit={addName}>
        <div>
          name:
          <input
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          number:
          <input
            value={newNumber}
            onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {results.map((person, index) => (
          <li key={index}>{person.name} {person.number}</li>
        ))}
      </ul>
    </div>
  )

}

export default App