// Imports
import './Table.css';
import { useTranslation } from 'react-i18next';

// Component
function Table(props) {
    // Declarations
    const { t } = useTranslation();

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        {
                            props.headers && props.headers.length > 0 && props.headers.map((header) => (
                                <th key={header}>{header}</th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        props.rows && props.rows.length > 0 && props.rows.map((row) => (
                            <tr
                                id={row.id}
                                key={row.id}
                                title={row.name}
                            >
                                {
                                    props.data && props.data.length > 0 && props.data.map((data) => (
                                        <td key={data.name}>
                                            {
                                                data.type !== 'link' &&
                                                row[data.name]
                                            }
                                            {
                                                data.type === 'link' &&
                                                <a href={row[data.name]} target='_blank' rel="noreferrer">
                                                    {row[data.name]}
                                                </a>
                                            }
                                        </td>
                                    ))
                                }
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            {
                (!props.rows || props.rows.length <= 0) &&
                <p>{t('NoData')}</p>
            }
        </div>
    );
}

// Exportation
export default Table;