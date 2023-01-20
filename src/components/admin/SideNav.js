import React from 'react';
import { NavLink } from 'react-router-dom';

const SideNav = () => {
    return (
        <>
            <div className="card mb-5">
                <h4 className="card-header bg-secondary text-white">User Links</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <NavLink className="nav-link" to="/show/category">Category</NavLink>
                    </li>
                    <li className="list-group-item">
                        <NavLink className="nav-link" to="/show/product">Product</NavLink>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default SideNav;