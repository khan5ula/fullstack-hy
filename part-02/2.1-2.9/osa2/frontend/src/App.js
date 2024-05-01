import { useState, useEffect } from 'react'
import personService from './services/persons'
import Notification from './components/Notification'

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

const DeleteButton = ({ person, deletePerson }) => {
  const handleDelete = () => {
    deletePerson(person.id)
  }

  return (
    <button onClick={handleDelete}>delete</button>
  )
}

const PrintPerson = ({ person, deletePerson }) => {
  return (
    <div>
      {person.name} {person.number}
      <DeleteButton person={person} deletePerson={deletePerson} />
      <br />
    </div>
  )
}

const PrintPersons = ({ results, deletePerson }) => {
  if (!results || results.length === 0) {
    return <p>No numbers found.</p>;
  }

  return (
    <div>
      {results.map((person) => (
        <PrintPerson
          key={person.name}
          person={person}
          deletePerson={deletePerson}
        />
      ))}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [notificationMessage, setNotificationMessage] = useState('')
  const [notificationDisplayed, setNotificationDisplayed] = useState(false);
  const [notificationType, setNotificationType] = useState(null)

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(initialPersons => {
        console.log('promise fulfilled')
        setPersons(initialPersons)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
    }

    const existingPerson = persons.find(person => person.name === newName)

    if (!existingPerson) {
      personService
        .create(nameObject)
        .then(nameObject => {
          setPersons(persons.concat(nameObject))
          setNotificationType('success')
          setNotificationMessage(`Added '${nameObject.name}'`)
          setNotificationDisplayed(true)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          console.log(error.response.data)
          setNotificationType('error')
          setNotificationMessage(`Person validation failed: '${error.response.data.error}'`)
          setNotificationDisplayed(true)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        })
    } else {
      const result = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if (result) {
        updatePerson(existingPerson.id, nameObject)
      } else {
        setNewName('')
        setNewNumber('')
      }
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

  const deletePerson = (id) => {
    personService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
      })
      .catch(error => {
        console.log(error)
      })
  }

  const updatePerson = (id, nameObject) => {
    personService
      .update(id, nameObject)
      .then(updatedPerson => {
        setPersons(persons.map(person => person.id !== id ? person : updatedPerson))
        setNotificationType('success')
        setNotificationMessage(`Name '${nameObject.name}' updated succesfully`)
        setNotificationDisplayed(true)
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        setNotificationType('error')
        setNotificationMessage(`Information of '${nameObject.name}' has already been removed from server`)
        setNotificationDisplayed(true)
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
        console.log(error)
      })
  }

  const results = searchTerm === '' ? persons : persons.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      {notificationDisplayed && (<Notification notificationType={notificationType} message={notificationMessage} />)}
      <SearchForm searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
      <h2>Add a new</h2>
      <PersonForm
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        addName={addName}
        updatePerson={updatePerson}
      />
      <h2>Numbers</h2>
      <PrintPersons results={results} deletePerson={deletePerson} />
    </div>
  )

}

export default App