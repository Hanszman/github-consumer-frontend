// Imports
import './Navbar.css';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import gitLogo from '../../../assets/img/git_logo.png';
import Translation from '../translation/Translation';

// Component
function Navbar() {
    // Declarations
    const { t } = useTranslation();

    return (
        <header className='header'>
            <nav className='navbar'>
                <Link
                    title={t('Home')}
                    to='/'
                >
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