import React from 'react';
import styles from './style.module.css';
import { FaArrowLeft, FaPlus } from 'react-icons/fa'

interface Props {
    action: string
}

const ActionButton: React.FC<Props> = ({ action }) => {

    let Icon = null;

    switch (action) {
        case 'Back':
            Icon = <FaArrowLeft></FaArrowLeft>
            break;

        case 'Create New Task':
            Icon = <FaPlus></FaPlus>
            break;
        default:
            break;
    }

    return (
        <div className={styles.groupButton} onClick={()=>{console.log('olha')}}>
            {Icon}
            <button className={styles.button}><p>{action}</p></button>
        </div>
    );
}

export default ActionButton;