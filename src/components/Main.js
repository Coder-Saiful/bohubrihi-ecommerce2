import React from 'react';
import {Switch, Route} from 'react-router-dom';
import AdminDashboard from './admin/AdminDashboard';
import CreateCategory from './admin/Category/CreateCategory';
import EditCategory from './admin/Category/EditCategory';
import ShowCategory from './admin/Category/ShowCategory';
import CreateProduct from './admin/Product/CreateProduct';
import EditProduct from './admin/Product/EditProduct';
import ProductDetails from './Home/ProductDetails';
import ShowProduct from './admin/Product/ShowProduct';
import Home from './Home/Home';
import PageNotFound from './PageNotFound';
import AdminRoute from './protectedRoutes/AdminRoute';
import PrivateRoute from './protectedRoutes/PrivateRoute';
import Dashboard from './user/Dashboard';
import Login from './user/Login';
import Register from './user/Register';
import SingleProduct from './admin/Product/SingleProduct';
import Shop from './Shop/Shop';

const Main = () => {
    return (
        <>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/login" exact component={Login} />
                <Route path="/register" exact component={Register} />
                <Route path="/shop" exact component={Shop} />
                <Route path="/shop/category/:categoryName" exact component={Shop} />
                <Route path="/product/:id" exact component={ProductDetails} />
                <PrivateRoute path='/user/dashboard' exact>
                    <Dashboard />
                </PrivateRoute>
                <AdminRoute path='/admin/dashboard' exact>
                    <AdminDashboard />
                </AdminRoute>
                <AdminRoute path='/show/category' exact>
                    <ShowCategory />
                </AdminRoute>
                <AdminRoute path='/create/category' exact>
                    <CreateCategory />
                </AdminRoute>
                <AdminRoute path='/update/category/:id' exact>
                    <EditCategory />
                </AdminRoute>
                <AdminRoute path='/show/product' exact>
                    <ShowProduct />
                </AdminRoute>
                <AdminRoute path='/create/product' exact>
                    <CreateProduct />
                </AdminRoute>
                <AdminRoute path='/show/product/:id' exact>
                    <SingleProduct />
                </AdminRoute>
                <AdminRoute path='/update/product/:id' exact>
                    <EditProduct />
                </AdminRoute>
                <Route path='*' component={PageNotFound} />
            </Switch>
        </>
    );
};

export default Main;