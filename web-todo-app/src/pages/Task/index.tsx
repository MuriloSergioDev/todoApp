import React, { useEffect, useState } from 'react';
import styles from './style.module.css';
import Menu from '../../components/Menu';
import ActionButton from '../../components/ActionButton';
import TaskModal from '../../components/TaskModal';
import api from '../../services/api';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

interface TaskInterface {
    _id: string,
    title?: string,
    status?: string,
    deadline?: string,
    description?: string,
    checklist?: Array<string>
}

const Task: React.FC = () => {

    const [tasks, setTasks] = useState<TaskInterface[]>();
    const history = useHistory();


    function handleCreateNewTask() {
        history.push('/new-task');
    }

    useEffect(() => {
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        try {
            api.get(`task/tasks/${localStorage.getItem('userId')}`, {
                cancelToken: source.token
            }).then(
                response => {
                    //console.log(response);
                    setTasks(response.data);
                },
                error => {
                    console.log(error);
                }
            );
        } catch (error) {

        }
        return () => {
            source.cancel('Operation canceled by the user.');
        };
    }, [])

    return (
        <div>
            <Menu />
            <div className={styles.container}>
                <ActionButton action='Create New Task' onClick={handleCreateNewTask}></ActionButton>
                <div className={styles.containerTasks}>
                    {
                        tasks != null ?
                            tasks.map((task: TaskInterface, index: number) => {
                                return <TaskModal key={task._id} task={task}></TaskModal>
                            })
                            : <div>Carregando ...</div>
                    }
                </div>
            </div>
        </div>
    );
}

export default Task;