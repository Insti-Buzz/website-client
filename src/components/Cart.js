import React, { useEffect, useState } from 'react'
import '../css/Cart.css'
import TungaImg from '../assets/Tunga.png'
import TaptiImg from '../assets/Tapti.png'
import { useNavigate } from 'react-router-dom'
import { IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import LoadingPage from './LoadingPage'

function Cart() {

    const [products, setProducts] = React.useState([])

    // const [quantity, setQuantity] = useState(Array(products.length).fill(''));  
    // const [quantity, setQuantity] = useState(Array.from({ length: products.length }, () => 1));
    // const [quantity, setQuantity] = useState(Array(products.length).fill(1));
    const [quantity, setQuantity] = useState('1');
    // const [selectedSize, setSelectedSize] = useState(Array(products.length).fill());
    const [totalAmount, setTotalAmount] = React.useState();
    // const [showDetails, setShowDetails] = React.useState(false)
    const [showPayment, setShowPayment] = React.useState(false)
    const [email, setEmail] = React.useState('')
    const navigate = useNavigate('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const email = localStorage.getItem('userEmail')
        const token = localStorage.getItem('token')
        setEmail(email)
        if (!email || !token) {
            alert("Please Login")
            navigate('/')
        }
        getProducts();
    }, [])

    const getProducts = async () => {
        setLoading(true)
        const email = localStorage.getItem("userEmail")
        setEmail(email)
        const token = localStorage.getItem('token')
        let result = await fetch(`${process.env.REACT_APP_server_url}/api/v1/products/getProductsInCart`, {
            method: "POST",
            body: JSON.stringify({
                email,
            }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });
        result = await result.json();
        // console.log(result);
        // for (let i = 0; i < result.length; i++) {
        //     const updatedProducts = result.filter(item => item._id === localStorage.getItem(`product${item._id}`));
        //     setProducts(updatedProducts);
        // }
        setLoading(false)
        if (result.status == 404) {
            alert(result.message)
            localStorage.removeItem("userEmail")
            navigate('/')
            window.location.reload();
        } else {
            // console.log(result)
            setProducts(result.products);
        }
    }

    const updateSize = async (id, e) => {
        setLoading(true)
        const email = localStorage.getItem(`userEmail`)
        const token = localStorage.getItem('token')
        const updatedSize = e.target.value
        const orderItem_id = id
        const response = await fetch(`${process.env.REACT_APP_server_url}/api/v1/products/changeSizeInCart`, {
            method: "POST",
            body: JSON.stringify({
                orderItem_id,
                updatedSize,
                email,
            }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });
        const result = await response.json();
        // console.log(result);
        window.location.reload();
        // setLoading(false)
    }

    const updateQuantity = async (id, e) => {
        setLoading(true)
        const email = localStorage.getItem(`userEmail`)
        const token = localStorage.getItem('token')
        const updatedQuantity = e.target.value
        const orderItem_id = id
        const response = await fetch(`${process.env.REACT_APP_server_url}/api/v1/products/changeQuantityInCart`, {
            method: "POST",
            body: JSON.stringify({
                orderItem_id,
                updatedQuantity,
                email,
            }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });
        const result = await response.json();
        // console.log(result);
        window.location.reload();
        // setLoading(true)

    }

    const calculateSubtotal = () => {
        let subtotal = 0;

        // Iterate through the products array
        products.forEach((item, index) => {
            // Convert quantity to a number
            // const quantityValue = parseInt(quantity[index]);
            const quantityValue = item.quantity

            // Check if quantity is a valid number
            if (!isNaN(quantityValue)) {
                // Calculate the subtotal for the current product and add it to the total
                subtotal += quantityValue * item.price;
            }
        });
        return subtotal;
    };



    const proceedPayment = () => {
        // console.log(quantity)
        // console.log(selectedSize)
        const subtotal = calculateSubtotal()
        setTotalAmount(subtotal)
        // setShowDetails(false)
        if (subtotal == 0) {
            alert("Pls add products in cart")
            return
        }
        // if (!selectedSize) {
        //     alert("Please Select Size")
        //     return
        // }
        setShowPayment(true)

    }


    const closePayment = () => {
        setShowPayment(false)
    }

    function e(item, index) {
        return (
            <div class="checkout-product-card">

                <div class="checkout-product-img-container">
                    <img src={item.product.imageUrl[0]} alt='Product image' />
                </div>
                <div class="checkout-product-details">
                    <div class="checkout-product-name">
                        <h2>{item.product.name}</h2>
                    </div>
                    <div class="checkout-product-price">
                        <h3>₹{item.product.price}</h3>
                    </div>
                </div>
                <div class="checkout-product-quantity">
                    {/* <input type="number" name="product-quantity" placeholder={quantity[index]} id="product-quantity" value={quantity[index]} */}
                    <input type="number" name="product-quantity" id="product-quantity" value={item.quantity}
                        min="1" max='5' onChange={(e => { updateQuantity(item.orderItem_id, e) })} />
                </div>
                <div class="checkout-product-size">
                    {/* <select id="dropdown" value={selectedSize[index]} onChange={(e => { handleSizeChange(index, e) })}> */}
                    <select id="dropdown" value={item.size} onChange={(e) => updateSize(item.orderItem_id, e)}>
                        {/* <option value="">{selectedSize}</option> */}
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                        <option value="XXL">XXL</option>
                    </select>
                </div>
                <div class="checkout-product-net-price">
                    <h3>{item.quantity * item.product.price || item.product.price}</h3>
                </div>
                <div class="checkout-product-cancel">
                    <IconButton onClick={() => removeFromCart(item.product.product_id, item.orderItem_id)}><CloseIcon /></IconButton>
                    {/* <button onClick={() => removeFromCart(item.product_id)} type="button">
                        cross
                    </button> */}
                </div>
                <hr />
            </div>
        )
    }

    const removeFromCart = async (product_id, orderItem_id) => {
        setLoading(true)
        const token = localStorage.getItem('token')
        const email = localStorage.getItem(`userEmail`)
        const productId = product_id
        const response = await fetch(`${process.env.REACT_APP_server_url}/api/v1/products/removeFromCart`, {
            method: "POST",
            body: JSON.stringify({
                orderItem_id,
                productId,
                email,
            }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });
        const result = await response.json();
        // console.log(result);
        // setLoading(false)
        window.location.reload();
    }

    const amount = calculateSubtotal() * 100;
    const currency = "INR";
    const receiptId = "qwsaq1";
    const paymentHandler = async (e) => {
        setShowPayment(false)
        const response = await fetch(`${process.env.REACT_APP_server_url}/api/v1/payment/order`, {
            method: "POST",
            body: JSON.stringify({
                email,
                amount,
                currency,
                receipt: receiptId,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const order = await response.json();
        // console.log(order);

        var options = {
            key: "rzp_test_DMvAPM0GH3nThd", // Enter the Key ID generated from the Dashboard
            amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency,
            name: "InstiBuzz", //your business name
            description: "Test Transaction",
            image: TaptiImg,
            order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            callback_url: "https://eneqd3r9zrjok.x.pipedream.net/",
            handler: async function (response) {
                const body = {
                    ...response,
                };

                const validateRes = await fetch(
                    `${process.env.REACT_APP_server_url}/api/v1/payment/order/validate`,
                    {
                        method: "POST",
                        body: JSON.stringify(body),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                const jsonRes = await validateRes.json();
                // console.log(jsonRes);
            },
            prefill: {
                //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
                name: "Web Dev Matrix", //your customer's name
                email: "webdevmatrix@example.com",
                contact: "9646071964", //Provide the customer's phone number for better conversion rates
            },
            notes: {
                address: "Razorpay Corporate Office",
            },
            theme: {
                color: "#3399cc",
            },
        };
        var rzp1 = new window.Razorpay(options);
        rzp1.on("payment.failed", function (response) {
            alert(response.error.code);
            alert(response.error.description);
            alert(response.error.source);
            alert(response.error.step);
            alert(response.error.reason);
            alert(response.error.metadata.order_id);
            alert(response.error.metadata.payment_id);
        });
        rzp1.open();
        e.preventDefault();
    };

    const confirmOrder = async () => {
        setLoading(true)
        const email = localStorage.getItem("userEmail")
        const token = localStorage.getItem("token")
        const response = await fetch(`${process.env.REACT_APP_server_url}/api/v1/payment/confirm`, {
            method: "POST",
            body: JSON.stringify({
                email,
                products,
                totalAmount,
                // quantity,
                // selectedSize
            }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });
        // console.log(response.body);
        setLoading(false)
        if (response.status == 404) {
            alert('Failed')
        } else {
            alert('Your order is Placed Successfully')
            // window.location.reload();
            navigate('/orders')
        }
    }

    const cancelOrder = () => {
        setShowPayment(false)
    }

    return (
        <div>
            {loading ? <LoadingPage /> :
                <div class="checkout-main-container">
                    <div class="checkout-my-cart">
                        <h1>My cart</h1>
                        <hr />
                        <div>
                            {products ?
                                products.map(e) :
                                <h3>Cart is Empty</h3>
                            }
                        </div>

                        <hr />
                    </div>
                    <div class="checkout-order-summary">
                        <h1>Order summary</h1>
                        <hr />
                        <div class="checkout-order-price-details">
                            <h2>Subtotal</h2>
                            <h2>₹{calculateSubtotal()}</h2>
                            <h2>Delivery charges</h2>
                            <h2><strike>₹70</strike>₹0</h2>
                            <div class="line-break">
                                <hr />
                            </div>
                            <h1>Total</h1>
                            <h1>₹{calculateSubtotal()}</h1>
                        </div>
                        <button class="checkout-btn" onClick={proceedPayment}>Checkout</button>

                    </div>
                    <div>
                        {/* {showDetails && (
                    <div className="cart-popup">
                        <div className='cart-popup-content'>
                            <div className='cart-popup-content-name'>
                                <p>Name</p>
                                <input type='text' className='cart-popup-content-name' placeholder='Enter Your name' value={name}
                                    onChange={(e) => { setName(e.target.value) }} />
                                {error && !name && <span className='invalid-input'>Enter valid name</span>}
                            </div>
                            <div className='cart-popup-content-email'>
                                <p>Email</p>
                                <input type='text' placeholder='Enter Your email' value={email}

                                    onChange={(e) => { setEmail(e.target.value) }} />
                                {error && !email && <span className='invalid-input'>Enter valid email</span>}
                            </div>
                            <div className='cart-popup-content-phone'>
                                <p>Phone Number</p>
                                <input type='text' placeholder='Enter Your phoneNumber' value={phoneNumber}

                                    onChange={(e) => { setPhoneNumber(e.target.value) }} />
                                {error && !phoneNumber && <span className='invalid-input'>Enter valid phoneNumber</span>}
                            </div>

                            <button className='cart-popup-content-button' onClick={proceedPayment}>Proceed</button>
                        </div>
                    </div>
                )} */}

                        {showPayment && (
                            <div className="cart-popup">
                                {/* <i className='fa fa-times' aria-hidden='true' onClick={setShowPayment(false)}></i> */}
                                <IconButton onClick={() => closePayment()}><CloseIcon /></IconButton>
                                <h1>Confirm Your Order?</h1>
                                <div className='cart-popup-content'>
                                    <button onClick={confirmOrder}>Yes</button>
                                    <button onClick={cancelOrder}>No</button>
                                    {/* <button onClick={paymentHandler}>Pay Now</button> */}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            }
        </div>
    )
}

export default Cart
