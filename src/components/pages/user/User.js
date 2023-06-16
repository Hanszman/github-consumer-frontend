// Imports
import './User.css';
import { useParams } from 'react-router-dom';
import Repositories from '../repositories/Repositories';

// Component
function User() {
    // Declarations
    const { username } = useParams();
    return (
        <div>
            {username}
        </div>
    );
}

// Exportation
export default User;