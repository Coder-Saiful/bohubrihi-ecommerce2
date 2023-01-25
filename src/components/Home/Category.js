import React, {useState, useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import { getCategories } from '../../api/apiCategory';

const Category = () => {
    const [categories, setCategories] = useState([]);
    const [catErr, setCatErr] = useState(false);

    const DisplayCategory = () => {
        getCategories()
            .then(response => {
                setCategories(response.data);
            })
            .catch(err => {
                if (err.response) {
                    setCatErr(err.response);
                } else {
                    setCatErr({message: 'Failed to fetch categories!'})
                }
            });
    }

    useEffect(() => {
        DisplayCategory();
    });
    return (
        <div className='col-lg-3 col-md-4 mb-5 col-sm-5 col-8 mx-auto'>
            {categories.length > 0 ? <>
                <ul className='list-group categoryNav'>
                    <li className='list-group-item bg-secondary text-light'><h4>Category</h4></li>
                    <li className='list-group-item'><NavLink className='nav-link' to='/shop'>All Products</NavLink></li>
                    {categories.length > 0 && categories.map(item => {
                        return (
                            <li className='list-group-item text-decoration-none' key={item._id}><NavLink className='nav-link' to={`/shop/category/${item.name}`}>{item.name}</NavLink></li>
                        )
                    })}
                </ul>
            </>: <h5>Category Loading...</h5>}
        </div>
    );
};

export default Category;