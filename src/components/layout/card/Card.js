// Imports
import './Card.css';
import { useTranslation } from 'react-i18next';
import Button from '../../layout/form/button/Button';
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
            title={props.item.title}
            className='generalCard'
        >
            <div className='imgContainer'>
                {
                    props.item.avatar_url &&
                    <img
                        className='profilePicImg'
                        src={props.item.avatar_url}
                        alt={`${props.item.login}-Profile`}
                    />
                }
                {
                    !props.item.avatar_url &&
                    <img
                        className='profilePicImg'
                        src={profilePic}
                        alt={`${props.item.login}-Profile`}
                    />
                }
            </div>
            <div className='cardInfo'>
                <p><span className='highText boldText'>{t('Id')}</span>: {props.item.id}</p>
                <p><span className='highText boldText'>{t('Login')}</span>: {props.item.login}</p>
                <p><span className='highText boldText'>{t('Name')}</span>: {props.item.name ? props.item.name : '-'}</p>
                <div className='centerDisplay cardButton'>
                    <Button
                        type='button'
                        handleOnClick={() => console.log(props.item.login)}
                    >
                        {t('Details')}&nbsp;
                        <FaInfoCircle/>
                    </Button>
                </div>
            </div>
        </div>
    );
}

// Exportation
export default Card;