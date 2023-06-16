// Imports
import './User.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Repositories from '../repositories/Repositories';
import Api from '../../../services/Api';

// Component
function User() {
    // Declarations
    const { username } = useParams();
    const [user, setUser] = useState([]);

    useEffect(() => {
        try {
            Api.get(`/api/users/${username}/details`).then(
                res => {
                    if (res?.data?.response?.data) {
                        setUser(res.data.response.data);
                    } else {
                        console.log('Error: Response Empty!');
                    }
                }, error => {
                    console.log(error);
                }
            );
        } catch (error) {
            console.log(error);
        }
    }, []);

    return (
        <div>
            {user.id}
            {user.login}
            {user.name}
            <Repositories/>
        </div>
    );
}

// Exportation
export default User;