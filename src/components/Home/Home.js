import React, { useEffect, useState } from 'react';
import Layout from '../Layout';
import { NavLink } from 'react-router-dom';
import { getProducts, getFilteredProducts } from '../../api/apiProduct';
import { getCategories } from '../../api/apiCategory';
import Spinner from '../Spinner';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API } from '../../utils/config';
import CheckBox from './CheckBox';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState('createdAt');
    const [order, setOrder] = useState('desc');
    const [limit, setLimit] = useState(12);
    const [skip, setSkip] = useState(0);
    const [categories, setCategories] = useState([]);
    const [catErr, setCatErr] = useState(false);
    const [filters, setFilters] = useState({
        category: [],
        price: []
    });
    // Show categories

    const DisplayProduct = () => {
        getProducts(sortBy, order, limit)
            .then(response => {
                setLoading(false);
                setProducts(response.data);
                if (response.data.noData) {
                    setError(response.data);
                }
            })
            .catch(err => {
                setLoading(false);
                if (err.response) {
                    setError(err.response);
                } else {
                    setError({message: 'Failed to fetch products!'})
                }
            });
    }

    const DisplayCategory = () => {
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
    }

    useEffect(() => {
        DisplayProduct();
        DisplayCategory();
    }, [navigator]);

    const handleFilters = (myFilters, filterBy) => {
        const newFilters = {...filters};
        if (filterBy === 'category') {
            newFilters[filterBy] = myFilters;
        }

        setFilters(newFilters);
        setLoading(true);
        setProducts({});
        getFilteredProducts(order, filterBy, 0, skip, newFilters)
            .then(response => {
                setLoading(false);
                setProducts(response.data);
                if (response.data.noData) {
                    setError(response.data);
                }
            })
            .catch(err => {
                setLoading(false);
                if (err.response) {
                    setError(err.response);
                } else {
                    setError({message: 'Failed to fetch products!'})
                }
            });
    }

    const showFilters = () => {
        return (
            <>
                <div className="row">
                    <div className="col-12">
                        <h5>Filter By Categories:</h5>
                        {catErr.message ? <><h6>{catErr.message}</h6></> : ''}
                        <ul className='p-0'>
                            <CheckBox categories={categories} handleFilters={(myFilters) => handleFilters(myFilters, 'category')} />
                        </ul>
                    </div>
                </div>
            </>
        )
    }


    return (
        <Layout title="Bohubrihi Ecommerce" classname="container-fluid">
            {categories.length > 0 ? showFilters() : <><h5>Category Loading...</h5></>}
            <ToastContainer />
            <div className="row" style={{ marginTop: "30px" }}>
                    {products.length > 0 && products.map(item => {
                        return (
                            <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={item._id}>
                                <div className="singleProduct">
                                    <div className='card'>
                                        <img src={`${API}/product/photo/${item._id}`} alt="Not Found" className='card-img-top' />
                                        <div className="card-body">
                                            <p className='productName'>{item.name}</p>
                                            <span>&#2547; {item.price}</span>
                                            <p>{item.quantity ? (<span className='badge rounded-pill text-bg-primary'>In Stock</span>) : (<span className='badge rounded-pill text-bg-danger'>Out of Stock</span>)}</p>
                                            <div className='d-flex justify-content-between'>
                                                <NavLink className='btn btn-outline-warning' to={`/product/${item._id}`}>View Product</NavLink>
                                                {item.quantity ? <><button className='btn btn-outline-primary'>Add to Cart</button></> : ''}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                <div>
                    <h4 className='text-center'>{error.message}</h4>
                    <h4 className='text-center'>{error.noData}</h4>
                    {loading ? <Spinner /> : ''}
                </div>
            </div>
        </Layout>
    )
}

export default Home;