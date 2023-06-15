// Imports
import './Home.css';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Input from '../../layout/form/input/Input';
import Button from '../../layout/form/button/Button';
import Api from '../../../services/Api';

// Component
function Home() {
    // Declarations
    const { t } = useTranslation();
    const [users, setUsers] = useState([]);
    const [usersFilter, setUsersFilter] = useState([]);
    const [loginFilter, setLoginFilter] = useState('');
    const since = 0;
    const perPage = 10;

    useEffect(() => {
        Api.get(`/api/users?since=${since}&per_page=${perPage}`).then(res => {
            setUsers(res.data.response.data);
            setUsersFilter(res.data.response.data);
        });
    }, []);

    // Functions
    function filterUser(e) {
        e.preventDefault();
        if (loginFilter) {
            Api.get(`/api/users/${loginFilter}/details`).then(res => {
                console.log(res);
                const user = [];
                user.push(res.data.response.data);
                setUsersFilter(user);
            });
        } else {
            setUsersFilter(users);
        }
    }

    return (
        <div>
            <h1 className='highText centerText boldText'>{t('TitleText')}</h1>
            <p className='text centerText italicText'>{t('IntroText')}</p><br/>
            <div className='container'>
                <div className='row'>
                    <form className='centerDisplay col-12' onSubmit={(e) => filterUser(e)}>
                        <Input
                            type='text'
                            text={t('User')}
                            name='userLogin'
                            placeholder={t('UserLogin')}
                            handleOnChange={e => setLoginFilter(e.target.value)}
                        />
                        <div className='btnFilter'>
                            <Button type='submit'>
                                {t('Search')}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
            
            <div className='container'>
                <div className='row'>
                    {
                        usersFilter && usersFilter.length > 0 && usersFilter.map((item) => (
                            <div
                                id={item.id}
                                key={item.id}
                                title={item.login}
                            >
                                {item.id} - {item.login}
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

// Exportation
export default Home;