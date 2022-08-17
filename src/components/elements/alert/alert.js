import styles from './alert.module.css';
import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';
import styleBackground from '../modal/modal.module.css';
import { WarningCircle } from '../../icons';
export default function Alert({ showAlert, setShowAlert = () => {} }){    
    const alertRef = useRef();
    useEffect(() => {
        window.addEventListener('click', (e) => {
            if(e.target === alertRef.current){
                setShowAlert(false);
            }
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showAlert])
    return(
        showAlert ? 
            <div className={styleBackground.modalBackground} ref={alertRef}>
                <div className={styles.alert} data-cy="modal-information">
                    <WarningCircle />
                    <p data-cy="modal-information-title">Activity Berhasil Dihapus</p>
                </div>
            </div> : null
    )
}
Alert.propTypes = {
    children: PropTypes.node,
    datacy: PropTypes.string,
    showAlert: PropTypes.bool,
    setShowAlert:PropTypes.func
}