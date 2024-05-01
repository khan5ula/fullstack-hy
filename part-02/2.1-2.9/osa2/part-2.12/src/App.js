import { useState, useEffect } from 'react'
import axios from 'axios'


const SearchForm = (props) => {
  return (
    <div>
      Search:
      <input
        value={props.searchTerm}
        onChange={props.handleSearchChange}
      />
    </div>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addName}>
      <div>
        name:
        <input
          value={props.newName}
          onChange={props.handleNameChange}
        />
      </div>
      <div>
        number:
        <input
          value={props.newNumber}
          onChange={props.handleNumberChange}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const PrintPersons = (props) => {
  return (
    <ul>
      {props.results.map((person, index) => (
        <li key={person.name}>{person.name} {person.number}</li>
      ))}
    </ul>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

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

    axios
      .post('http://localhost:3001/persons', nameObject)
      .then(response => {
        console.log(response)
      })
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
   * 4. person.name.toLowerCase().includ
   * es(searchTerm.toLocaleLowerCase()) = the search term in lower case
   * 
   */
  const results = !searchTerm ? persons
    : persons.filter(person =>
      person.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())
    );

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchForm searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
      <h2>Add a new</h2>
      <PersonForm
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        addName={addName}
      />
      <h2>Numbers</h2>
      <PrintPersons results={results} />
    </div>
  )

}

export default App