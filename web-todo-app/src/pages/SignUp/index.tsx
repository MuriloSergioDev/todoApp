import React from 'react';

import UserInput from '../../components/UserInput';
import stylesHome from '../Home/style.module.css';
import { Link } from 'react-router-dom';

const SignUp: React.FC = () => {
    return (
        <div className={stylesHome.backgroundHome}>
            <div className={stylesHome.modalLogin}>
                <p>Sign Up</p>
                <UserInput type={'text'} placeholder="username"></UserInput>
                <UserInput type={'password'} placeholder="password"></UserInput>
                <UserInput type={'password'} placeholder="comfirm password"></UserInput>
                <div className={stylesHome.groupButton}>
                    <button className={stylesHome.buttonLogin} style={{ fontSize: "1.5em" }}><Link to={'/'}>BACK</Link></button>
                    <button className={stylesHome.buttonLogin} style={{ fontSize: "2.5em" }}>CREATE ACCOUNT</button>
                </div>
            </div>
        </div >
    );
}

export default SignUp;