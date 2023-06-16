// Imports
import './Table.css';

// Component
function Table(props) {
    return (
        <table>
            <tr>
                {
                    props.headers && props.headers.length > 0 && props.headers.map((header) => (
                        <th key={header}>{header}</th>
                    ))
                }
            </tr>
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
        </table>
    );
}

// Exportation
export default Table;