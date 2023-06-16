// Imports
import './Repositories.css';
import Api from '../../../services/Api';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Table from '../../layout/table/Table';

// Component
function Repositories(props) {
    // Declarations
    const { t } = useTranslation();
    const headers = [`${t('Id')}`, `${t('Name')}`, `${t('ReposURL')}`];
    const data = [
        { name: 'id', type: 'text' },
        { name: 'name', type: 'text' },
        { name: 'html_url', type: 'link' }
    ];
    const [repos, setRepos] = useState([]);

    useEffect(() => {
        try {
            Api.get(`/api/users/${props.username}/repos`).then(
                res => {
                    console.log(res);
                    if (res?.data?.response?.data) {
                        setRepos(res.data.response.data);
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
        <div className='centerDisplay'>
            <Table
                headers={headers}
                data={data}
                rows={repos}
            ></Table>
        </div>
    );
}

// Exportation
export default Repositories;