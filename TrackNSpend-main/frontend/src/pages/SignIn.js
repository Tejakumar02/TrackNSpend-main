import React, { useState } from 'react';
import axios from 'axios';
import { useExpenseContext } from '../hooks/useExpenseContext';
import { useNavigate } from 'react-router-dom';
import { setTokenWithExpiry } from '../helpers/common';
import BgImage from '../assets/signin.svg';
import Logo from '../assets/logo.svg'
import Show from '../assets/show.svg'
import Hide from '../assets/hide.svg'
import Loader from '../components/Loader/Loader';

const SignIn = () => {
    const { dispatch } = useExpenseContext();
    const [userName, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async(e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await axios.post(`${process.env.REACT_APP_APPLICATION_URL}/api/signin`, { userName, password });
            if (response.status === 200) {
                dispatch({
                    type: 'SHOW_TOAST',
                    payload: {
                        message: `${response.data.msg}`,
                        type: 'success'
                    }
                });
                const token = response.data.token;
                const name = response.data.userName;
                sessionStorage.setItem('name', name);
                setTokenWithExpiry('token', token); 
                setTimeout(() => {
                    navigate('/home');
                }, 2000);
            }
        }
        catch(error) {
            if (error.response && error.response.status === 400) {
                dispatch({
                    type: 'SHOW_TOAST',
                    payload: {
                        message: `${error.response.data.msg}`,
                        type: 'error'
                    }
                });
            }
            else {
                dispatch({
                    type: 'SHOW_TOAST',
                    payload: {
                        message: 'Network Error',
                        type: 'error'
                    }
                });
            }
        }
        finally {
            setIsLoading(false);
        }
    }

    const passwordVisibility = () => {
        setShowPassword(prevState => !prevState);
    }

    return(
        <>
            {isLoading ? <Loader /> :
                <div className='authentication'>
                    <header>
                        <div className='authentication__header'>
                            <img className='logo' src={Logo}/>
                            <button onClick={() => navigate('/signup')}>SIGN UP</button>
                        </div>
                    </header>
                    <div className='authentication__content'>
                        <img src={BgImage} />
                        <form onSubmit={handleSubmit}>
                            <h2>Track N Spend</h2>
                            <input type='text' placeholder='Username' value={userName} onChange={(e) => setUsername(e.target.value)} />
                            <div className='password-container'>
                                <input type={ showPassword ? 'text' : 'password' } placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                                <img src={ showPassword ? Hide : Show } onClick={passwordVisibility}/>
                            </div>
                            <button type='submit'>SIGN IN</button>
                        </form>
                    </div>
                </div>
            }
        </>
    )
}

export default SignIn