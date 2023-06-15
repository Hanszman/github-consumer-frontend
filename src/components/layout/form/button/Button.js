// Imports
import './Button.css';

// Component
function Button(props) {
    return (
        <button
            type={props.type}
            className='formButton'
            onClick={props.handleOnClick}
        >
            {props.children}
        </button>
    );
}

// Exportation
export default Button;