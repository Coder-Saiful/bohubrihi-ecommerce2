import React, { useEffect, useState } from 'react';
import { createCategory } from '../../../api/apiCategory';
import Layout from '../../Layout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavLink } from 'react-router-dom';
import { userInfo } from '../../../utils/auth';

const CreateCategory = () => {
    const [values, setValues] = useState({
        name: '',
        error: false,
        disabled: false
    });

    const {name, error, disabled} = values;

    const handleChange = e => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = e => {
        e.preventDefault();

        const submitBtn = document.querySelector('.submitBtn');
        const loader = document.createElement('i');
        loader.className = "fa fa-refresh fa-spin";
        submitBtn.textContent = " Processing...";
        submitBtn.prepend(loader);
        
        setValues({
            ...values,
            disabled: true
        });

        createCategory(userInfo().token, {name: name})
            .then(response => {
                submitBtn.textContent = "Create";
                setValues({
                    ...values,
                    name: '',
                    error: false,
                    disabled: false
                });
                toast.success(`${response.data.message}`, {autoClose: 3000});
            })
            .catch(err => {
                submitBtn.textContent = "Create";
                let errors;
                if (err.response) {
                    errors = err.response.data;
                } else {
                    errors = {err: 'Something went wrong!'};
                }
                setValues({
                    ...values,
                    error: errors,
                    disabled: false
                });
                // console.log(err.response.data);
            });
    }

    return (
        <Layout title="Create Category" classname="container">
            <ToastContainer />
            <div className="row">
                <div className="col-lg-7 col-md-10 m-auto">
                    <form className='loginForm' onSubmit={handleSubmit}>
                        <h1>Create Category</h1>
                        <div className="mb-3">
                            <label className="form-label">Category Name:</label>
                            <input type="text" className={`form-control ${(error.message) ? "is-invalid" : ""}`} name='name' value={name} onChange={handleChange} />
                            <div className="invalid-feedback">
                                {(error.message) ? error.message : "" }
                                {(error.err) ? error.err : "" }
                            </div>
                        </div>
                        <button type="submit" disabled={disabled} className="btn btn-primary submitBtn">Create</button>
                    </form>
                    <p className='text-center mt-4'>
                        <NavLink className='text-success' to='/show/category'>Back to dashboard</NavLink>
                    </p>
                </div>
            </div>
        </Layout>
    );  
};

export default CreateCategory;