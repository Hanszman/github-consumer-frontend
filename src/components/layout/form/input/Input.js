// Imports
import './Input.css';

// Component
function Input(props) {
    return (
        <div className='formInput'>
            <label htmlFor={props.name}>{props.text}:</label>
            <br/>
            <input
                id={props.name}
                name={props.name}
                type={props.type}
                placeholder={props.placeholder}
                onChange={props.handleOnChange}
            />
        </div>
    );
}

// Exportation
export default Input;