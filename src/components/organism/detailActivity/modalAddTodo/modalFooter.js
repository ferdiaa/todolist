import Button from "../../../elements/button";
import styles from './modalAddTodo.module.css';
export default function ModalFooter({ handleFor, edit }){
    return(
        <section className={styles.modalFooter}>
            <Button 
                background="primary" 
                datacy="modal-add-save-button"
                onClick={handleFor}
            >
                { edit ? 'Simpan' : 'Tambah'}
            </Button>
        </section>
    )
}