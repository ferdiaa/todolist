import styles from './modal.module.css';
import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';
export default function Modal({ children, classNameModal, datacy, showModal, setShowModal = () => {} }){    
    const modalRef = useRef();

    useEffect(() => {
        window.addEventListener('click', (e) => {
            if(e.target === modalRef.current){
                setShowModal(false);
            }
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showModal])
    return(
        showModal ? 
            <div className={styles.modalBackground} ref={modalRef}>
                <div className={[styles.modal, classNameModal].join(' ')} data-cy={datacy}>
                    { children }
                </div>
            </div> : null
    )
}
Modal.propTypes = {
    children: PropTypes.node,
    datacy: PropTypes.string,
    showModal: PropTypes.bool,
    setShowModal:PropTypes.func
}