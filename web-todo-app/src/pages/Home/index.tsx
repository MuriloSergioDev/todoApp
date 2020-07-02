import React from 'react';
import UserInput from '../../components/UserInput';
import styles from './style.module.css';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
    return (
        <div className={styles.backgroundHome}>
            <div className={styles.modalLogin}>
                <p>Sign In</p>
                <UserInput type={'text'} placeholder="username"></UserInput>
                <UserInput type={'password'} placeholder="password"></UserInput>
                <div className={styles.groupButton}>
                    <button className={styles.buttonLogin} style={{fontSize: "1.5em"}}><Link to={'/signup'}>SIGN UP</Link></button>
                    <button className={styles.buttonLogin} style={{fontSize: "2.5em"}}>SIGN IN</button>
                </div>
            </div>
        </div >
    );
}

export default Home;