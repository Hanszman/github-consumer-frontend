// Imports
import './Home.css';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Api from '../../../services/Api';

// Component
function Home() {
    // Declarations
    const { t } = useTranslation();
    const [users, setUsers] = useState([]);
    const since = 0;
    const perPage = 10;

    useEffect(() => {
        Api.get(`/api/users?since=${since}&per_page=${perPage}`).then(res => {
            setUsers(res.data.response.data);
        });
    }, [])

    return (
        <div>
            <h1 className='highText centerText boldText'>{t('TitleText')}</h1>
            <p className='text centerText italicText'>{t('IntroText')}</p><br/>
            <div className='container'>
                <div className='row'>
                    {
                        users && users.length > 0 && users.map((item) => (
                            <div
                                id={item.id}
                                key={item.id}
                                title={item.login}
                            >
                                {item.login}
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