import Dropdown, { TitleDropdown, DataDropdown } from '../../../elements/dropdown/dropdown';
import styles from './modalAddTodo.module.css';
import { ChevronBottom } from "../../../icons";



export const dataPriority = [
    {  title: 'Very High', level: 'very-high'},
    {  title: 'High', level: 'high' },
    {  title: 'Medium', level: 'normal'},
    {  title: 'Low', level: 'low'},
    {  title: 'Very Low', level: 'very-low'}
]


export default function DropdownTodo(props){
    const { showDropdown, priority, handleStatePriority = () => {}, setShowDropdown = () => {}} = props;
    return(
        <Dropdown>
            <TitleDropdown
                className={styles.titleDropdown}
                onClick={() => setShowDropdown(state => !state)} 
                setShowDropdown={setShowDropdown} 
                data-cy="modal-add-priority-dropdown"
            >
                { priority ?
                    <p><span className={['levelColor', priority.level].join(' ')} />{ priority.title }</p> :
                    <h1>Pilih Priority</h1>
                }
                <ChevronBottom className={showDropdown ? styles.rotateChevron : ''} />
            </TitleDropdown>
            <DataDropdown showDropdown={showDropdown} classNameCustom={styles.dataDropdown}>
                {dataPriority.map(data => (
                    <button 
                        key={data.level}
                        type="button" 
                        data-cy="modal-add-priority-item" 
                        onClick={() => handleStatePriority(data)}
                    >
                        <span className={['levelColor', data.level].join(' ')} /> 
                        <p>{ data.title }</p>
                    </button>
                ))}
            </DataDropdown>
        </Dropdown>
    )
}