import React from 'react';


import stylesTask from '../Task/style.module.css';
import Menu from '../../components/Menu';
import ActionButton from '../../components/ActionButton';
import { useHistory } from 'react-router-dom';
import TaskDetailModal from '../../components/TaskDetailModal';

const Detail: React.FC = () => {

    const history = useHistory();

    function handleBack(){
        history.push('/');
    }

    return (
        <div>
            <Menu />
            <div className={stylesTask.container}>
                <ActionButton action='Back' onClick={handleBack}></ActionButton>
                <TaskDetailModal/>
            </div>
        </div>
    );
}

export default Detail;