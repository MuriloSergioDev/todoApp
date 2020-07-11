import React, { useEffect } from 'react';
import FormSignIn from '../../components/FormSignIn';
import styles from './style.module.css';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { actions as authActions } from '../../reducers/auth.reducer';
import { userService } from '../../services/user.service'

const Home: React.FC = () => {

    const dispatch = useDispatch();
    let history = useHistory();

    useEffect(() => {
        if (localStorage.getItem('token') && localStorage.getItem('userId')) {
            const token = localStorage.getItem('token') || '{}';
            //console.log(token);

            userService.verifyToken(token)
                .then(
                    response => {
                        if (response.status !== 200) {
                            alert('Session expired');
                            dispatch(authActions.setLogout());
                        }
                        if (response.data && response.data.id) {
                            if (response.data.id === localStorage.getItem('userId')) {
                                dispatch(authActions.refreshLogin());
                                console.log('Voce foi relogado');

                                const location: any = history.location.state;

                                const path: string | null = location?.from?.pathname;

                                if (path !== undefined && path !== null) {
                                    history.push(path);
                                } else {
                                    history.push('/');
                                }
                            }
                        }
                    },
                    error => {
                        //console.log(error);
                        dispatch(authActions.setLogout());
                    }
                )

        }
    }, [dispatch, history]);

    return (
        <div className={styles.backgroundHome}>
            <div className={styles.modalLogin}>
                <p>Sign In</p>
                <FormSignIn />
            </div>
        </div >
    );
}

export default Home;