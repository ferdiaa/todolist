import Modal from '../../../elements/modal';
import { WarningIcon } from '../../../icons';
import Button from '../../../elements/button';
import styles from './modalDelete.module.css';
import PropTypes from 'prop-types';
import { memo } from 'react';
const ModalDelete = ({ dataToDelete, handleDelete, heading = "activity", showModal, setShowModal = () => {} }) => {
    return(
        <Modal 
            classNameModal={styles.modal} 
            showModal={showModal} 
            setShowModal={setShowModal} 
            datacy="modal-delete"
        >
            <WarningIcon data-cy="modal-delete-icon"/>
            <h1 data-cy="modal-delete-title">
                Apakah anda yakin ingin menghapus {heading} 
                <span> "{dataToDelete?.title}"?</span> 
            </h1>
            <div className={styles.actionActivity}>
                <Button
                    background="disabled"
                    datacy="modal-delete-cancel-button"
                    onClick={() => setShowModal(false)}
                >
                    Batal
                </Button>
                <Button 
                    background="pink"
                    datacy="modal-delete-confirm-button"
                    onClick={() => handleDelete(dataToDelete?.id)}
                >
                    Hapus
                </Button>
            </div>
        </Modal>
    )
}
export default  memo(ModalDelete);
Modal.propTypes = {
    activity:PropTypes.object,
    handleDelete:PropTypes.func,
    showModal: PropTypes.bool,
    setShowModal:PropTypes.func,
    heading:PropTypes.string,
}