import HeaderActivity from '../../activity/header/activity';
import Button from '../../../elements/button';
import { ChevronLeft, Pencil, PlusIcon, SortIcon } from '../../../icons';
import { editActivity } from '../../../../action/activity';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Dropdown, { TitleDropdown, DataDropdown } from '../../../elements/dropdown/dropdown';
import { SortNew, SortAZ, SortOld, SortUnfinished, SortZA } from '../../../icons';

export const ListToSort = [
    { title: 'Terbaru', Icon: SortNew },
    { title: 'Terlama', Icon: SortOld },
    { title: 'A-Z', Icon: SortAZ },
    { title: 'Z-A', Icon: SortZA },
    { title: 'Belum Selesai', Icon: SortUnfinished }
]

export default function Header(props){
    const { activity, setActivity, setShowModal, styles, titleActivity, setTitleActivity, setFilter} = props;

    const [editTitleActivity, setEditTitleActivity] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const backToHome = () => window.history.back();

    const validateAndEditTitleActivite = async() => {
        if(titleActivity !== activity.title){
            const response = await editActivity({ id:activity.id, title:titleActivity });
            setActivity({...activity, title: response.title});
        }
    }
    const handleEditStateTitleActivity = (e) => {
        setTitleActivity(e.target.value);            
    }
    const handleBlur = () => {
        validateAndEditTitleActivite();
        setEditTitleActivity(false);
    }
    return(
        <HeaderActivity>
                <div className={styles.activityAction}>
                    <button data-cy="todo-back-button" onClick={() => backToHome()} type="button">
                        <ChevronLeft />
                    </button>
                    { editTitleActivity ? 
                        <input 
                            type="text" 
                            value={titleActivity} 
                            onChange={handleEditStateTitleActivity}
                            onBlur={handleBlur}
                            autoFocus={true}
                         /> : 
                        <h1 data-cy="todo-title" onClick={() => setEditTitleActivity(state => !state)}>{titleActivity}</h1>
                    }
                    <button data-cy="todo-title-edit-button" onClick={() => setEditTitleActivity(state => !state)}>
                        <Pencil  />
                    </button>
                </div>
                <div className={styles.filter}>
                    <Dropdown classnamecustom={styles.dropdown}>
                        <button 
                            onClick={() => setShowDropdown(state => !state)} 
                            data-cy="todo-sort-button"
                            className={styles.titleDropdown}
                            setShowDropdown={setShowDropdown}
                        >
                            <SortIcon />
                        </button>
                        <DataDropdown showDropdown={showDropdown} classNameCustom={styles.dataDropdown}>
                            {ListToSort.map((list, index) => (
                                <button 
                                    key={list.title}
                                    type="button" 
                                    data-index={index}
                                    data-cy="sort-selection"
                                    onClick={() => setFilter(list.title)}
                                >
                                    <list.Icon />
                                    <p data-cy="sort-selection-title">{ list.title } </p>
                                </button>
                            ))}
                        </DataDropdown>
                    </Dropdown>
                    <Button datacy="todo-add-button" background="primary" onClick={() => setShowModal(true)}>
                        <PlusIcon />
                        Tambah
                    </Button>
                </div>
        </HeaderActivity>
    )
}

Header.propTypes = {
    activity: PropTypes.object,
    setActivity:PropTypes.func,
    setShowModal:PropTypes.func,
    styles:PropTypes.object,
    titleActivity:PropTypes.string,
    setTitleActivity:PropTypes.func,
    setFilter:PropTypes.func,
}