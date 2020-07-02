import React from 'react';
import styles from './style.module.css';
import { FaTrash, FaEdit } from 'react-icons/fa';

const TaskModal: React.FC = () => {
    return (
        <div className={styles.container}>
            <div className={styles.containerHeader}><h1>Task 1</h1></div>

            <div className={styles.containerStatus}>
                <h1>Status</h1>
                <h2>Done</h2>
                <h1>Deadline 24/july/2020</h1>
            </div>
            <div className={styles.groupIcon}>
                <FaEdit className={styles.icon}></FaEdit>
                <FaTrash className={styles.icon}></FaTrash>
            </div>
        </div>
    );
}

export default TaskModal;