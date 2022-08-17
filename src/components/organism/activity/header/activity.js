import styles from './activity.module.css';
import PropTypes from 'prop-types';
export default function HeaderActivity({ children}){
    return(
        <div className={styles.activity}>
            { children }
        </div>
    )
}

HeaderActivity.propTypes = {
    children: PropTypes.node,
}