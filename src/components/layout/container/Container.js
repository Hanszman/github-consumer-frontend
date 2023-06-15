// Imports
import './Container.css';

// Component
function Container(props) {
    return (
        <div className='containerDisplay'>
            {props.children}
        </div>
    );
}

// Exportation
export default Container;