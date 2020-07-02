import React from 'react';

import stylesTaskModal from '../../components/TaskModal/style.module.css';
import styles from './style.module.css';
import stylesTask from '../Task/style.module.css';
import Menu from '../../components/Menu';
import ActionButton from '../../components/ActionButton';
import { FaTrash, FaEdit, FaPlus } from 'react-icons/fa';

const Detail: React.FC = () => {
    return (
        <div>
            <Menu />
            <div className={stylesTask.container}>
                <ActionButton action='Back'></ActionButton>

                <div className={styles.containerDetail}>
                    <div className={styles.containerHeader}>
                        <h1>Task 1</h1>
                        <h1>Deadline 24/july/2020</h1>
                        <div className={styles.groupIcon}>
                            <FaEdit className={stylesTaskModal.icon}></FaEdit>
                            <FaTrash className={stylesTaskModal.icon}></FaTrash>
                        </div>
                    </div>
                    <div className={styles.containerFirst}>
                        <div className={styles.containerStatus}>
                            <h1>Status</h1>
                            <h2>Done</h2>
                        </div>
                        <div className={styles.groupDescription}>
                            <h2>Description</h2>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam minus nemo consectetur dolor, culpa iusto doloremque accusamus beatae! Mollitia aspernatur necessitatibus hic dolorem debitis dicta rem doloremque ex, molestiae aut.</p>
                        </div>

                    </div>
                    <div className={styles.containerSecond}>
                        <div className={styles.group}>
                            <h2>Checklist</h2>
                            <FaPlus className={stylesTaskModal.icon}></FaPlus>
                        </div>
                        
                        <ul>
                            <div className={styles.group}><input type="checkbox" value="Done"></input><li> Item 1</li><FaTrash className={stylesTaskModal.icon}></FaTrash></div>
                            <div className={styles.group}><input type="checkbox" value="Done"></input><li> Item 2</li><FaTrash className={stylesTaskModal.icon}></FaTrash></div>
                            <div className={styles.group}><input type="checkbox" value="Done"></input><li> Item 3</li><FaTrash className={stylesTaskModal.icon}></FaTrash></div>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Detail;