import React from 'react';
import styles from './style.module.css';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import { userService } from '../../services/user.service'
interface TaskInterface {
    _id: string,
    title?: string,
    status?: string,
    deadline?: string,
    description?: string,
    checklist?: Array<string>
}

interface Props {
    task: TaskInterface
}

const TaskModal: React.FC<Props> = ({ task }) => {

    const history = useHistory();

    function handleEdit() {
        history.push(`/detail/${task._id}`);
    }

    function handleDelete() {
        //const comfirmation = window.confirm('Are you shure');
        if (window.confirm('Do you really want do delete this task?')) {
            userService.deleteTaskById(task._id)
                .then(
                    response => {
                        if (response.status === 200) {
                            console.log('Task deleted');
                            history.push('/task-delete');
                        }

                    },
                    error => {
                        console.log('Fail in delete task');
                    }
                )
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.containerHeader}><h1>{task.title}</h1></div>

            <div className={styles.containerStatus}>
                <h1>Status</h1>
                <h2>{task.status}</h2>
                <h1>Deadline </h1>
                <h2>{task.deadline}</h2>
            </div>
            <div className={styles.groupIcon}>
                <FaEdit className={styles.icon} onClick={handleEdit}></FaEdit>
                <FaTrash className={styles.icon} onClick={handleDelete}></FaTrash>
            </div>
        </div>
    );
}

export default TaskModal;