// Imports
import './Card.css';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { FaInfoCircle } from 'react-icons/fa';
import profilePic from '../../../assets/img/user_profile_pic.png';

// Component
function Card(props) {
    // Declarations
    const { t } = useTranslation();

    return (
        <div
            id={props.item.id}
            key={props.item.id}
            title={props.item.login}
            className='generalCard'
        >
            <div className='imgContainer'>
                {
                    props.item.avatar_url &&
                    <img
                        className='profilePicImg cardImg'
                        src={props.item.avatar_url}
                        alt={`${props.item.login}-Profile`}
                    />
                }
                {
                    !props.item.avatar_url &&
                    <img
                        className='profilePicImg cardImg'
                        src={profilePic}
                        alt={`${props.item.login}-Profile`}
                    />
                }
            </div>
            <div className='cardInfo'>
                <p><span className='highText boldText'>{t('Id')}:&nbsp;</span>{props.item.id}</p>
                <p><span className='highText boldText'>{t('Login')}:&nbsp;</span>{props.item.login}</p>
                <div className='centerDisplay cardButton'>
                    <Link
                        className='generalButton'
                        to={`/user/${props.item.login}`}
                    >
                        {t('Details')}&nbsp;
                        <FaInfoCircle/>
                    </Link>
                </div>
            </div>
        </div>
    );
}

// Exportation
export default Card;