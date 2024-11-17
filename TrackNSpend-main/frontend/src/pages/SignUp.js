import React, { useState } from 'react';
import axios from 'axios';
import { useExpenseContext } from '../hooks/useExpenseContext';
import { useNavigate } from 'react-router-dom';
import { setTokenWithExpiry, validatePassword, isValidPassword } from '../helpers/common';
import BgImage from '../assets/signup.svg';
import Logo from '../assets/logo.svg';
import Show from '../assets/show.svg';
import Hide from '../assets/hide.svg';

const Signup = () => {
  const { dispatch } = useExpenseContext();
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!onSubmit()) {
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_APPLICATION_URL}/api/signup`, { userName, password });

      if (response.status === 200) {
        dispatch({
          type: 'SHOW_TOAST',
          payload: {
              message: `${response.data.msg}`,
              type: 'success'
          }
        });
        const token = await response.data.token;
        const name = response.data.userName;
        sessionStorage.setItem('name', name);
        setTokenWithExpiry('token', token);
        setTimeout(() => {
          navigate('/home');
      }, 2000);
      } else {
        console.error('Token not received in response');
      }
    } 
    catch (error) {
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
  }

  const onSubmit = () => {
    let valid = true;
    const validUserName = isValidUserName(userName);
    const validPassword = isValidPassword(password);
    const paswordMismatch = validatePassword(password, confirmPassword);

    if (validUserName)  {
      dispatch({
        type: 'SHOW_TOAST',
        payload: {
            message: 'Username should have atleast 5 characters',
            type: 'error'
        }
      });
      valid = false;
      return;
    }
    if (validPassword) {
      dispatch({
        type: 'SHOW_TOAST',
        payload: {
            message: 'Password should have atleast 8 characters',
            type: 'error'
        }
      });
      setPassword('');
      setConfirmPassword('');
      valid = false;
      return;
    }
    if (paswordMismatch) {
      dispatch({
        type: 'SHOW_TOAST',
        payload: {
            message: 'Password mismatch, enter same passwords in both fields',
            type: 'error'
        }
      });
      setConfirmPassword('');
      valid = false;
      return;
    }
    return valid;
  }

  const isValidUserName = (userName) => {
    if(userName.length > 4) {
      return false
    }
    return true
  }

  const passwordVisibility = () => {
    setShowPassword(prevState => !prevState);
  }

  return (
    <div className='authentication'>
      <header className='authentication__header'>
        <img className='logo' src={Logo}/>
        <button onClick={() => navigate('/signin')}>SIGN IN</button>
      </header>
      <div className='authentication__content'>
        <img src={BgImage} />
        <form onSubmit={handleSubmit}>
          <h2>Track N Spend</h2>
          <input type="text" placeholder="Username" value={userName} onChange={(e) => setUsername(e.target.value)} />
          <div className='set-password-container'>
            <input type= {showPassword ? "text" : "password"} placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <img src={showPassword ? Hide : Show} onClick={passwordVisibility} />
          </div>
          <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          <button type="submit">SIGN   UP</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
