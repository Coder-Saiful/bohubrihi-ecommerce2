import React from 'react';
import { NavLink } from 'react-router-dom';
import Menu from './Menu';

const PageNotFound = () => {
    return (
        <>
            <Menu />
            <div className='container'>
                <div className="row pageNotFound align-items-center">
                        <div className="col-md-6">
                            <div className="text">
                                <h1>404</h1>
                                <h2>PAGE NOT FOUND</h2>
                                <p>THE PAGE YOU ARE LOOKING FOR WAS MOVED, REMOVED, RENAMED OR MIGHT NEVER EXISTED.</p>
                                <NavLink to='/'>GO HOME</NavLink>
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className="image">
                                <img src={require('../images/pageNotFound/monkey.gif')} alt="Not found" />
                            </div>
                        </div>
                </div>
            </div>
        </>
    );
};

export default PageNotFound;