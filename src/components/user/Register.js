import React, { useState } from 'react';
import { register } from '../../api/apiAuth';
import Layout from '../Layout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { isAuthenticated } from '../../utils/auth';
import { Redirect } from 'react-router-dom';

const Register = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: false,
        disabled: false
    });

    const {name, email, password, error, disabled} = values;

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

        register({name, email, password})
            .then(response => {
                registerBtn.textContent = "Register";
                setValues({
                    ...values,
                    name: '',
                    email: '',
                    password: '',
                    error: false,
                    disabled: false
                });
                toast.success(`${response.data.message}`, {autoClose: 3000});
            })
            .catch(err => {
                registerBtn.textContent = "Register";
                let errors;
                if (err.response) {
                    errors = err.response.data;
                } else {
                    errors = 'Something went wrong!';
                }
                setValues({
                    ...values,
                    error: errors,
                    disabled: false
                });
                if (err.response.data.message) {
                    toast.error(`${err.response.data.message}`, {autoClose: 3000});
                }
            });
    }
    
    return (
        <Layout title="Register Page" classname="container">
            <ToastContainer />
            {isAuthenticated() ? <Redirect to='/' /> : "" }
            <div className="row">
                <div className="col-lg-7 col-md-10 m-auto">
                    <form className='loginForm' onSubmit={handleSubmit}>
                        <h1>Register Here</h1>
                        <div className="mb-3">
                            <label className="form-label">Full Name</label>
                            <input type="text" className={`form-control ${(error.name) ? "is-invalid" : ""}`} name='name' value={name} onChange={handleChange} />
                            <div className="invalid-feedback">
                                {(error.name) ? error.name : "" }
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email address</label>
                            <input type="text" className={`form-control ${(error.email) ? "is-invalid" : ""}`} name='email' value={email} onChange={handleChange} />
                            <div className="invalid-feedback">
                                {(error.email) ? error.email : "" }
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input type="password" className={`form-control ${(error.password) ? "is-invalid" : ""}`} name='password' value={password} onChange={handleChange} />
                            <div className="invalid-feedback">
                                {(error.password) ? error.password : "" }
                            </div>
                        </div>
                        <button type="submit" disabled={disabled} className="btn btn-primary registerBtn">Resiter</button>
                    </form>
                </div>
            </div>
        </Layout>
    );  
};

export default Register;