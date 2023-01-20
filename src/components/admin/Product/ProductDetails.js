import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../../Layout';

const ProductDetails = () => {
    const {id} = useParams();
    return (
        <Layout title='Product Details' classname='container'>
            
        </Layout>
    );
};

export default ProductDetails;