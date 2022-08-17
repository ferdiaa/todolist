import styles from './dropdown.module.css';
import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';


export function TitleDropdown(props){
    const titleRef = useRef();
    useEffect(() => {
        // window.addEventListener('click', (e) => {
        //     if(e.target !== titleRef.current){
        //         props.setShowDropdown(false);
        //     }
        // })
    }, [])
    return(
        <div {...props} ref={titleRef}>
            { props.children }
        </div>
    )
}
export function DataDropdown (props){
    const { children, showDropdown, classNameCustom } = props;
    return(
        <div className={[showDropdown ? styles.dataActive : '', styles.data, classNameCustom].join(' ')}>
            { children }
        </div>
    )
}

export default function Dropdown(props){
    const { classnamecustom, children } = props;
    return(
        <div className={[styles.dropdown, classnamecustom].join(' ')} {...props}>
            { children }
        </div>
    )
}
TitleDropdown.propTypes = {
    children:PropTypes.node,
}
DataDropdown.propTypes = {
    children:PropTypes.node,
}
Dropdown.propTypes = {
    classNameCustom:PropTypes.string,
    children: PropTypes.node
}