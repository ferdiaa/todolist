import { TrashIcon } from "../../../icons";
import styles from './cardActivity.module.css';
import PropTypes from 'prop-types';
import convertDate from "../../../../utils/convertDate";
import { useNavigate } from 'react-router-dom';
export default function CardActivity(props){
    const { title, createdAt, index, id, findActivity } = props;
    const showCreatedAt = convertDate(createdAt);
    let navigate = useNavigate();

    const handleToRedirect = () => {
        navigate(`/activity/${id}`)
    }
    return(
        <div className={styles.cardActivity} key={index} data-cy='activity-item'>
            <div className={styles.bodyActivity} onClick={handleToRedirect}>
                <h2 className={styles.activityTitle} data-cy="activity-item-title">
                    { title } 
                </h2>
            </div>
            <div className={styles.activityDetail}>
                <p data-cy="activity-item-date">{ showCreatedAt } </p>
                <TrashIcon onClick={() => findActivity(id)} data-cy="activity-item-delete-button" />
            </div>
        </div>
    )
}

CardActivity.propTypes = {
    title: PropTypes.string,
    createdAt:PropTypes.string,
    findActivity:PropTypes.func,
    index: PropTypes.number,
    id: PropTypes.number
}