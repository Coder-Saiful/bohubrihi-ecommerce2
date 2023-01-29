import React, { useEffect, useState, useMemo } from 'react';
import Layout from '../Layout';
import { NavLink, useLocation } from 'react-router-dom';
import { getProducts } from '../../api/apiProduct';
import Spinner from '../Spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API } from '../../utils/config';
import Category from '../Home/Category';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState('createdAt');
    const [order, setOrder] = useState('desc');
    const [limit, setLimit] = useState(20);
    const { search } = useLocation();

  const searchParams = useMemo(() => new URLSearchParams(search), [search]);
  if (searchParams.get('name')) {
    alert(searchParams.get('name'))
  }
  
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

    useEffect(() => {
        DisplayProduct();
    }, []);

    

    return (
        <Layout title="Shop" classname="container-fluid">
            <ToastContainer />
            <div className="row" style={{ marginTop: "30px" }}>
                    <Category />
                <div className="col-lg-9 col-lg-8 col-sm-7">
                    <div className="row">
                        {products.length > 0 && products.map(item => {
                            return (
                                <div className="col-xxl-3 col-lg-4 col-md-6 mb-4" key={item._id}>
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
                    </div>
                </div>
                    
                <div>
                    <h4 className='text-center'>{error.message}</h4>
                    <h4 className='text-center'>{error.noData}</h4>
                    {loading ? <Spinner /> : ''}
                </div>
            </div>
        </Layout>
    )
}

export default Shop;