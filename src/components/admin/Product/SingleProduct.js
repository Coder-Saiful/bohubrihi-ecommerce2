import React, {useState, useEffect} from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { getSingleProduct } from '../../../api/apiProduct';
import { API } from '../../../utils/config';
import Layout from '../../Layout';
import Spinner from '../../Spinner';

const SingleProduct = () => {
    const {id} = useParams();
    const [product, setProduct] = useState({});
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getSingleProduct(id)
            .then(response => {
                setLoading(false);
                setProduct(response.data);
            })
            .catch(err =>  {
                setLoading(false);
                if (err.response) {
                    setError(err.response);
                } else {
                    setError({message: "Failed to fetch product details!"});
                }
            });
    }, [id]);

    return (
        <Layout title='Product Details' classname='container'>
                <div className="row">
                    <div className="col-md-6">
                        {product.name ? <div className="productImage mb-5">
                            <img src={`${API}/product/photo/${id}`} alt={product.name} className='img-fluid' />
                        </div> : ''} 
                    </div>
                    <div className="col-md-6">
                        {product.name ? <div className="productInfo">
                            <h4>Product Name: {product.name}</h4>
                            <h4>Product Price: &#2547; {product.price}</h4>
                            <h4>Product Quantity: {product.quantity}</h4>
                            <h4>Category Name: {product.category.name}</h4>
                            <textarea className='form-control' cols="30" rows="8" defaultValue={product.description}></textarea>
                            <p className='text-center mt-5'><NavLink to='/show/product' className='text-success'>Back to dashboard</NavLink></p>
                        </div> : ''}
                    </div>
                </div>
            <div>
                {error.message ? <><h2 className='text-center'>{error.message}</h2></> : ''}
                {loading ? <Spinner /> : ''}
            </div>
        </Layout>
    );
};

export default SingleProduct;