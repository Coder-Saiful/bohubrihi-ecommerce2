import React, {useState, useEffect} from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { getSingleProduct } from '../../api/apiProduct';
import { API } from '../../utils/config';
import Layout from '../Layout';
import Spinner from '../Spinner';

const ProductDetails = () => {
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
                {product.name && <>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><NavLink to="/">Home</NavLink></li>
                            <li className="breadcrumb-item"><NavLink to="/shop">Shop</NavLink></li>
                            <li className="breadcrumb-item"><NavLink to={`/shop/category/${product.category.name}`}>{product.category.name}</NavLink></li>
                            <li className="breadcrumb-item active" aria-current="page">{product.name}</li>
                        </ol>
                    </nav>
                </>}
                <div className="row">
                <div className="col-md-6 mb-4">
                    {product.name && (
                        <div className="productImage">
                            <img src={`${API}/product/photo/${id}`} alt={product.name} className='img-fluid' />
                        </div>
                    )}
                </div>
                <div className="col-md-6">
                    {product.name && (
                        <div className="productInfo">
                            <h4>{product.name}</h4>
                            <h5>&#2547; {product.price}</h5>
                            <p>{product.quantity ? (<span className='badge rounded-pill text-bg-primary'>In Stock</span>) : (<span className='badge rounded-pill text-bg-danger'>Out of Stock</span>)}</p>
                            <p>{product.description}</p>
                            {product.quantity ? <><button className='btn btn-outline-primary'>Add to Cart</button></> : ''}
                        </div>
                    )}
                </div>
            </div>
            <div>
                {error.message ? <><h2 className='text-center'>{error.message}</h2></> : ''}
                {loading ? <Spinner /> : ''}
            </div>
        </Layout>
    );
};

export default ProductDetails;