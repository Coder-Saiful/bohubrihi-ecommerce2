import React from 'react';
import Layout from '../Layout';
import { NavLink } from 'react-router-dom';
import { userInfo } from '../../utils/auth';

const Dashboard = () => {
    const {name, email, role} = userInfo();
    
    const UserLinks = () => {
        return (
            <div className="card mb-4">
                <h4 className="card-header">User Links</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <NavLink className="nav-link" to="#">My Cart</NavLink>
                    </li>
                    <li className="list-group-item">
                        <NavLink className="nav-link" to="#">Update Profile</NavLink>
                    </li>
                </ul>
            </div>
        )
    };

    const PurchaseHistory = () => (
        <div className="card mb-4">
            <h3 className="card-header">Purchase History</h3>
            <ul className="list-group">
                <li className="list-group-item">History</li>
            </ul>
        </div>
    );

    const UserInfo = () => (
        <div className="card mb-4">
            <h3 className="card-header">User Information</h3>
            <ul className="list-group">
                <li className="list-group-item"><b>Name: </b>{name}</li>
                <li className="list-group-item"><b>Email: </b>{email}</li>
                <li className="list-group-item"><b>Role: </b>{role}</li>
            </ul>
        </div>
    );

    return (
        <Layout title="Dashboard" classname="container-fluid">
            <div className="row" style={{ marginTop: "30px" }}>
                <div className="col-sm-3">
                    <UserLinks />
                </div>
                <div className="col-sm-9">
                    <UserInfo />
                    <PurchaseHistory />
                </div>
            </div>
        </Layout>
    )
}

export default Dashboard;