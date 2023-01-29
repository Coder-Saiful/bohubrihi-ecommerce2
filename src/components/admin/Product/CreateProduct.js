import React, { useEffect, useState } from 'react';
import { getCategories } from '../../../api/apiCategory';
import Layout from '../../Layout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavLink } from 'react-router-dom';
import { userInfo } from '../../../utils/auth';
import { createProduct } from '../../../api/apiProduct';

const CreateProduct = () => {
    const [values, setValues] = useState({
        name: '',
        description: '',
        price: '',
        quantity: '',
        category: '',
        formData: new FormData(),
        error: false,
        disabled: false
    });

    const {name, description, price, quantity, category, formData, error, disabled} = values;

    const [categories, setCategories] = useState([]);
    const [catErr, setCatErr] = useState(false);
    const [noImage, setNoImage] = useState(false);

    useEffect(() => {
        getCategories()
            .then(response => {
                setCategories(response.data);
            })
            .catch(err => {
                if (err.response) {
                    setCatErr(err.response);
                } else {
                    setCatErr({message: 'Failed to fetch categories!'});
                }
                
            });
    }, []);

    const handleChange = e => {
        const value = e.target.name === 'photo' ? e.target.files[0] : e.target.value;
        formData.set(e.target.name, value);
        setValues({
            ...values,
            [e.target.name]: value
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
        createProduct(userInfo().token, formData)
            .then(response => {
                submitBtn.textContent = "Create";
                setValues({
                    ...values,
                    name: '',
                    description: '',
                    price: '',
                    quantity: '',
                    category: '',
                    error: false,
                    disabled: false,
                    formData: new FormData()
                });
                setNoImage(false);
                document.querySelector('.loginForm').reset();
                toast.success(`${response.data.message}`, {autoClose: 3000});
            })
            .catch(err => {
                if (err.response) {
                    setValues({
                        ...values,
                        disabled: false,
                        error: err.response.data
                    });
                    if (err.response.data.message) {
                        toast.error(`${err.response.data.message}`, {autoClose: 3000});
                    } else if (err.response.data.noImage) {
                     setNoImage(err.response.data.noImage);  
                    }
                    submitBtn.textContent = "Create";
                } else {
                    setValues({
                        ...values,
                        disabled: false,
                        error: false
                    });
                    toast.error(`Product created failed! Please try again.`, {autoClose: 3000});
                    submitBtn.textContent = "Create";
                }
            });
    }

    return (
        <Layout title="Create Product" classname="container">
            <ToastContainer />
            <div className="row">
                <div className="col-lg-7 col-md-10 m-auto">
                    <form className='loginForm' onSubmit={handleSubmit}>
                        <h1>Create Product</h1>
                        <div className="mb-3">
                            <label className="form-label">Product Name:</label>
                            <input type="text" className={`form-control`} name='name' value={name} onChange={handleChange} />
                            <div className="text-danger">{error.name ? error.name + "!" : ''}</div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Product Description:</label>
                            <textarea type="text" className={`form-control`} name='description' value={description} onChange={handleChange} rows='5'></textarea>
                            <div className="text-danger">{error.description ? error.description + "!" : ''}</div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Product Price:</label>
                            <input type="text" className={`form-control`} name='price' value={price} onChange={handleChange} />
                            <div className="text-danger">{error.price ? error.price + "!" : ''}</div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Product Quantity:</label>
                            <input type="text" className={`form-control`} name='quantity' value={quantity} onChange={handleChange} />
                            <div className="text-danger">{error.quantity ? error.quantity + "!" : ''}</div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Product Category:</label>
                            <select name="category" className='form-select' value={category} onChange={handleChange}>
                                <option value=''>--Select One--</option>
                                
                                {categories.length > 0 && categories.map(item => {
                                    return (
                                        <option value={item._id} key={item._id}>{item.name}</option>
                                    )
                                })}
                            </select>
                            {catErr.message && <><div className='text-danger'>{catErr.message}</div></>}
                            <div className="text-danger">{error.category ? error.category + "!" : ''}</div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Product Photo:</label>
                            <input type="file" name="photo" className='form-control' onChange={handleChange} />
                            <div className="text-danger">{noImage ? noImage + "!" : ''}</div>
                        </div>
                        <button type="submit" disabled={disabled} className="btn btn-primary submitBtn">Create</button>
                    </form>
                    <p className='text-center mt-4'>
                        <NavLink className='text-success' to='/show/product'>Back to dashboard</NavLink>
                    </p>
                </div>
            </div>
        </Layout>
    );  
};

export default CreateProduct;