// Imports
import './User.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Repositories from '../repositories/Repositories';
import Api from '../../../services/Api';

// Component
function User() {
    // Declarations
    const { t } = useTranslation();
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
    }, [username]);

    return (
        <div className='container'>
            <h1 className='highText centerText boldText'>{user.login}</h1>
            <div className='row'>
                <p><span className='text boldText'>{t('Id')}</span>: {user.id}</p>
                <p><span className='text boldText'>{t('Login')}</span>: {user.login}</p>
                <p><span className='text boldText'>{t('Name')}</span>: {user.name ? user.name : '-'}</p>
                <Repositories/>
            </div>
        </div>
    );
}

// Exportation
export default User;