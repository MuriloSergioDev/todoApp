import React from 'react';
import FormSignUp from '../../components/FormSignUp';
import stylesSignIn from '../SignIn/style.module.css';

const SignUp: React.FC = () => {
    return (
        <div className={stylesSignIn.backgroundHome}>
            <div className={stylesSignIn.modalLogin}>
                <p>Sign Up</p>
                <FormSignUp/>
            </div>
        </div >
    );
}

export default SignUp;