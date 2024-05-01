import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Country from './components/Country'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState('')

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        if (name) {
          const response = await axios
            .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
          setCountry(response)
        } else {
          setCountry('')
        }
      } catch (error) {
        setCountry('404')
      }
    }

    fetchCountry()
  }, [name])

  return country
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>
      <Country country={country} />
    </div>
  )
}

export default App