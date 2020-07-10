import React from 'react';

import styles from './style.module.css';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {actions as authActions} from '../../reducers/auth.reducer';
import { FaSignOutAlt } from 'react-icons/fa';
const Menu: React.FC = () => {

  const dispatch = useDispatch();
  const history = useHistory();

  function handleUserLogout() {
    dispatch(authActions.setLogout());
    localStorage.clear();
    history.push('/');
    console.log('Voce foi deslogado');
  }

  

  return (
    <div className={styles.menu}>
      <p>Welcome {localStorage.getItem('username')}</p>
      
      
      <button className={styles.buttonLogout} onClick={handleUserLogout}><p>Log Out</p> <FaSignOutAlt className={styles.icon}></FaSignOutAlt></button>
    </div>
  );
}

export default Menu;