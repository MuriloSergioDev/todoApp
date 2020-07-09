import React, { ChangeEvent, useState, FormEvent } from 'react';
import styles from './style.module.css';
import UserInput from '../UserInput';
import ActionButton from '../ActionButton';
import { useHistory } from 'react-router-dom';
import { userService } from '../../services/user.service'

interface NewTaskInterface {
    title?: string,
    status?: string,
    deadline?: string,
    description?: string,
    checklist?: Array<string>
}

const NewTaskModal: React.FC = () => {

    const [newTask, setNewTask] = useState<NewTaskInterface>({});
    const history = useHistory();

    function handleCreateNewTask(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log(newTask);

        userService.createNewTask(newTask)
            .then(
                response=>{
                    if (response.status === 201) {
                        console.log('Created Task');
                    } else {
                        console.log('Fail in creating task');
                    }
                    history.push('/');
                },
                error=>{
                    console.log('requisition failed');
                }
            )
    }

    return (
        <div className={styles.container}>
            <div className={styles.containerHeader}>
                <h1>New task</h1>
            </div>

            <form className={styles.containerInput} onSubmit={(e: FormEvent<HTMLFormElement>) => handleCreateNewTask(e)}>
                <UserInput type="text" placeholder="title" onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    const value = event.target.value;
                    setNewTask(prevState => { return { ...prevState, title: value } });
                }} />
                <UserInput type="list" placeholder="status" onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                    const value = event.target.value;
                    setNewTask(prevState => { return { ...prevState, status: value } });
                }} />
                <UserInput type="date" placeholder="deadline" onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    const value = event.target.value;
                    setNewTask(prevState => { return { ...prevState, deadline: value } });
                }} />
                <UserInput type="text" placeholder="description" onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    const value = event.target.value;
                    setNewTask(prevState => { return { ...prevState, description: value } });
                }} />

                <ActionButton action='Comfirm' onClick={()=>{}}></ActionButton>
            </form>
        </div>
    );
}

export default NewTaskModal;