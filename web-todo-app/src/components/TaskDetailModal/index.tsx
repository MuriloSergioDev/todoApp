import React, { useState, useEffect, ChangeEvent } from 'react';

import styles from './style.module.css';
import { FaTrash, FaPlus } from 'react-icons/fa';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import api from '../../services/api';
import { userService } from '../../services/user.service'
import ActionButton from '../ActionButton';
import UserInput from '../UserInput';

interface TaskInterface {
    title?: string,
    status?: string,
    deadline?: string,
    description?: string,
    checklist?: Array<string>
}

const TaskDetailModal: React.FC = () => {

    const [task, setTask] = useState<TaskInterface>({ title:'', status:'', deadline:'', description:'', checklist:[]});
    // { title:'', status:'', deadline:'', description:'', checklist:[]}
    const history = useHistory();

    const { id } = useParams();

    function handleUpdate() {
        userService.updateTaskById(id, task)
            .then(
                response => {
                    if (response.status === 200) {
                        console.log('Task updated');
                        history.push('/task-update');
                    }
                },
                error => {
                    console.log('Fail in update task');
                }

            )
    }

    function handleDelete() {
        //const comfirmation = window.confirm('Are you shure');
        if (window.confirm('Do you really want do delete this task?')) {
            userService.deleteTaskById(id)
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

    function handleListAddItem() {
        let newItem = window.prompt('Add new Task');

        if (newItem != null) {
            const list = task?.checklist;
            list?.push(newItem);
            setTask(prevState => { return { ...prevState, checklist: list } })
        }
    }

    function handleListRemoveItem(data: string) {
        const list = task?.checklist;
        if (list !== null && list !== undefined) {
            list.splice(list?.indexOf(data), 1);
            console.log(list);
            setTask(prevState => { return { ...prevState, checklist: list } })
        }
    }

    useEffect(() => {
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        try {
            api.get(`task/task/${id}`, {
                cancelToken: source.token
            }).then(
                response => {
                    //console.log(response);
                    setTask(response.data);
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
    }, [id])

    return (
        <div className={styles.containerDetail}>
            <div className={styles.containerHeader}>
                <h1>{task?.title}</h1>
                <h1>Deadline <p>{task?.deadline}</p></h1>
                <div className={styles.groupIcon}>
                    <FaTrash className={styles.icon} onClick={handleDelete}></FaTrash>
                </div>
            </div>
            <div className={styles.containerFirst}>
                <div className={styles.containerStatus}>
                    <h2>Status</h2>
                    {/* <h2>{task?.status}</h2> */}
                    <UserInput type="list" placeholder="status" initialValue={task.status} onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                        const value = event.target.value;
                        setTask(prevState => { return { ...prevState, status: value } });
                    }} />
                </div>

                <div className={styles.groupDescription}>
                    <h2>Title</h2>
                    {/* <p>{task?.deadline}</p> */}
                    <UserInput type="text" placeholder="Title" initialValue={task.title} onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        const value = event.target.value;
                        setTask(prevState => { return { ...prevState, title: value } });
                    }} />
                </div>

                <div className={styles.groupDescription}>
                    <h2>Description</h2>
                    {/* <p>{task?.description}</p> */}
                    <UserInput type="text" placeholder="Description" initialValue={task.description} onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        const value = event.target.value;
                        setTask(prevState => { return { ...prevState, description: value } });
                    }} />
                </div>

                <div className={styles.groupDescription}>
                    <h2>Deadline</h2>
                    {/* <p>{task?.deadline}</p> */}
                    <UserInput type="date" placeholder="Deadline" initialValue={task.deadline} onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        const value = event.target.value;
                        setTask(prevState => { return { ...prevState, deadline: value } });
                    }} />
                </div>

            </div>
            <div className={styles.containerSecond}>
                <div className={styles.group}>
                    <h2>Checklist</h2>
                    <FaPlus className={styles.icon} onClick={handleListAddItem}></FaPlus>
                </div>

                <ul>
                    {
                        task?.checklist?.map((data, index) => {
                            return <div className={styles.group} key={index}><input type="checkbox" value="Done"></input><li> {data}</li><FaTrash className={styles.icon} onClick={() => { handleListRemoveItem(data) }}></FaTrash></div>
                        })
                    }
                </ul>
            </div>
            <ActionButton action='Comfirm' onClick={handleUpdate}></ActionButton>
        </div>
    );
}

export default TaskDetailModal;