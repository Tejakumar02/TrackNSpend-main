import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/SignUp';
import SignIn from './pages/SignIn';
import Goal from './pages/Goal';
import '../src/styles/base.scss';
import Budget from './pages/Budget';
import Layout from './components/Layout/Layout';

function App(){
  const token = sessionStorage.getItem('token');

  return (
    <>
      <div className="App">
        <BrowserRouter>
            <div className='pages'>
              <Routes>
                <Route path = '/' element={token ? <Navigate to="/home" /> : <Navigate to="/signup" />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/signin' element={<SignIn />} />
                <Route path='/home' element={<Layout><Home /></Layout>} />
                <Route path='/goal' element={<Layout><Goal /></Layout>} />
                <Route path='/budget' element={<Layout><Budget /></Layout>} />
              </Routes>
            </div>
        </BrowserRouter>
      </div>
    </>
  );
}


export default App;
