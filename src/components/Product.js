import React, { useEffect } from 'react'
import "../css/Product.css"

import { useNavigate, useParams } from 'react-router-dom'

const Product = () => {
    const [imageUrl, setImageUrl] = React.useState([])
    const [selectedImage, setSelectedImage] = React.useState(imageUrl[0])

    useEffect(() => {
        getProductDetails()
        const email = localStorage.getItem("userEmail")
        if (email) setIsLogin(true)
    }, [])

    useEffect(() => {
        if (imageUrl.length > 0) {
            setSelectedImage(imageUrl[0]);
        }
    }, [imageUrl]);

    const [name, setName] = React.useState()
    const [price, setPrice] = React.useState()
    const [details, setDetails] = React.useState()
    const [quantity, setQuantity] = React.useState('1')
    const [selectedSize, setselectedSize] = React.useState('S')
    const [isCart, setIsCart] = React.useState()
    const navigate = useNavigate()
    const params = useParams();
    const [isLogin, setIsLogin] = React.useState(false);

    const selectImage = (type) => {
        setSelectedImage(type)
    }

    const getProductDetails = async () => {
        // console.log(params)
        let result = await fetch(`https://website-server-ijbv.onrender.com/api/v1/products/get-product-details/${params.id}`, {
            method: "POST"
        })
        result = await result.json()
        // console.log(result)
        setName(result.name)
        setPrice(result.price)
        // setSize(result.sizes)
        setImageUrl(result.imageUrl)
        setDetails(result.details)
    }

    const addToCart = async () => {
        let email = localStorage.getItem("userEmail")
        let token = localStorage.getItem("token")
        // console.log(token)
        if (!email) {
            alert("Please Login")
            navigate("./login")
        }
        let productId = params.id
        // console.log(email)
        // console.log(productId)
        let result = await fetch('https://website-server-ijbv.onrender.com/api/v1/products/addToCart', {
            method: 'POST',
            body: JSON.stringify({ email, productId, quantity, selectedSize }),
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
        })
        result = await result.json();
        // console.log(result)
        if (result.status == 404) {
            alert(result.message)
            localStorage.removeItem("userEmail")
            navigate('/')
            window.location.reload();
        } else {
            // alert("Product is added to cart Successfully")
            // navigate('/cart')
            // window.location.reload();
        }
        setIsCart(true);
    }

    const toLogin = () => {
        navigate('/login')
    }

    function e(item, index) {
        // console.log(item)
        return (
            <button onClick={() =>  selectImage(item)}>
                <img src={item} alt="Tunga jersey" class="product-img-button" />
            </button>
        )
    }

    return (
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
                    <h2>{name}</h2>
                </div>
                <div class="product-product-price">
                    <h3>₹{price}</h3>
                </div>
                <div class="product-product-size">
                    <p>Select Size</p>
                </div>
                <select id="dropdown" placeholdeer='SelectSize' value={selectedSize} onChange={(e => { setselectedSize(e.target.value) })}>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                    <option value="2XL">2XL</option>
                </select>
                <div class="product-product-quantity">
                    <p>Quantity</p>
                    <input type="number" name="product-quantity" id="product-quantity" value={quantity}
                        min="1" max='5' onChange={(e => { setQuantity(e.target.value) })} />
                </div>
                {
                    isLogin ?
                        isCart ?
                            <button class="product-btn" >Added to Cart</button>
                            :
                            <button class="product-btn" onClick={addToCart}>Add to Cart</button>

                        :
                        <>
                            <button onClick={toLogin} class="product-btn" >Login to Proceed</button>
                        </>
                }

                <div class="product-product-details product-product-info">
                    <h3>PRODUCT INFO</h3>
                    <p> {details} </p>
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
    )
}

export default Product
