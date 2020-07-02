import React from 'react';

import styles from './style.module.css';
const Menu: React.FC = () => {
  return (
      <div className={styles.menu}>
          <p>Welcome Username</p>
          <button className={styles.buttonLogout}>Log Out</button>
      </div>
  );
}

export default Menu;