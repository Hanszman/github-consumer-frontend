// Imports
import './Navbar.css';
import { Link } from 'react-router-dom';
import gitLogo from '../../../assets/img/git_logo.png';
import Translation from '../translation/Translation';

// Component
function Navbar() {
    return (
        <header className='header'>
            <nav className='navbar'>
                <Link to='/'>
                    <img
                        className='imgLogo'
                        alt='Logo Git'
                        src={gitLogo}
                    />
                </Link>
                <Translation/>
            </nav>
        </header>
    );
}

// Exportation
export default Navbar;