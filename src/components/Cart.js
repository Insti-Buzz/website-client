import React, { useEffect, useState } from 'react'
import '../css/Cart.css'
import TungaImg from '../assets/Tunga.png'
import TaptiImg from '../assets/Tapti.png'

function Cart() {

    const [products, setProducts] = React.useState([])

    // const [quantity, setQuantity] = useState(Array(products.length).fill(''));  
    // const [quantity, setQuantity] = useState(Array.from({ length: products.length }, () => 1));
    const [quantity, setQuantity] = useState(Array(products.length).fill(1));
    const [totalAmount, setTotalAmount] = React.useState()
    const [showDetails, setShowDetails] = React.useState(false)
    const [showPayment, setShowPayment] = React.useState(false)

    // const [name, setName] = React.useState('')
    const [email, setEmail] = React.useState('')
    // const [phoneNumber, setPhoneNumber] = React.useState('')
    // const [error, setError] = React.useState(false)



    const handleInputChange = (index, event) => {
        const inputValue = event.target.value;

        // Allow only numbers by using a regular expression
        const sanitizedValue = inputValue.replace(/[^0-9]/g, '');

        // Create a new array with the updated value at the specified index
        const newValues = [...quantity];
        newValues[index] = sanitizedValue;

        setQuantity(newValues);
    };

    const calculateSubtotal = () => {
        let subtotal = 0;

        // Iterate through the products array
        products.forEach((item, index) => {
            // Convert quantity to a number
            const quantityValue = parseInt(quantity[index]);

            // Check if quantity is a valid number
            if (!isNaN(quantityValue)) {
                // Calculate the subtotal for the current product and add it to the total
                subtotal += quantityValue * item.price;
            }
        });
        return subtotal;
    };

    useEffect(() => {
        getProducts();
        
    }, [])

    const proceedPayment = () => {
        const subtotal = calculateSubtotal()
        setTotalAmount(subtotal)
        // setShowDetails(false)
        setShowPayment(true)

    }



    const getProducts = async () => {
        let result = await fetch('http://localhost:5000/api/v1/products/getProductsInCart', {
            body: JSON.stringify({
                email,
            }),
            headers: {
                "Content-Type": "application/json",
            },
            method: "Get"
        });
        result = await result.json();
        console.log(result);
        // for (let i = 0; i < result.length; i++) {
        //     const updatedProducts = result.filter(item => item._id === localStorage.getItem(`product${item._id}`));
        //     setProducts(updatedProducts);
        // }
        setProducts(result);
    }


    function e(item, index) {
        return (
            <div class="checkout-product-card">
                <div class="checkout-product-img-container">
                    <img src={TungaImg} alt="Tunga jersey" />
                </div>
                <div class="checkout-product-details">
                    <div class="checkout-product-name">
                        <h2>{item.name}</h2>
                    </div>
                    <div class="checkout-product-price">
                        <h3>₹{item.price}</h3>
                    </div>
                </div>
                <div class="checkout-product-quantity">
                    <input type="number" name="product-quantity" placeholder={quantity[index]} id="product-quantity" value={quantity[index]}
                        min="1" max='1' onChange={(e => { handleInputChange(index, e) })} />
                </div>
                <div class="checkout-product-net-price">
                    <h3>{quantity[index] * item.price}</h3>
                </div>
                <div class="checkout-product-cancel">
                    <button onClick={() => removeFromCart(item.product_id)} type="button">
                        cross
                    </button>
                </div>
                <hr />
            </div>
        )
    }

    const removeFromCart = async (id) => {
        console.log(id)
        const email=localStorage.getItem(`userEmail`)
        const productId=id
        const response = await fetch("http://localhost:5000/api/v1/products/removeFromCart", {
            method: "PUT",
            body: JSON.stringify({
                productId ,
                email,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const result = await response.json();
        console.log(result);
        window.location.reload();
    }

    const amount = calculateSubtotal() * 100;
    const currency = "INR";
    const receiptId = "qwsaq1";
    const paymentHandler = async (e) => {
        setShowPayment(false)
        const response = await fetch("http://localhost:5000/api/v1/payment/order", {
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
        console.log(order);

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
                    "http://localhost:5000/api/v1/payment/order/validate",
                    {
                        method: "POST",
                        body: JSON.stringify(body),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                const jsonRes = await validateRes.json();
                console.log(jsonRes);
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
        const email=localStorage.getItem("userEmail")
        const response = await fetch("http://localhost:5000/api/v1/payment/confirm", {
            method: "POST",
            body: JSON.stringify({
                email,
                products,
                totalAmount
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log(response)
        if(response.status==404){
            alert('Failed')
        }else{
            alert('Your order is Placed Successfully')
        window.location.reload();
        }
    }

    return (
        <div class="checkout-main-container">
            <div class="checkout-my-cart">
                <h1>My cart</h1>
                <hr />
                <div>
                    {products.map(e)}
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
                        <div className='cart-popup-content'>
                            <h1>How You Want to Pay</h1>
                            <button onClick={confirmOrder}>Cash On Delivery</button>
                            <button onClick={paymentHandler}>Pay Now</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Cart
