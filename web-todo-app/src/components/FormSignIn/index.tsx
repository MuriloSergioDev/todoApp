import React, { FormEvent, useState, ChangeEvent } from 'react';

import UserInput from '../UserInput';
import stylesSignIn from '../../pages/SignIn/style.module.css'
import { Link, useHistory } from 'react-router-dom';
import { userService } from '../../services/user.service'
import { useDispatch } from 'react-redux';
import { actions as authActions } from '../../reducers/auth.reducer'
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
    const [isWrongEntry, setIsWrongEntry] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string>();

    async function handleUserLogin(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        userService.login(user)
            .then(
                response => {
                    if (response.status === 200) {
                        setIsWrongEntry(false);
                        setErrorMessage('');
                        dispatch(authActions.sucessLogin());
                        history.push('/');
                    } else {
                        console.log('email or password incorrect');
                        setIsWrongEntry(true);
                        setErrorMessage('Email or password incorrect')
                        dispatch(authActions.failLogin());
                    }
                },
                error => {
                    console.log(error);
                }
            )
    }

    return (
        <form action="" onSubmit={(e: FormEvent<HTMLFormElement>) => handleUserLogin(e)}>
            {isWrongEntry ?
                <div className={stylesSignIn.modalError}>{errorMessage}</div>
                : null}
            <UserInput isRed={isWrongEntry} type={'text'} placeholder="username" onChange={(event: ChangeEvent<HTMLInputElement>) => {
                const value = event.target.value;
                setUser(prevState => { return { ...prevState, username: value } });
            }}>
            </UserInput>

            <UserInput isRed={isWrongEntry} type={'password'} placeholder="password" onChange={(event: ChangeEvent<HTMLInputElement>) => {
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