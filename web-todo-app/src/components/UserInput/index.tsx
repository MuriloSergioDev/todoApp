import React from 'react';
import styles from './style.module.css';

interface Props {
    type: string,
    placeholder: string
}

const UserInput: React.FC<Props> = ({type, placeholder}) => {
    return (
        <div className={styles.fieldInput}>
            <input type={type} className={styles.input} placeholder=" "></input>
            <label className={styles.fieldLabel}>{placeholder}</label>
            <span className={styles.fieldPlaceholder}>{placeholder}</span>
        </div>
    );
}

export default UserInput;