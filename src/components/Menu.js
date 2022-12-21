import React from 'react';
import {NavLink, withRouter} from 'react-router-dom';
import { isAuthenticated, signOut, userInfo } from '../utils/auth';

const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return {color: "tomato"};
    } else {
        return {color: "white"};
    }
}

const Menu = ({history}) => {
    return (
        <nav className="navbar navbar-expand-lg bg-dark">
            <div className="container">
                <NavLink className="navbar-brand p-0" to="/"><img src={require('../images/Logo/logo.png')} alt="LOGO" style={{ width: "100px" }} /></NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/" style={isActive(history, '/')}>Home</NavLink>
                        </li>
                        {!isAuthenticated() && (
                            <>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/login" style={isActive(history, '/login')}>Login</   NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/register" style={isActive(history, '/register')}>Register</NavLink>
                                </li>
                            </>
                        )}
                        {isAuthenticated() && (
                            <>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to={`/${userInfo().role}/dashboard`} style={isActive(history, `/${userInfo().role}/dashboard`)}>Dashboard</NavLink>
                                </li>
                                <li className="nav-item">
                                    <span className="nav-link" style={{ cursor: 'pointer' }} onClick={() => {
                                        signOut(() => {
                                            history.push('/login');
                                        });
                                    }}>Logout</span>
                                </li>
                            </>
                        )}
                    </ul>
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
            </div>
        </nav>
    );
};

export default withRouter(Menu);