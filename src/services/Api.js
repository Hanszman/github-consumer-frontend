// Imports
import axios from 'axios';

// Functions
const apiGet = (url) => {
    return axios.get(process.env.REACT_APP_API_URL + url);
}

// Exportation
export {
    apiGet
};