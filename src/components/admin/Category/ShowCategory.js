import React, { useEffect, useState } from 'react';
import Layout from '../../Layout';
import { NavLink } from 'react-router-dom';
import { deleteCategory, getCategories } from '../../../api/apiCategory';
import Spinner from '../../Spinner';
import dateFormat, { masks } from "dateformat";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { userInfo } from '../../../utils/auth';

const ShowCategory = () => {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    
    const UserLinks = () => {
        return (
            <div className="card mb-4">
                <h4 className="card-header">User Links</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <NavLink className="nav-link" to="/show/category">Category</NavLink>
                    </li>
                    <li className="list-group-item">
                        <NavLink className="nav-link" to="/create/product">Product</NavLink>
                    </li>
                </ul>
            </div>
        )
    };

    // Show categories

    const DisplayCategory = () => {
        getCategories()
            .then(response => {
                setLoading(false);
                setCategories(response.data);
                if (response.data.noData) {
                    setError(response.data);
                }
            })
            .catch(err => {
                setLoading(false);
                if (err.response) {
                    setError(err.response);
                } else {
                    setError({message: 'Failed to fetch categories!'})
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

        deleteCategory(userInfo().token, id)
            .then(response => {
                DisplayCategory();
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
        DisplayCategory();
    }, []);

    return (
        <Layout title="Category" classname="container-fluid">
            <ToastContainer />
            <div className="row" style={{ marginTop: "30px" }}>
                <div className="col-sm-3">
                    <UserLinks />
                </div>
                <div className="col-sm-9">
                    <div className="text-center position-relative mb-3">
                        <h2>Category List</h2>
                        <div className='text-end createBtn'>
                            <NavLink to='/create/category' className='btn btn-primary'>Create</NavLink>
                        </div>
                    </div>
                    
                    
                    <div className="categoryTable">
                    <table className="table table-bordered table-hover">
                        <thead className='bd-dark'>
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">Category Name</th>
                            <th scope="col">Create At</th>
                            <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.length > 0 && categories.map((item, index) => {
                                return (
                                    <tr key={item._id}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{item.name}</td>
                                        <td>{dateFormat(item.createdAt, "d mmmm yyyy, h:MM TT")}</td>
                                        <td>
                                            <span className='actionBtn deleteBtn text-danger me-3' style={{ cursor: 'pointer' }} onClick={(e) => {
                                                DeleteCategory(item._id, e);
                                            }}><i className="fa fa-trash-o" aria-hidden="true"></i></span>
                                            <NavLink className='actionBtn' to={`/update/category/${item._id}`}><i className="fa fa-pencil-square-o" aria-hidden="true"></i></NavLink>
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

export default ShowCategory;