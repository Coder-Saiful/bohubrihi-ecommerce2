import React, {useState} from 'react';
import { login } from '../../api/apiAuth';
import Layout from '../Layout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Redirect} from 'react-router-dom';
import { authenticate, isAuthenticated, userInfo } from '../../utils/auth';

const Login = () => {
    const [values, setValues] = useState({
        email: '',
        password: '',
        disabled: false,
        redirect: false
    });

    const {email, password, disabled, redirect} = values;

    const handleChange = e => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = e => {
        e.preventDefault();

        const registerBtn = document.querySelector('.registerBtn');
        const loader = document.createElement('i');
        loader.className = "fa fa-refresh fa-spin";
        registerBtn.textContent = " Processing...";
        registerBtn.prepend(loader);
        
        setValues({
            ...values,
            disabled: true
        });

        login({email, password})
            .then(response => {
                authenticate(response.data.token, () => {
                    registerBtn.textContent = "Login";
                    setValues({
                        ...values,
                        email: '',
                        password: '',
                        disabled: false,
                        redirect: true
                    });
                });
            })
            .catch(err => {
                registerBtn.textContent = "Login";
                setValues({
                    ...values,
                    disabled: false,
                    redirect: false
                });
                toast.error(`${err.response.data.message}`, {autoClose: 3000});
            });
    }

    const redirectUser = () => {
        if(redirect) {
            return <Redirect to={`/${userInfo().role}/dashboard`} />
        }
        if (isAuthenticated()) {
            return <Redirect to='/' />
        }
    }

    return (
        <Layout title="Login Page" classname="container">
            <ToastContainer />
            {redirectUser()}
            <div className="row">
                <div className="col-lg-7 col-md-10 m-auto">
                <form className='loginForm' onSubmit={handleSubmit}>
                        <h1>Login Here</h1>
                        <div className="mb-3">
                            <label className="form-label">Email address</label>
                            <input type="text" className='form-control' name='email' value={email} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input type="password" className='form-control' name='password' value={password} onChange={handleChange} />
                        </div>
                        <button type="submit" disabled={disabled} className="btn btn-primary registerBtn">Login</button>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default Login;