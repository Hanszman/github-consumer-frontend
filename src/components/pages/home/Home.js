// Imports
import './Home.css';
import { apiGet } from '../../../services/Api';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Input from '../../layout/form/input/Input';
import Button from '../../layout/form/button/Button';
import Card from '../../layout/card/Card';
import { FaSearch, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

// Component
function Home() {
    // Declarations
    const { t } = useTranslation();
    const since = 0;
    const perPage = 10;
    const initialUrl = `/api/users?since=${since}&per_page=${perPage}`;
    const [users, setUsers] = useState([]);
    const [usersFilter, setUsersFilter] = useState([]);
    const [loginFilter, setLoginFilter] = useState('');
    const [previousPage, setPreviousPage] = useState('');
    const [nextPage, setNextPage] = useState('');
    const [nextPageCount, setNextPageCount] = useState(0);
    const [currentPageHistory, setCurrentPageHistory] = useState([]);
    const [usersFirstNextPage, setUsersFirstNextPage] = useState('');

    useEffect(() => {
        try {
            apiGet(initialUrl).then(
                res => {
                    if (res?.data?.response?.data) {
                        setUsers(res.data.response.data);
                        setUsersFilter(res.data.response.data);
                        setPreviousPage('');
                        setNextPage(res.data.response.partialNextPageUrl);
                        setNextPageCount(0);
                        setCurrentPageHistory([initialUrl]);
                        setUsersFirstNextPage(res.data.response.partialNextPageUrl);
                    } else {
                        console.log('Error: Response Empty!');
                        reset(true);
                    }
                }, error => {
                    console.log(error);
                    reset(true);
                }
            );
        } catch (error) {
            console.log(error);
            reset(true);
        }
    }, [initialUrl]);

    // Functions
    function filterUser(e) {
        e.preventDefault();
        if (loginFilter) {
            const filterUrl = `/api/users/${loginFilter}/details`;
            try {
                apiGet(filterUrl).then(
                    res => {
                        if (res?.data?.response?.data) {
                            const user = [];
                            user.push(res.data.response.data);
                            setUsersFilter(user);
                            setPreviousPage('');
                            setNextPage('');
                            setNextPageCount(0);
                            setCurrentPageHistory([filterUrl]);
                        } else {
                            console.log('Error: Response Empty!');
                            reset();
                        }
                    }, error => {
                        console.log(error);
                        reset();
                    }
                );
            } catch (error) {
                console.log(error);
                reset();
            }
        } else {
            setUsersFilter(users);
            setPreviousPage('');
            setNextPage(usersFirstNextPage);
            setNextPageCount(0);
            setCurrentPageHistory([initialUrl]);
        }
    }

    function goToPreviousPage() {
        const url = previousPage;
        try {
            apiGet(url).then(
                res => {
                    if (res?.data?.response?.data) {
                        setUsersFilter(res.data.response.data);
                        const previous = nextPageCount > 1 ? currentPageHistory[nextPageCount-2] : '';
                        setPreviousPage(previous);
                        setNextPage(res.data.response.partialNextPageUrl);
                        const count = nextPageCount > 0 ? nextPageCount - 1 : 0;
                        setNextPageCount(count);
                        setCurrentPageHistory(oldArray => oldArray.filter((_, index) => index !== currentPageHistory.length-1));
                    } else {
                        console.log('Error: Response Empty!');
                        reset();
                    }
                }, error => {
                    console.log(error);
                    reset();
                }
            );
        } catch (error) {
            console.log(error);
            reset();
        }
    }

    function goToNextPage() {
        const url = nextPage;
        try {
            apiGet(url).then(
                res => {
                    if (res?.data?.response?.data) {
                        setUsersFilter(res.data.response.data);
                        setPreviousPage(currentPageHistory[currentPageHistory.length-1]);
                        setNextPage(res.data.response.partialNextPageUrl);
                        setNextPageCount(nextPageCount+1);
                        setCurrentPageHistory([...currentPageHistory, url]);
                    } else {
                        console.log('Error: Response Empty!');
                        reset();
                    }
                }, error => {
                    console.log(error);
                    reset();
                }
            );
        } catch (error) {
            console.log(error);
            reset();
        }
    }

    function reset(init = false) {
        setUsersFilter([]);
        setPreviousPage('');
        setNextPage('');
        setNextPageCount(0);
        setCurrentPageHistory([]);
        if (init) {
            setUsers([]);
            setUsersFirstNextPage('');
        }
    }

    return (
        <div className='container'>
            <h1 className='highText centerText boldText'>{t('TitleText')}</h1>
            <p className='text centerText italicText'>{t('IntroText')}</p><br/>
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
            <div className='row'>
                <div className='centerDisplay'>
                    {
                        previousPage &&
                        <Button
                            type='button'
                            handleOnClick={() => goToPreviousPage()}
                        >
                            <FaArrowLeft/>&nbsp;
                            {t('Previous')}
                        </Button>
                    }
                    &nbsp;
                    {
                        nextPage &&
                        <Button
                            type='button'
                            handleOnClick={() => goToNextPage()}
                        >
                            {t('Next')}&nbsp;
                            <FaArrowRight/>
                        </Button>
                    }
                </div>
            </div>
        </div>
    );
}

// Exportation
export default Home;