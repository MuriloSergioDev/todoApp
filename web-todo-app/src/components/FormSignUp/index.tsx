import React, { useState, ChangeEvent, FormEvent } from 'react';
import UserInput from '../UserInput';
import stylesSignIn from '../../pages/SignIn/style.module.css'
import { Link, useHistory } from 'react-router-dom';
import { userService } from '../../services/user.service';

interface User {
    username: string,
    password: string,
    comfirmPassword: string
}

const FormSignUp: React.FC = () => {

    const [user, setUser] = useState<User>({
        username: '',
        password: '',
        comfirmPassword: ''
    });

    const history = useHistory();


    async function handleUserSignUp(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log(user);
        userService.register(user)
                .then(
                    response => {
                        //console.log('requisição sucesso');
                        //console.log(response);

                        if (response.status === 201) {
                            //console.log('email and password are correct');
                            console.log('Sucess Register');

                        } else {
                            //console.log('email or password incorrect');
                            //setErrorLogin(<span className="error-login">Email or password incorrect</span>);
                            console.log('Fail Register');
                        }
                        history.push('/');
                    },
                    error => {
                        console.log('requisition failed');
                    }
                );
    }

    return (
        <form action="" onSubmit={(e: FormEvent<HTMLFormElement>) => handleUserSignUp(e)}>
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
            <UserInput type={'password'} placeholder="comfirm password" onChange={(event: ChangeEvent<HTMLInputElement>) => {
                const value = event.target.value;
                setUser(prevState => { return { ...prevState, comfirmPassword: value } });
            }}>
            </UserInput>

            <div className={stylesSignIn.groupButton}>
                <button className={stylesSignIn.buttonLogin} style={{ fontSize: "1.5em" }}><Link to={'/'}>BACK</Link></button>
                <button className={stylesSignIn.buttonLogin} style={{ fontSize: "2.5em" }}>CREATE ACCOUNT</button>
            </div>
        </form>
    );
}

export default FormSignUp;