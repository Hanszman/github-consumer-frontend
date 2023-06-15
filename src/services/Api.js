// Imports
import axios from 'axios';
import env from "react-dotenv";

// Exportation
export default axios.create({
    baseURL: env.API_URL
});