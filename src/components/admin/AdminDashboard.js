import React from 'react';
import Layout from '../Layout';
import { NavLink } from 'react-router-dom';
import { userInfo } from '../../utils/auth';
import SideNav from './SideNav';

const AdminDashboard = () => {
    const {name, email, role} = userInfo();
    
    const UserLinks = () => {
        return (
            <SideNav />
        )
    };

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
                    
                </div>
            </div>
        </Layout>
    )
}

export default AdminDashboard;