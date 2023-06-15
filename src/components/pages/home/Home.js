// Imports
import './Home.css';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Input from '../../layout/form/input/Input';
import Button from '../../layout/form/button/Button';
import Card from '../../layout/card/Card';
import Api from '../../../services/Api';
import { FaSearch, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

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
        try {
            Api.get(`/api/users?since=${since}&per_page=${perPage}`).then(
                res => {
                    console.log(res);
                    if (res?.data?.response?.data) {
                        setUsers(res.data.response.data);
                        setUsersFilter(res.data.response.data);
                    } else {
                        setUsers([]);
                        setUsersFilter([]);
                    }
                }, error => {
                    console.log(error);
                    setUsers([]);
                    setUsersFilter([]);
                }
            );
        } catch (error) {
            console.log(error);
            setUsers([]);
            setUsersFilter([]);
        }
    }, []);

    // Functions
    function filterUser(e) {
        e.preventDefault();
        if (loginFilter) {
            try {
                Api.get(`/api/users/${loginFilter}/details`).then(
                    res => {
                        console.log(res);
                        if (res?.data?.response?.data) {
                            const user = [];
                            user.push(res.data.response.data);
                            setUsersFilter(user);
                        } else {
                            setUsersFilter([]);
                        }
                    }, error => {
                        console.log(error);
                        setUsersFilter([]);
                    }
                );
            } catch (error) {
                console.log(error);
                setUsersFilter([]);
            }
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
                                {t('Search')}&nbsp;
                                <FaSearch/>
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
            <div className='container '>
                <div className='row'>
                    <div className='centerDisplay cardContainer'>
                        {
                            usersFilter && usersFilter.length > 0 && usersFilter.map((item) => (
                                <div key={item.id}>
                                    <Card item={item}/>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className='container '>
                <div className='row'>
                    <div className='centerDisplay'>
                        <Button type='button'>
                            <FaArrowLeft/>&nbsp;
                            {t('Previous')}
                        </Button>
                        &nbsp;
                        <Button type='button'>
                            {t('Next')}&nbsp;
                            <FaArrowRight/>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Exportation
export default Home;