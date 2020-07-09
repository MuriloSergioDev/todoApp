import React from 'react';
import NewTaskModal from '../../components/NewTaskModal';
import Menu from '../../components/Menu';
import ActionButton from '../../components/ActionButton';
import styles from './style.module.css';
import { useHistory } from 'react-router-dom';

const NewTask: React.FC = () => {
    const history = useHistory();

    function handleBack() {
        history.push('/');
    }

    return (
        <div>
            <Menu />
            <div className={styles.container}>
                <ActionButton action='Back' onClick={handleBack}></ActionButton>
                <div className={styles.containerTasks}>
                    <NewTaskModal />
                </div>
            </div>
        </div >
    );
}

export default NewTask;