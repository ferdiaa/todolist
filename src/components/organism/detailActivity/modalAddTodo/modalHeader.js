import styles from './modalAddTodo.module.css';
import {  DeleteIcon } from "../../../icons";

export default function ModalHeader({ setShowModal }){
    return(
        <section className={styles.modalHeader}>
                <h1 data-cy="modal-add-title">Tambah List Item</h1>
                <button data-cy="modal-add-close-button" onClick={() => setShowModal(false)} >
                    <DeleteIcon />
                </button>
        </section>
    )
}