// Imports
import './Card.css';

// Component
function Card(props) {
    return (
        <div
            id={props.id}
            key={props.id}
            title={props.title}
            className='generalCard'
        >
            {props.children}
        </div>
    );
}

// Exportation
export default Card;