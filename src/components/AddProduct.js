import React, { useEffect } from 'react'
import '../css/AddProduct.css'
import { useNavigate } from 'react-router-dom';
import { storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';
import { styled } from '@mui/material';

function AddProduct() {
    const [name, setName] = React.useState('');
    const [details, setDetails] = React.useState('');
    const [colors, setColors] = React.useState('');
    const [sizeQuantities, setSizeQuantities] = React.useState([{ size: '', quantity: '' }]);
    const [price, setPrice] = React.useState('');
    const [style, setStyle] = React.useState('');
    const [discount, setDiscout] = React.useState('');
    const [error, setError] = React.useState(false)
    const [imageUpload, setImageUpload] = React.useState([]);
    const navigate = useNavigate()


    useEffect(() => {
        const email = localStorage.getItem('userEmail')
        const token = localStorage.getItem('token')
        if (!email || !token) {
            alert("Please Login")
            navigate('/')
        }
    }, [])


    const sizeInputChange = (index, event) => {
        const { name, value } = event.target;
        const newInputs = [...sizeQuantities];
        newInputs[index][name] = value;
        setSizeQuantities(newInputs);
    };

    const addSizeInputs = () => {
        setSizeQuantities([...sizeQuantities, { size: '', quantity: '' }]);
        // console.log(sizeQuantities)
    };

    const sizeDeleteRow = (index) => {
        const newInputs = [...sizeQuantities];
        newInputs.splice(index, 1);
        setSizeQuantities(newInputs);
    };

    const addProduct = async () => {
        var imageUrl = [];

        // console.log("imageUpload", imageUpload);

        if (!name || !price || !details || !imageUpload||!styled) {
            setError(true)
            return false
        }

        for (var i = 0; i < imageUpload.length; i++) {
            const imageRef = ref(storage, `images/${imageUpload[i].name + v4()}`);

            await uploadBytes(imageRef, imageUpload[i]).then(async () => {
                await getDownloadURL(imageRef).then((url) => {
                    // console.log('saada', url);
                    imageUrl.push(url);
                });
            });
        }
        
        const token = localStorage.getItem("token");
        let result = await fetch(`${process.env.REACT_APP_server_url}/api/v1/products/add-product`, {
            method: 'POST',
            body: JSON.stringify({ name, details, price, sizeQuantities, imageUrl,style }),
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
        });
        result = await result.json();
        // console.log(result)
        alert("Product is added Successfully")
        navigate('/shop')
    }

    return (
        <div>
            <p className='addproduct-items'>Add image</p>
            <input className='addproduct-img' type='file' multiple placeholder='Drag and drop image here'
                onChange={(event) => { setImageUpload(event.target.files) }} />


            <p className='addproduct-items'>Product Name</p>
            <input className='addproduct-name' type='text' placeholder='Enter product name' value={name}
                onChange={(e) => { setName(e.target.value) }} />
            {error && !name && <span className='invalid-input'>Enter valid name</span>}

            <p className='addproduct-items'>Product Details</p>
            <textarea className='addproduct-details' type='text' placeholder='Enter your Product Details' value={details}
                onChange={(e) => { setDetails(e.target.value) }} />
            {error && !details && <span className='invalid-input'>Enter valid details</span>}


            <p className='addproduct-items'>Colors</p>
            <input className='addproduct-colors' type='text' placeholder='Enter product colors' value={colors}
                onChange={(e) => { setColors(e.target.value) }} />


            <p className='addproduct-items'>Sizes & Quantity</p>
            <div className='addproduct-sizes'>
                {sizeQuantities.map((sizeQuantity, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            placeholder="Size"
                            name="size"
                            value={sizeQuantity.size}
                            onChange={(e) => sizeInputChange(index, e)}
                        />
                        <input
                            type="number"
                            placeholder="Quantity"
                            name="quantity"
                            value={sizeQuantity.quantity}
                            onChange={(e) => sizeInputChange(index, e)}
                        />
                        <button onClick={() => sizeDeleteRow(index)}>Delete</button>
                    </div>
                ))}
                <button onClick={addSizeInputs}>Add More Sizes</button>
            </div>

            {/* <input className='addproduct-sizes' type='text' placeholder='Enter product sizes' value={sizes}
                onChange={(e) => { setSizes(e.target.value) }} />
            {error && !name && <span className='invalid-input'>Enter valid sizes</span>} */}

            <div className='addproduct-last-div'>
                <div className='addproduct-price-div'>
                    <p className='addproduct-items'>Price</p>
                    <input className='addproduct-price' type='text' placeholder='Enter product price' value={price}
                        onChange={(e) => { setPrice(e.target.value) }} />
                    {error && !price && <span className='invalid-input'>Enter valid price</span>}

                </div>

                <div className='addproduct-quantity-div'>
                    <p className='addproduct-items'>Style</p>
                    <input className='addproduct-quantity' type='text' placeholder='regular/oversized/hoodie' value={style}
                        onChange={(e) => { setStyle(e.target.value) }} />
                    {error && !style && <span className='invalid-input'>Enter valid Style</span>}

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
