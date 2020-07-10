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

    const [errorMessages, setErrorMessages] = useState<string[]>([]);
    const history = useHistory();
    const [isPasswordDifferent, setIsPasswordDifferent] = useState(false);

    async function handleUserSignUp(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const newErrors: string[] = [];
        if (user.password === user.comfirmPassword) {
            setIsPasswordDifferent(false);
            userService.register(user)
                .then(
                    response => {
                        if (response.data.errors) {
                            if (response.data.errors.password && response.data.errors.password.properties.message)
                                newErrors?.push(response.data.errors.password.properties.message);

                            if (response.data.errors.username && response.data.errors.username.properties.message)
                                newErrors?.push(response.data.errors.username.properties.message);
                            
                            setErrorMessages(newErrors);
                        } else {
                            setErrorMessages(newErrors);
                        }


                        if (response.status === 201) {
                            //console.log('email and password are correct');
                            console.log('Sucess Register');
                            history.push('/');
                        }

                        if (response.status === 500) {
                            //console.log('email or password incorrect');
                            //setErrorLogin(<span className="error-login">Email or password incorrect</span>);
                            console.log('Fail Register');
                        }

                    },
                    error => {
                        console.log('requisition failed');
                    }
                );
        }else{
            setIsPasswordDifferent(true);
            newErrors?.push('Passwords mismatch');
            setErrorMessages(newErrors);
        }
    }

    return (
        <form action="" onSubmit={(e: FormEvent<HTMLFormElement>) => handleUserSignUp(e)}>

            {errorMessages?.map((message, index) => {
                return <div className={stylesSignIn.modalError} key={index}>{message}</div>
            })}

            <UserInput type={'text'} placeholder="username" onChange={(event: ChangeEvent<HTMLInputElement>) => {
                const value = event.target.value;
                setUser(prevState => { return { ...prevState, username: value } });
            }}>
            </UserInput>

            <UserInput isRed={isPasswordDifferent} type={'password'} placeholder="password" onChange={(event: ChangeEvent<HTMLInputElement>) => {
                const value = event.target.value;
                setUser(prevState => { return { ...prevState, password: value } });
            }}>
            </UserInput>
            <UserInput isRed={isPasswordDifferent} type={'password'} placeholder="comfirm password" onChange={(event: ChangeEvent<HTMLInputElement>) => {
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