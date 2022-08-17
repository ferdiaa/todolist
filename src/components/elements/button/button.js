import styles from './button.module.css';
import PropTypes from 'prop-types';
export default function Button({ background, className, children, datacy, disabled = false, onClick = () => {} }){
    const newClassName = [styles.button, styles[background], className].join(' ');
    return(
        <button className={newClassName} onClick={onClick} data-cy={datacy} disabled={disabled}>
            { children }
        </button>
    )
}
Button.propTypes = {
    className: PropTypes.string,
    background: PropTypes.string,
    children:PropTypes.node,
    datacy:PropTypes.string,
    onClick: PropTypes.func
}