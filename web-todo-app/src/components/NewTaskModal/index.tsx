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
    const [isWrongEntry, setIsWrongEntry] = useState(false);
    const [errorMessages, setErrorMessages] = useState<string[]>([]);
    const history = useHistory();

    function handleCreateNewTask(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const newErrors: string[] = [];
        userService.createNewTask(newTask)
            .then(
                response => {
                    if (response.data.errors) {
                        if (response.data.errors.title && response.data.errors.title.properties.message)
                            newErrors?.push(response.data.errors.title.properties.message);

                        if (response.data.errors.status && response.data.errors.status.properties.message)
                            newErrors?.push(response.data.errors.status.properties.message);

                        if (response.data.errors.deadline && response.data.errors.deadline.properties.message)
                            newErrors?.push(response.data.errors.deadline.properties.message);

                        setErrorMessages(newErrors);
                        setIsWrongEntry(true);
                    } else {
                        setErrorMessages(newErrors);
                        setIsWrongEntry(false);
                    }

                    if (response.status === 201) {
                        console.log('Created Task');
                        history.push('/');
                    } else {
                        console.log('Fail in creating task');
                    }
                },
                error => {
                    console.log('requisition failed');
                }
            )
    }

    return (
        <div className={styles.container}>
            <div className={styles.containerHeader}>
                <h1>New task</h1>
            </div>
            {errorMessages?.map((message, index) => {
                return <div className={styles.modalError} key={index}>{message}</div>
            })}
            <form className={styles.containerInput} onSubmit={(e: FormEvent<HTMLFormElement>) => handleCreateNewTask(e)}>
                <UserInput isRed={isWrongEntry} type="text" placeholder="title" onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    const value = event.target.value;
                    setNewTask(prevState => { return { ...prevState, title: value } });
                }} />
                <UserInput isRed={isWrongEntry} type="new list" placeholder="status" initialValue={""} onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                    const value = event.target.value;
                    setNewTask(prevState => { return { ...prevState, status: value } });
                }} />
                <UserInput isRed={isWrongEntry} type="date" placeholder="deadline" onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    const value = event.target.value;
                    setNewTask(prevState => { return { ...prevState, deadline: value } });
                }} />
                <UserInput type="text" placeholder="description" onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    const value = event.target.value;
                    setNewTask(prevState => { return { ...prevState, description: value } });
                }} />

                <ActionButton action='Comfirm' onClick={() => { }}></ActionButton>
            </form>
        </div>
    );
}

export default NewTaskModal;