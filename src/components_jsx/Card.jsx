import { Link } from 'react-router-dom';
import '../components_Scss/Card.scss'
export default function Card(props)
{
    return(
        <div className="card">
            <div className="cardLogo"></div>
            <div className='cardTitle'>{props.cardTitle}</div>
            <div className='cardDescription'>{props.cardDescription}</div>
            <Link to={props.cardLink}>{props.cardUrlName}</Link>
        </div>
    );
}