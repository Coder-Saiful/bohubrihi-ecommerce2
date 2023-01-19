import React, { useEffect, useRef, useState } from 'react';
import { getSingleCategory, updateCategory } from '../../../api/apiCategory';
import Layout from '../../Layout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavLink, useParams } from 'react-router-dom';
import { userInfo } from '../../../utils/auth';
import Spinner from '../../Spinner';

const EditCategory = () => {
    const {id} = useParams();
    const auth = useRef(null);
    const [values, setValues] = useState({
        name: '',
        error: false,
        disabled: false
    });
    const [loading, setLoading] = useState(true);

    const {name, error, disabled} = values;

    const singleCategory = () => {
        auth.current.style.display = 'none';
        getSingleCategory(id)
            .then(response => {
                setValues({
                    ...values,
                    name: response.data.name
                });
                setLoading(false);
                auth.current.style.display = 'block';
            })
            .catch(err => {
                if (err.response) {
                    setValues({
                        ...values,
                        error: err.response.data.message
                    }); 
                } else {
                    setValues({
                        ...values,
                        error: 'Failed to fetch category!'
                    });
                }
                setLoading(false);
                auth.current.style.display = 'none';
            });
    }

    useEffect(() =>  {
        singleCategory();
    }, []);

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

        updateCategory(userInfo().token, {name: name}, id)
            .then(response => {
                submitBtn.textContent = "Update";
                setValues({
                    ...values,
                    error: false,
                    disabled: false
                });
                toast.success(`${response.data.message}`, {autoClose: 3000});
            })
            .catch(err => {
                submitBtn.textContent = "Update";
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
        });
    }

    

    return (
        <Layout title="Update Category" classname="container">
            <ToastContainer />
            {loading ? <Spinner /> : ''}
            {error ? <h2 className='text-center mt-5'>{error}</h2> : ''}
            <div className="row">
                <div className="col-lg-7 col-md-10 m-auto">
                    <div className="auth" ref={auth}>
                        <form className='loginForm' onSubmit={handleSubmit}>
                            <h1>Update Category</h1>
                            <div className="mb-3">
                                <label className="form-label">Category Name:</label>
                                <input type="text" className='form-control' name='name' value={name} onChange={handleChange} />
                            </div>
                            <button type="submit" disabled={disabled} className="btn btn-primary submitBtn">Update</button>
                        </form>
                        <p className='text-center mt-4'>
                            <NavLink className='text-success' to='/show/category'>Back to dashboard</NavLink>
                        </p>
                    </div>
                </div>
            </div>
        </Layout>
    );  
};

export default EditCategory;