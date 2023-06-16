// Imports
import './User.css';
import { apiGet } from '../../../services/Api';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { formatDateString } from '../../../utils/Utils';
import Repositories from '../repositories/Repositories';
import { FaGithub } from 'react-icons/fa';
import profilePic from '../../../assets/img/user_profile_pic.png';

// Component
function User() {
    // Declarations
    const { t } = useTranslation();
    const { username } = useParams();
    const [user, setUser] = useState([]);

    useEffect(() => {
        try {
            apiGet(`/api/users/${username}/details`).then(
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
            <div className='imgContainer centerText'>
                {
                    user.avatar_url &&
                    <img
                        className='profilePicImg userImg'
                        src={user.avatar_url}
                        alt={`${user.login}-Profile`}
                    />
                }
                {
                    !user.avatar_url &&
                    <img
                        className='profilePicImg userImg'
                        src={profilePic}
                        alt={`${user.login}-Profile`}
                    />
                }
            </div>
            <div className='row centerText'>
                <p><span className='text boldText'>{t('Id')}:</span> {user.id}</p>
                <p><span className='text boldText'>{t('Login')}:</span> {user.login}</p>
                <p><span className='text boldText'>{t('Name')}:</span> {user.name ? user.name : '-'}</p>
                <p><span className='text boldText'>{t('ProfileURL')}:&nbsp;<FaGithub/>&nbsp;</span>
                    <a href={user.html_url} target='_blank' rel="noreferrer" className='userLink'>
                        {user.html_url}
                    </a>
                </p>
                <p><span className='text boldText'>{t('CreationDate')}:</span> {formatDateString(user.created_at)}</p>
                <Repositories username={username}/>
            </div>
        </div>
    );
}

// Exportation
export default User;