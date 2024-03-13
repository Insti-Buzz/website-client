import React, { useEffect } from 'react'
import "../css/Product.css"
import prodImg from "../assets/Screenshot 2024-02-17 033151.png"
import otherImg from "../assets/22e53e_ef2ebbf33af24b7fba34e44589f3dc38~mv2.webp"
import imgOne from "../assets/Cauvery.png"
import imgTwo from "../assets/Godav.png"
import imgThree from "../assets/Mahanadhi.png"
import imgFour from "../assets/Sharav.png"
import imgFive from "../assets/Tapti.png"

import Img1 from "../assets/BossBaby1.png"
import Img3 from "../assets/Green1.jpg"
import Img2 from "../assets/TakeLite1.jpg"
import Img4 from "../assets/White1.jpg"
import Img5 from "../assets/BossBaby2.png"
import Img7 from "../assets/Green2.jpg"
import Img6 from "../assets/TakeLite2.jpg"
import Img8 from "../assets/White2 (2).jpg"

import { useNavigate, useParams } from 'react-router-dom'

const Product = () => {

    const images = [Img1, Img2, Img3, Img4, ]
    const images2=[Img5, Img6, Img7, Img8]
    const [index, setIndex] = React.useState()
    // const [index2,setIndex2]=React.useState()
    useEffect(() => {
        getProductDetails()
        const email = localStorage.getItem("userEmail")
        if (email) setIsLogin(true)
        const index = localStorage.getItem('index')
        setIndex(index)
        // setIndex2(index+4)
        // console.log(index2)
        setSelectedImage(images[index])
        // console.log(index)
        // setIsCart(localStorage.getItem(`product${params.id}`))
        // console.log(localStorage.getItem(`product${params.id}`))
    }, [])

    const [selectedImage, setSelectedImage] = React.useState(images[index])
    // const [id, setId] = React.useState()
    const [name, setName] = React.useState()
    const [price, setPrice] = React.useState()
    const [size, setSize] = React.useState([])
    const [details, setDetails] = React.useState()
    const [quantity, setQuantity] = React.useState('1')
    const [selectedSize, setselectedSize] = React.useState('L')
    const [isCart, setIsCart] = React.useState()
    const navigate = useNavigate()
    const params = useParams()
    const [isLogin, setIsLogin] = React.useState(false)




    const selectImage = (type) => {
        setSelectedImage(type)
    }



    const getProductDetails = async () => {
        console.log(params)
        let result = await fetch(`http://13.49.225.235/api/v1/products/get-product-details/${params.id}`, {
            method: "POST"
        })
        result = await result.json()
        console.log(result)
        setName(result.name)
        setPrice(result.price)
        setSize(result.sizes)
        setDetails(result.details)
    }

    const addToCart = async () => {
        let email = localStorage.getItem("userEmail")
        let token = localStorage.getItem("token")
        console.log(token)
        if (!email) {
            alert("Please Login")
            navigate("./login")
        }
        let productId = params.id
        console.log(email)
        console.log(productId)
        let result = await fetch('http://13.49.225.235/api/v1/products/addToCart', {
            method: 'POST',
            body: JSON.stringify({ email, productId }),
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
        })
        result = await result.json();
        console.log(result)
        if (result.status == 404) {
            alert(result.message)
            localStorage.removeItem("userEmail")
            navigate('/')
            window.location.reload();
        } else {
            alert("Product is added to cart Successfully")
            navigate('/cart')
            window.location.reload();
        }


        // console.log(isCart)

    }

    const toLogin = () => {
        navigate('/login')
    }

    return (
        <div class="product-main-container">
            <div class="product-image-container">
                <img src={selectedImage} alt="Tunga jersey" class="product-display-img" />
                <div class="product-all-images">
                    <button onClick={() => selectImage(images[index])}>
                        <img src={images[index]} alt="Tunga jersey" class="product-img-button" />
                    </button>
                    <button onClick={() => selectImage(images2[index])}>
                        <img src={images2[index]} alt="Cauvery jersey" class="product-img-button" />
                    </button>
                    {/* <button onClick={() => selectImage(imgThree)}>
                        <img src={imgThree} alt="Godavari jersey" class="product-img-button" />
                    </button>
                    <button onClick={() => selectImage(imgFour)}>
                        <img src={imgFour} alt="Sharavati jersey" class="product-img-button" />
                    </button>
                    <button onClick={() => selectImage(imgFive)}>
                        <img src={imgFive} alt="Tapti jersey" class="product-img-button" />
                    </button> */}
                </div>
            </div>
            <div class="product-product-description">
                <div class="product-product-name">
                    <h2>{name}</h2>
                </div>
                <div class="product-product-price">
                    <h3>₹{price}</h3>
                </div>
                {/* <div class="product-product-size">
                    <p>Select Size</p>
                </div>
                <select id="dropdown" placeholdeer='SelectSize' value={selectedSize} onChange={(e => { setselectedSize(e.target.value) })}>
                    <option value="">{selectedSize}</option>
                    <option value="XS">XS</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                    <option value="XXL">XXL</option>
                    <option value="XXXL">XXXL</option>
                </select> */}
                {/* <div class="product-product-quantity">
                    <p>Quantity</p>
                    <input type="number" name="product-quantity" id="product-quantity" value={quantity}
                        min="1" max='5' onChange={(e => { setQuantity(e.target.value) })} />
                </div> */}
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
                    <p>Our products undergo thorough checks to ensure it is damage free. <br/>
                        However, any damaged product shall be replaced free of cost.<br/>
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
