import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const FormComponent = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        category: ''
    });

    const fetchEditSpace = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/v1/product/singleProduct/${id}`);
            const productData = response.data.product;
            
            setProduct(productData);
            setFormData({
                name: productData.name || '',
                price: productData.price || '',
                description: productData.description || '',
                category: productData.category || ''
            });
            setSelectedCategory(productData.category || '');
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    
    useEffect(() => {
        fetchEditSpace();
    }, [id]);

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
        setFormData({
            ...formData,
            category: e.target.value
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Create an object to hold the form data
        const formDataToSend = {
            name: formData.name,
            price: formData.price,
            description: formData.description,
            category: formData.category
        };
    
        try {
            // Send the form data object as JSON
            const response = await axios.put(`http://localhost:3000/api/v1/product/updatedProduct/${id}`, formDataToSend, {
                headers: {
                    'Content-Type': 'application/json' // Use 'application/json' content type
                }
            });
            
            console.log('Update successful:', response.data);
            navigate('/showProduct');
        } catch (error) {
            console.error('Update Error:', error);
        }
    };
        

    return (
        <>
            <div className="form-container">
                <h2 className='product'>Edit Product</h2>
                <label>
                    Select Category:
                    <select value={selectedCategory} onChange={handleCategoryChange}>
                        <option value="">Select Category</option>
                        <option value="Medical">Medical</option>
                        <option value="Clothes">Clothes</option>
                        <option value="Food">Food</option>
                    </select>
                </label>
                {selectedCategory && (
                    <form onSubmit={handleSubmit} className="product-form">
                        <label>
                            Name:
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label>
                            Price:
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label>
                            Description:
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                            />
                        </label>
                        <button type="submit">Update</button>
                    </form>
                )}
            </div>

            <div className="flex">
                <Link to="/showProduct"><button>All Products</button></Link>
            </div>
        </>
    );
};

export default FormComponent;
