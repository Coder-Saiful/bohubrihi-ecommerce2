import React, { useEffect, useState } from 'react';
import Layout from '../../Layout';
import { NavLink } from 'react-router-dom';
import { getProducts, deleteProduct } from '../../../api/apiProduct';
import Spinner from '../../Spinner';
import dateFormat from "dateformat";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { userInfo } from '../../../utils/auth';
import SideNav from '../SideNav';
import { API } from '../../../utils/config';

const ShowProduct = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    
    const UserLinks = () => {
        return (
            <SideNav />
        )
    };

    // Show categories

    const DisplayProduct = () => {
        getProducts()
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

    // Delete category

    const DeleteCategory = (id, e) => {
        if (e.target.className === 'fa fa-trash-o') {
            e.target.className = 'fa fa-spinner fa-spin';
        } else if (e.target.className === 'actionBtn deleteBtn text-danger me-3') {
            e.target.children[0].className = 'fa fa-spinner fa-spin';
        }

        deleteProduct(userInfo().token, id)
            .then(response => {
                DisplayProduct();
                setTimeout(() => {
                    toast.success(`Category deleted successfully!`, {
                        autoClose: 3000
                    });
                }, 500);
            })
            .catch(err => {
                if (err.response) {
                    if (e.target.className === 'fa fa-spinner fa-spin') {
                        e.target.className = 'fa fa-trash-o';
                    } else if (e.target.className === 'actionBtn deleteBtn text-danger me-3') {
                        e.target.children[0].className = 'fa fa-trash-o';
                    }

                    toast.error(`${err.response.data.message}`, {
                        autoClose: 3000
                    });
                } else  {
                    if (e.target.className === 'fa fa-spinner fa-spin') {
                        e.target.className = 'fa fa-trash-o';
                    } else if (e.target.className === 'actionBtn deleteBtn text-danger me-3') {
                        e.target.children[0].className = 'fa fa-trash-o';
                    }
                    toast.error(`Category deleted failed!`, {
                        autoClose: 3000
                    });
                }
            });
    }

    useEffect(() => {
        DisplayProduct();
    }, []);

    return (
        <Layout title="Product" classname="container-fluid">
            <ToastContainer />
            <div className="row" style={{ marginTop: "30px" }}>
                <div className="col-sm-3">
                    <UserLinks />
                </div>
                <div className="col-sm-9">
                    <div className="text-center position-relative mb-3">
                        <h2>Product List</h2>
                        <div className='text-end createBtn'>
                            <NavLink to='/create/product' className='btn btn-primary'>Create</NavLink>
                        </div>
                    </div>
                    
                    
                    <div className="categoryTable overflow-auto">
                    <table className="table table-bordered table-hover">
                        <thead className='table-secondary'>
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Description</th>
                            <th scope="col">Price</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Category</th>
                            <th scope="col">Photo</th>
                            <th scope="col">Create At</th>
                            <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.length > 0 && products.map((item, index) => {
                                return (
                                    <tr key={item._id}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{item.name}</td>
                                        <td><p style={{ height: '150px', overflow: 'auto', marginBottom: '0' }}>{item.description}</p></td>
                                        <td>{item.price}</td>
                                        <td>{item.quantity}</td>
                                        <td>{item.category.name}</td>
                                        <td><img src={`${API}/product/photo/${item._id}`} alt="Not Found" width='80' /></td>
                                        <td>{dateFormat(item.createdAt, "d mmmm yyyy, h:MM TT")}</td>
                                        <td>
                                            <NavLink className='actionBtn text-success' to={`/show/product/${item._id}`}><i className="fa fa-eye" aria-hidden="true"></i></NavLink>
                                            <span className='actionBtn deleteBtn text-danger me-3' style={{ cursor: 'pointer' }} onClick={(e) => {
                                                DeleteCategory(item._id, e);
                                            }}><i className="fa fa-trash-o" aria-hidden="true"></i></span>
                                            <NavLink className='actionBtn' to={`/update/product/${item._id}`}><i className="fa fa-pencil-square-o" aria-hidden="true"></i></NavLink>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                        </table>
                        <div>
                            <h4 className='text-center'>{error.message}</h4>
                            <h4 className='text-center'>{error.noData}</h4>
                            {loading ? <Spinner /> : ''}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default ShowProduct;