import React, { FormEvent, useState, ChangeEvent } from 'react';

import UserInput from '../UserInput';
import stylesSignIn from '../../pages/SignIn/style.module.css'
import { Link, useHistory } from 'react-router-dom';
import { userService } from '../../services/user.service'
import { useDispatch } from 'react-redux';
import {actions as authActions} from '../../reducers/auth.reducer'
interface User {
    username: string,
    password: string
}

const FormSignIn: React.FC = () => {

    const [user, setUser] = useState<User>({
        username: '',
        password: ''
    });
    const history = useHistory();
    const dispatch = useDispatch();


    async function handleUserLogin(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log(user);
        userService.login(user)
        .then(
            response => {
                console.log(response);
                if (response.status === 200) {
                    //console.log('email and password are correct');
                    dispatch(authActions.sucessLogin());
                    history.push('/');
                } else {
                    console.log('email or password incorrect');
                    //setErrorLogin(<span className="error-login">Email or password incorrect</span>);
                    dispatch(authActions.failLogin());
                }
            },
            error =>{
                console.log(error);
            }
        )
    }

    return (
        <form action="" onSubmit={(e: FormEvent<HTMLFormElement>) => handleUserLogin(e)}>
            <UserInput type={'text'} placeholder="username" onChange={(event: ChangeEvent<HTMLInputElement>) => {
                const value = event.target.value;
                setUser(prevState => { return { ...prevState, username: value } });
            }}>
            </UserInput>

            <UserInput type={'password'} placeholder="password" onChange={(event: ChangeEvent<HTMLInputElement>) => {
                const value = event.target.value;
                setUser(prevState => { return { ...prevState, password: value } });
            }}>
            </UserInput>

            <div className={stylesSignIn.groupButton}>
                <button className={stylesSignIn.buttonLogin} style={{ fontSize: "1.5em" }}><Link to={'/signup'}>SIGN UP</Link></button>
                <button className={stylesSignIn.buttonLogin} style={{ fontSize: "2.5em" }}>SIGN IN</button>
            </div>
        </form>
    );
}

export default FormSignIn;