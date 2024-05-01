 import axios from 'axios';
import  { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const AllProducts  = () => {
    const navigate = useNavigate();
    const deleteProduct = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/v1/product/deleteProduct/${id}`)
            setProducts(prevProducts => prevProducts.filter(product => product._id !== id));// joo id match nhii oo gye show krwa dya gya 
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    }
    const editProduct =(id) => {
        navigate(`/editProduct/${id}`)
    }
    

    const [products, setProducts] = useState([]);
    
    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/v1/product/getProduct');
            const reponseData = response.data.data;
            setProducts(reponseData);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    
    return (
        <div>
            <h>Product Dashboard</h>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Description</th>
                    
                        
                    </tr>
                </thead>
                <tbody>
                {
    products.length > 0 ? (
        products.map(product => (
            <tr key={product._id}>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.description}</td>
                <td>{product.category}</td>
                <td>
                    <button onClick={()=> deleteProduct(product._id)}>Delete</button>
                    <td>
                        <button onClick={() => editProduct(product._id)}>Edit</button>
                   </td>

                </td>    
            </tr>
        ))
    ) : (
        <tr>
            <td colSpan="5">No products available</td>
        </tr>
    )
}
                </tbody>
            </table>
        </div>
    );
};

export default AllProducts;
