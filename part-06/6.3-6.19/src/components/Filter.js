import { setFilter } from '../reducers/filterReducer'
import { useDispatch } from 'react-redux'

const Filter = (props) => {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    event.preventDefault()
    const searchTerm = event.target.value
    dispatch(setFilter(searchTerm))
  }

  const style = {
    marginBottom: 20,
  }

  return (
    <div style={style}>
      filter {' '}
      <input
        name="filterSearchTerm"
        onChange={handleChange}
      />
    </div>
  )
}

export default Filter