import React, { useEffect } from 'react';
import Menu from './Menu';

const Layout = ({title, classname, children}) => {
    useEffect(() => {
        document.title = title;
    });
    return (
        <>
            <Menu />
            <div className={classname}>{children}</div>
        </>
    );
};

export default Layout;