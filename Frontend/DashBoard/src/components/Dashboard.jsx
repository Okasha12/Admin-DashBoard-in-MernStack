
import  { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const FormComponent = () => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        category:''
    });

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
        // Update formData with the selected category
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
        try {
            await axios.post('http://localhost:3000/api/v1/product/addProduct', formData);
            setFormData({
                name: '',
                price: '',
                description: '',
                category:''
            });
            alert('Product added successfully!');
        } catch (error) {
            console.error('Error posting products:', error);
            alert('Failed to add product');
        }
    };

    return (
        <>
         
        <div className="form-container">
            <h2 className='product'>Add Product</h2>
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
                <>
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
                    <button type="submit">Submit</button>
                </form>
                
                </>
            )}
        </div>

        <div className="flex">
           <Link to="/showProduct"><button>All Products</button></Link>
            </div>
        </>
    );
};

export default FormComponent;





















