import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import "../css/Product.css"
import LoadingPage from './LoadingPage'

function UpdateProduct() {
    const [imageUrl, setImageUrl] = React.useState([])
    const [selectedImage, setSelectedImage] = React.useState(imageUrl[0])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getProductDetails()
        const email = localStorage.getItem("userEmail")
    }, [])

    useEffect(() => {
        if (imageUrl.length > 0) {
            setSelectedImage(imageUrl[0]);
        }
    }, [imageUrl]);

    const [name, setName] = React.useState()
    const [price, setPrice] = React.useState()
    const [details, setDetails] = React.useState()
    const [sizeQuantities, setSizeQuantities] = React.useState([{size_id:'', size: 'S', quantity: '1' }]);
    const navigate = useNavigate()
    const params = useParams();

    const selectImage = (type) => {
        setSelectedImage(type)
    }

    const getProductDetails = async () => {
        setLoading(true)
        // console.log(params)
        let result = await fetch(`${process.env.REACT_APP_server_url}/api/v1/products/get-product-details/${params.id}`, {
            method: "POST"
        })
        result = await result.json()
        // console.log(result)
        setName(result.name)
        setPrice(result.price)
        setSizeQuantities(result.sizeQuantities)
        setImageUrl(result.imageUrl)
        setDetails(result.details)
        setLoading(false)
    }

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

    const updateProduct = async () => {
        let email = localStorage.getItem("userEmail")
        let token = localStorage.getItem("token")
        // console.log(token)
        if (!email) {
            alert("Please Login")
            navigate("./login")
        }
        setLoading(true)
        let productId = params.id
        // console.log(email)
        // console.log(productId)
        let result = await fetch(`${process.env.REACT_APP_server_url}/api/v1/products/update-product-details/${params.id}`, {
            method: 'POST',
            body: JSON.stringify({ productId, name, price,sizeQuantities, details }),
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
        })
        result = await result.json();
        // console.log(result)
        setLoading(false)
        if (result.status == 404) {
            alert(result.message)
            localStorage.removeItem("userEmail")
            navigate('/')
            window.location.reload();
        } else {
            alert("updated Successfully")
            // alert("Product is added to cart Successfully")
            // navigate('/cart')
            // window.location.reload();
        }
    }


    function e(item, index) {
        return (
            <button onClick={() => selectImage(item)}>
                <img src={item} alt="Jersey" class="product-img-button" />
            </button>
        )
    }

    return (
        <div>
            {loading ? <LoadingPage /> :
                <div class="product-main-container">
                    <div class="product-image-container">
                        <img src={selectedImage} alt="Tunga jersey" class="product-display-img" />
                        <div class="product-all-images">
                            {
                                imageUrl.map(e)
                            }
                        </div>
                    </div>
                    <div class="product-product-description">
                        <div class="product-product-name">
                            <input type='text' placeholder='Enter product name' className='inputBox'
                                value={name} onChange={(e) => { setName(e.target.value) }}
                            />
                        </div>
                        <div class="product-product-price">
                            <input type='text' placeholder='Enter product price' className='inputBox'
                                value={price} onChange={(e) => { setPrice(e.target.value) }}
                            />
                        </div>

                        <div class="product-product-size">
                            <p>Edit Size &Quantity</p>
                        </div>
                        <div class="product-product-quantity">
                            <div className=''>
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
                        </div>
                        {
                            <button class="product-btn" onClick={updateProduct}>Update Details</button>
                        }

                        <div class="product-product-details product-product-info">
                            <h3>PRODUCT INFO (Product Details)</h3>
                            <textarea type='text' placeholder='Enter product price' className='inputBox'
                                value={details} onChange={(e) => { setDetails(e.target.value) }}
                            />
                        </div>
                        <hr />
                        <div class="product-product-details product-return-refund-policy">
                            <h3>10 Days replacement policy</h3>
                            <p>Our products undergo thorough checks to ensure it is damage free. <br />
                                However, any damaged product shall be replaced free of cost.<br />
                                The product should be handed over to us in the original packaging with all the tags and labels intact.

                            </p>
                        </div>
                        <hr />
                        {/* <div class="product-product-details product-shipping-info">
                    <h3>SHIPPING INFO </h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dolor eros, tincidunt vitae augue eu,
                        molestie accumsan nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eget maximus
                        tortor, quis mattis lorem. Ut tempus odio at elit porttitor aliquet.</p>
                </div> */}
                    </div>
                </div>
            }
        </div>
    )

}

export default UpdateProduct
