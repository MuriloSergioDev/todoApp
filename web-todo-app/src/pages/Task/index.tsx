import React from 'react';
import styles from './style.module.css';
import Menu from '../../components/Menu';
import ActionButton from '../../components/ActionButton';
import TaskModal from '../../components/TaskModal';

const Task: React.FC = () => {
    return (
        <div>
            <Menu />
            <div className={styles.container}>
                <ActionButton action='Create New Task'></ActionButton>
                <div className={styles.containerTasks}>
                    <TaskModal></TaskModal>
                    <TaskModal></TaskModal>
                    <TaskModal></TaskModal>
                    <TaskModal></TaskModal>
                    <TaskModal></TaskModal>
                    <TaskModal></TaskModal>
                    <TaskModal></TaskModal>
                </div>
            </div>
        </div>
    );
}

export default Task;