import React, { useEffect } from 'react'
import '../css/AddProduct.css'
import { useNavigate } from 'react-router-dom';

function AddProduct() {
    const [name, setName] = React.useState('');
    const [details, setDetails] = React.useState('');
    const [colors, setColors] = React.useState('');
    const [sizes, setSizes] = React.useState([]);
    const [price, setPrice] = React.useState('');
    const [quantity, setQuantity] = React.useState('');
    const [discount, setDiscout] = React.useState('');
    const [error, setError] = React.useState(false)
    const navigate = useNavigate()


    useEffect(() => {
        const email = localStorage.getItem('userEmail')
        const token=localStorage.getItem('token')
        if (!email||!token) {
            alert("Please Login")
            navigate('/app/home')
        }
        if(email!='instibuzz@gmail.com'){
            navigate('/app/home')
        }
    }, [])

    const addProduct = async () => {
        if (!name || !price || !details) {
            setError(true)
            return false
        }
        const token = localStorage.getItem("token");
        let result = await fetch('https://mollusk-thankful-externally.ngrok-free.app/api/v1/products/add-product', {
            method: 'POST',
            body: JSON.stringify({ name, details, price, }),
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
        })
        result = await result.json();
        console.log(result)
        alert("Product is added Successfully")
        navigate('/app/shop')
    }

    return (
        <div>
            <p className='addproduct-items'>Add images</p>
            <input className='addproduct-img' type='text' placeholder='Drag and drop image here' />

            <p className='addproduct-items'>Product Name</p>
            <input className='addproduct-name' type='text' placeholder='Enter product name' value={name}
                onChange={(e) => { setName(e.target.value) }} />
            {error && !name && <span className='invalid-input'>Enter valid name</span>}

            <p className='addproduct-items'>Product Details</p>
            <input className='addproduct-details' type='text' placeholder='Enter your Product Details' value={details}
                onChange={(e) => { setDetails(e.target.value) }} />
            {error && !name && <span className='invalid-input'>Enter valid details</span>}


            <p className='addproduct-items'>Colors</p>
            <input className='addproduct-colors' type='text' placeholder='Enter product colors' value={colors}
                onChange={(e) => { setColors(e.target.value) }} />

            <p className='addproduct-items'>Sizes</p>
            <input className='addproduct-sizes' type='text' placeholder='Enter product sizes' value={sizes}
                onChange={(e) => { setSizes(e.target.value) }} />
            {error && !name && <span className='invalid-input'>Enter valid sizes</span>}

            <div className='addproduct-last-div'>
                <div className='addproduct-price-div'>
                    <p className='addproduct-items'>Price</p>
                    <input className='addproduct-price' type='text' placeholder='Enter product price' value={price}
                        onChange={(e) => { setPrice(e.target.value) }} />
                    {error && !price && <span className='invalid-input'>Enter valid price</span>}

                </div>

                <div className='addproduct-quantity-div'>
                    <p className='addproduct-items'>Quantity</p>
                    <input className='addproduct-quantity' type='text' placeholder='Enter product name' value={quantity}
                        onChange={(e) => { setQuantity(e.target.value) }} />

                </div>

                <div className='addproduct-discount-div'>
                    <p className='addproduct-items'>Discount</p>
                    <input className='addproduct-discount' type='text' placeholder='Enter discount if any' value={discount}
                        onChange={(e) => { setDiscout(e.target.value) }} />
                </div>
                <button className='addproduct-button' onClick={addProduct}>Upload</button>
            </div>
        </div>
    )
}

export default AddProduct
