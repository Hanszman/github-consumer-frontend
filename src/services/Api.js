// Imports
import axios from 'axios';
import env from "react-dotenv";

// Exportation
export default axios.create({
    baseURL: env.REACT_APP_API_URL
});