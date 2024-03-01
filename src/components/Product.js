import React, { useEffect } from 'react'
import "../css/Product.css"
import prodImg from "../assets/Screenshot 2024-02-17 033151.png"
import otherImg from "../assets/22e53e_ef2ebbf33af24b7fba34e44589f3dc38~mv2.webp"
import imgOne from "../assets/Cauvery.png"
import imgTwo from "../assets/Godav.png"
import imgThree from "../assets/Mahanadhi.png"
import imgFour from "../assets/Sharav.png"
import imgFive from "../assets/Tapti.png"
import { useParams } from 'react-router-dom'

const Product = () => {

    const [selectedImage, setSelectedImage] = React.useState(prodImg)
    // const [id, setId] = React.useState()
    const [name, setName] = React.useState()
    const [price, setPrice] = React.useState()
    const [size, setSize] = React.useState([])
    const [details, setDetails] = React.useState()
    const [quantity, setQuantity] = React.useState('1')
    const [selectedSize,setselectedSize]=React.useState('L')
    const params = useParams()


    const selectImage = (type) => {
        setSelectedImage(type)
    }

    useEffect(() => {
        getProductDetails()
    }, [])

    const getProductDetails = async () => {
        console.log(params)
        let result = await fetch(`http://localhost:5000/api/v1/products/get-product-details/${params.id}`)
        result = await result.json()
        console.log(result)
        setName(result.name)
        setPrice(result.price)
        setSize(result.sizes)
        setDetails(result.details)
    }

    const addToCart=async()=>{
        localStorage.setItem(`product${params.id}`,params.id);
    }

    return (
        <div class="product-main-container">
            <div class="product-image-container">
                <img src={selectedImage} alt="Tunga jersey" class="product-display-img" />
                <div class="product-all-images">
                    <button onClick={() => selectImage(imgOne)}>
                        <img src={imgOne} alt="Tunga jersey" class="product-img-button" />
                    </button>
                    <button onClick={() => selectImage(imgTwo)}>
                        <img src={imgTwo} alt="Cauvery jersey" class="product-img-button" />
                    </button>
                    <button onClick={() => selectImage(imgThree)}>
                        <img src={imgThree} alt="Godavari jersey" class="product-img-button" />
                    </button>
                    <button onClick={() => selectImage(imgFour)}>
                        <img src={imgFour} alt="Sharavati jersey" class="product-img-button" />
                    </button>
                    <button onClick={() => selectImage(imgFive)}>
                        <img src={imgFive} alt="Tapti jersey" class="product-img-button" />
                    </button>
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
                <select id="dropdown" placeholdeer='SelectSize' value={selectedSize} onChange={(e=>{setselectedSize(e.target.value)})}>
                    <option value="">{selectedSize}</option>
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                </select>
                <div class="product-product-quantity">
                    <p>Quantity</p>
                    <input type="number" name="product-quantity" id="product-quantity" value={quantity}
                        min="1" max='5' onChange={(e => { setQuantity(e.target.value) })} />
                </div>
                <button class="product-btn" onClick={addToCart}>Add to Cart</button>
                <div class="product-product-details product-product-info">
                    <h3>PRODUCT INFO</h3>
                    <p> {details}  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dolor eros, tincidunt vitae augue eu,
                        molestie accumsan nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eget maximus
                        tortor, quis mattis lorem. Ut tempus odio at elit porttitor aliquet.</p>
                </div>
                <hr />
                <div class="product-product-details product-return-refund-policy">
                    <h3>RETURN & REFUND POLICY</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dolor eros, tincidunt vitae augue eu,
                        molestie accumsan nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eget maximus
                        tortor, quis mattis lorem. Ut tempus odio at elit porttitor aliquet.</p>
                </div>
                <hr />
                <div class="product-product-details product-shipping-info">
                    <h3>SHIPPING INFO </h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dolor eros, tincidunt vitae augue eu,
                        molestie accumsan nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eget maximus
                        tortor, quis mattis lorem. Ut tempus odio at elit porttitor aliquet.</p>
                </div>
            </div>
        </div>
    )
}

export default Product
