import { useState, useEffect } from 'react'
import countryService from './services/countries'

const SearchForm = (props) => {
  return (
    <div>
      Find countries:
      <input
        value={props.searchTerm}
        onChange={props.handleSearchChange}
      />
    </div>
  )
}

const PrintCountry = ( {country} ) => {
  return (
    <p>{country.countryName}</p>
  )
}

const PrintSearchResults = ({ results }) => {
  if (!results || results.length === 0) {
    return <p>No countries found.</p>;
  }

  return (
    <div>
      {results.map((country) => (
        <PrintCountry
          key={country.ccn3 + country.cca3}
          countryName={country.name.common}></PrintCountry>
      ))}
    </div>
  )
}

const App = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    console.log('effect');
    countryService
      //.getAll()
      .getCountry(5)
      .then(countries => {
        console.log('promise fulfilled');
        setCountries(countries);
      });
  }, []);

  const handleSearchChange = (event) => {
    console.log(event.target.value)
    setSearchTerm(event.target.value)
  }

  const results = searchTerm === '' ? countries : countries.filter(country =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <SearchForm searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
      <PrintSearchResults results={results} />
    </div>
  );
}

export default App;
