import Modal from "../../../elements/modal";
import styles from "./modalAddTodo.module.css";
import { useState, useEffect } from 'react';
import { editTodoActivity } from "../../../../action/todo";
import DropdownTodo from "./dropdownTodo";
import ModalHeader from "./modalHeader";
import ModalFooter from "./modalFooter";
import { dataPriority } from "./dropdownTodo";
export default function ModalEditTodo({ todo, getAllTodo, showModal, setShowModal}){
    const [modelTodo, setModelTodo] = useState(todo);
    const [showDropdown, setShowDropdown] = useState(false);
    const [priority, setPriority] = useState(false);

    const handleStatePriority = (data) => {
        setPriority(data);
        setShowDropdown(false);
    }
    const handleChangeTitleTodo = (e) => {
        setModelTodo({...modelTodo, title : e.target.value})
    }
    const handleEditTodoActivity = async () => {
        if(modelTodo.title !== ''){
            const response = await editTodoActivity({...modelTodo, priority: priority ?  priority.level : 'very-high'});
            if(!response.error){
                getAllTodo();
                setShowModal(false);
            }
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        handleEditTodoActivity();
    }
    useEffect(() => {
        setModelTodo(todo)
        const selectPriority = dataPriority.filter(data => {
            if(data.level === todo.priority){
                return { title: data.title, level: data.priority }
            }
        
        });
        setPriority(selectPriority[0])
    }, [todo])
    return(
        <Modal classNameModal={styles.modal} showModal={showModal} setShowModal={setShowModal}>
            <ModalHeader setShowModal={setShowModal} />
            <section className={styles.modalBody}>
                <form onSubmit={handleSubmit}>
                    <label data-cy="modal-add-name-title">NAMA LIST ITEM</label>
                    <input 
                        onChange={handleChangeTitleTodo}
                        type="text" 
                        value={modelTodo?.title}
                        placeholder="Tambahkan name list item" 
                        data-cy="modal-name-add-input" 
                        required
                    />
                    <label htmlFor="priority" data-cy="modal-add-priority-title">PRIORITY</label>
                    <DropdownTodo 
                        priority={priority} 
                        handleStatePriority={handleStatePriority} 
                        showDropdown={showDropdown}
                        setShowDropdown={setShowDropdown}
                    />
                </form>
            </section>
            <ModalFooter handleFor={handleEditTodoActivity} edit={true} />
        </Modal>
    )
}