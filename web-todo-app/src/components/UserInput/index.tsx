import React, { ChangeEvent } from 'react';
import styles from './style.module.css';

interface Props {
    type: string,
    placeholder?: string,
    onChange: Function,
    initialValue?: string,
    isRed?: boolean   
}

const UserInput: React.FC<Props> = ({ type, placeholder, onChange, initialValue, isRed }) => {

    let input = <div></div>;

    switch (type) {
        case 'text':
            input = <input
                type={type} className={styles.input} placeholder=" " value={initialValue}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    onChange(event);
                }}
            ></input>;
            break;
        case 'password':
            input = <input
                type={type} className={styles.input} placeholder=" "
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    onChange(event);
                }}
            ></input>;
            break;
        case 'list':
            input =
                <select id="status" className={styles.select} value={initialValue} onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                    onChange(event);
                }}>
                    <option value="" disabled >Choose Status</option>
                    <option value="Undone">Undone</option>
                    <option value="Done">Done</option>
                    <option value="Doing" >Doing</option>
                    <option value="Paused">Paused</option>
                </select>
            break;

        case 'new list':
            input =
                <select id="status" className={styles.select} defaultValue={initialValue} onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                    onChange(event);
                }}>
                    <option value="" disabled >Choose Status</option>
                    <option value="Undone">Undone</option>
                    <option value="Done">Done</option>
                    <option value="Doing" >Doing</option>
                    <option value="Paused">Paused</option>
                </select>
            break;

        case 'date':
            input = <input
                type={type} className={styles.input} placeholder=" " value={initialValue}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    onChange(event);
                }}
            ></input>;
            break;
        default:
            break;
    }

    return (
        <div className={ isRed ? styles.fieldInputError :styles.fieldInput}>
            {input}
            <label className={styles.fieldLabel}>{placeholder}</label>
            <span className={styles.fieldPlaceholder}>{placeholder}</span>
        </div>
    );
}

export default UserInput;