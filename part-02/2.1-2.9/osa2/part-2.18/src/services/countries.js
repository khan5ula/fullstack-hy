import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/all'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const getCountry = (index) => {
    const request = axios.get(`${baseUrl}/${index}`);
    console.log('getCountry got ' + request.data)
    return request.then(response => response.data);
};

export default { getAll, getCountry }