import React from 'react';
import styles from './style.module.css';
import { FaArrowLeft, FaPlus, FaArrowRight } from 'react-icons/fa'

interface Props {
    action: string,
    onClick: Function
}

const ActionButton: React.FC<Props> = ({ action, onClick }) => {

    let Icon = null;
    let button = null;

    switch (action) {
        case 'Back':
            Icon = <FaArrowLeft></FaArrowLeft>
            button = <div className={styles.groupButton} onClick={() => { onClick() }}>
                {Icon}
                <button className={styles.button}><p>{action}</p></button>
            </div>
            break;

        case 'Comfirm':
            Icon = <FaArrowRight></FaArrowRight>
            button = <div className={styles.groupButton} onClick={() => { onClick() }}>
                <button className={styles.buttonComfirm}><p>{action}</p></button>
                {Icon}
            </div>
            break;

        case 'Create New Task':
            Icon = <FaPlus></FaPlus>
            button = <div className={styles.groupButton} onClick={() => { onClick() }}>
                {Icon}
                <button className={styles.button}><p>{action}</p></button>
            </div>
            break;
        default:
            break;
    }

    return (
        <>
            {button}
        </>
    );
}

export default ActionButton;