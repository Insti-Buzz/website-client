import React, { useEffect } from 'react';
import "../css/Payment.css";
import LoadingPage from './LoadingPage';
import { useState } from 'react';
import InstiBuzzLogo from '../assets/973300f3-c585-48d9-9e8c-601a3ae24121.png';
import { useLocation, useNavigate } from 'react-router-dom';

function Payment() {
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const [mrp, setMrp] = useState(0);
    const [noOfProducts, setNoOfProducts] = useState(0);
    const [deliveryMethod, setDeliveryMethod] = useState('');
    const [deliveryCharges, setDeliveryCharges] = useState(0);
    const [email, setEmail] = React.useState("");
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [pinCode, setPinCode] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [hostel, setHostel] = useState();
    const [name, setName] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [paymentMethod, setPaymentMethod] = useState('upi');

    useEffect(() => {
        console.log(location.state)
        if (!location.state) {
            navigate("/");
        } else {
            console.log(location.state);
            setMrp(location.state.mrp);
            setNoOfProducts(location.state.noOfProducts);
            setDeliveryMethod(location.state.deliveryMethod);

            if (location.state.hostel) {
                setHostel(location.state.hostel);
            } else if (location.state.address) {
                setAddress1(location.state.address.address1);
                setAddress2(location.state.address.address2);
                setCity(location.state.address.city);
                setState(location.state.address.state);
                setPinCode(location.state.address.pinCode);
            }

            console.log(location.state)

            switch (location.state.deliveryMethod) {
                case 'pickup':
                    setDeliveryCharges(0);
                    break;
                case 'hostel':
                    setDeliveryCharges(19);
                    break;
                case 'delivery':
                    setDeliveryCharges(99);
                    break;
                default:
                    setDeliveryCharges(0);
                    break;
            }

            if (location.state.hostel) {
                setHostel(location.state.hostel);
            }

            if (location.state.deliveryMethod != 'pickup') {
                document.getElementById('cod').disabled = true;
                document.querySelector('.cod-method').classList.add('disabled-method');
            }

            const name = localStorage.getItem('userName');
            const phone = localStorage.getItem('userPhone');
            const email = localStorage.getItem("userEmail");
            const token = localStorage.getItem("token");
            setEmail(email)
            setName(name)
            setPhone(phone)
            if (!email || !token) {
                alert("Please Login");
                navigate("/");
            }
        }
    }, []);

    const calculateSubtotal = () => {
        let subtotal = parseInt(mrp);

        subtotal += deliveryCharges;
        // subtotal += deliveryCharge;
        // alert(deliveryCharge)

        return subtotal;
    };

    const confirmOrder = async () => {
        var amount = calculateSubtotal();
        setLoading(true);
        // if (isDiscount) {
        //     amount = 0.9 * amount
        //     // console.log(amount)
        // }
        const email = localStorage.getItem("userEmail");
        const token = localStorage.getItem("token");
        const response = await fetch(
            `${process.env.REACT_APP_server_url}/api/v1/payment/confirm`,
            {
                method: "POST",
                body: JSON.stringify({
                    email,
                    amount,
                    deliveryMethod,
                    // quantity,
                    // selectedSize
                }),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        // console.log(response.body);
        setTimeout(() => {
            setLoading(false)
        }, 1000);
        console.log(response)
        if (response.status == 404) {
            alert(response.message)
            localStorage.removeItem("userEmail")
            navigate('/')
            window.location.reload();
        } else {
            alert('Your order is Placed Successfully');
            // chooseComp(MyOrders, "My Orders");
            // window.location.reload();
            navigate('/profile/my-orders')
        }
    };

    const paymentHandler = async (e) => {
        // console.log("payment called")
        // console.log(email)
        // // localStorage.setItem("deliveryMethod", deliveryMethod)
        // // localStorage.setItem("totalAmount", totalAmount)
        // console.log(deliveryMethod)
        // console.log(hostel)
        // console.log(state)

        const token = localStorage.getItem('token')
        const amount = calculateSubtotal();
        // console.log(totalAmount)

        const response = await fetch(`${process.env.REACT_APP_server_url}/api/v1/payment/order`, {

            method: "POST",
            body: JSON.stringify({
                email,
                amount,
                deliveryMethod,
                hostel,
                address1,
                address2,
                pinCode,
                city,
                state
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        localStorage.setItem('userEmail', email)
        localStorage.setItem('totalAmount', amount)
        localStorage.setItem('deliveryMethod', deliveryMethod)
        const order = await response.json();
        console.log(order);
        window.location.href = order.link
        // console.log(order)

        if (order.status == 404) {
            alert(order.message)
            localStorage.removeItem("userEmail")
            // navigate('/')
            // window.location.reload();
        }
    };

    function handleChange(event) {
        console.log(event.target.value);
        setPaymentMethod(event.target.value);
    }

    return (
        <div>
            {
                loading ? <LoadingPage /> :
                    <div>
                        <div className="checkout-navbar">
                            <img src={InstiBuzzLogo} onClick={() => navigate("/")} />
                            <div className="checkout-navbar-content">
                                <p style={{ color: "#00C437" }}>CART</p>
                                <div style={{ borderTop: "2px dashed #00C437" }} className="checkout-navbar-line checkout-navbar-line-1"></div>
                                <p style={{ color: "#00C437" }}>ADDRESS</p>
                                <div style={{ borderTop: "2px dashed #00C437" }} className="checkout-navbar-line checkout-navbar-line-2"></div>
                                <p style={{ color: "#004FC4" }}>PAYMENT</p>
                            </div>
                        </div>
                        <div class="checkout-main-container">
                            <div class="checkout-address-container">
                                <h2>Payment Method</h2>
                                <label className='payment-method cod-method'>
                                    <div className='payment-method-text'>
                                        <h3>Cash on Delivery</h3>
                                        <p>(Cash on Delivery is only available for pickup.)</p>
                                    </div>
                                    <input id='cod' type='radio' value="cod" checked={paymentMethod === 'cod'} onClick={handleChange} />
                                </label>
                                <label className='payment-method upi-method'>
                                    <div className='payment-method-text'>
                                        <h3>Pay Online</h3>
                                        <p>(UPI, card and net banking is available.)</p>
                                    </div>
                                    <input id='upi' type='radio' value="upi" checked={paymentMethod === 'upi'} onClick={handleChange} />
                                </label>
                            </div>
                            {/* <div className='payment-method'>
                                <h2>Choose Payment Method</h2>
                            </div> */}
                            <div class="checkout-order-summary">
                                <div className="checkout-order-summary-content">
                                    {/* <div class="checkout-delivery-method">
                                    <h3>DELIVERY METHOD</h3>
                                    <div class="checkout-select-delivery">
                                        <label>
                                            <p>Pickup from Saraswathi.</p>
                                            <input
                                                type="radio"
                                                value="pickup"
                                                checked={delivery === "pickup"}
                                                onClick={handleChange}
                                            />
                                        </label>
                                        <label>
                                            <p>Deliver to your hostel.</p>
                                            <input
                                                type="radio"
                                                value="hostel"
                                                checked={delivery === "hostel"}
                                                onClick={handleChange}
                                            />
                                        </label>
                                        <label>
                                            <p>Deliver outside IITM.</p>
                                            <input
                                                type="radio"
                                                value="delivery"
                                                checked={delivery === "delivery"}
                                                onClick={handleChange}
                                            />
                                        </label>
                                    </div>
                                </div>
                                <hr /> */}
                                    <div class="checkout-price-details">
                                        <h3>
                                            PRICE DETAILS ({noOfProducts}{" "}
                                            {noOfProducts == 1 ? "item" : "items"})
                                        </h3>
                                        <div class="checkout-price-details">
                                            <div class="checkout-summary-details">
                                                <p>Total MRP</p>
                                                <p>₹{mrp}</p>
                                            </div>
                                            <div class="checkout-summary-details">
                                                <p>Platform Fee</p>
                                                <p>FREE</p>
                                            </div>
                                            <div class="checkout-summary-details">
                                                <p>Delivery Charges</p>
                                                <p>{deliveryCharges == 0 ? "FREE" : "₹" + deliveryCharges}</p>
                                            </div>
                                            <div class="checkout-summary-details">
                                                {/* <input className=""
                                                    placeholder="Promo Code"
                                                    value={promoCode}
                                                    onChange={(e) => {
                                                        setPromoCode(e.target.value);
                                                    }}
                                                /> */}
                                                {/* <button onClick={applyPromoCode}>Apply</button> */}
                                            </div>
                                        </div>
                                        <hr />
                                        <div class="checkout-total-amount">
                                            <p>Total Amount</p>
                                            <p class="checkout-total-amount">₹{calculateSubtotal()}</p>
                                        </div>
                                    </div>
                                    <div className="cart-order-btn-container">
                                        <button class="cart-order-btn" onClick={paymentMethod == 'cod' ? confirmOrder : paymentHandler}>
                                            {
                                                paymentMethod == 'cod' ? "PLACE ORDER" : "PAY"
                                            }
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* {showPayment && (
                                    <div className="cart-popup">
                                        <i className='fa fa-times' aria-hidden='true' onClick={setShowPayment(false)}></i>
                                        <IconButton onClick={() => closePayment()}>
                                            <CloseIcon />
                                        </IconButton>
                                        <h1>Confirm Your Order?</h1>
                                        <div className="cart-popup-content">
                                            <button onClick={confirmOrder}>Cash On Delivery</button>
                                            <button onClick={cancelOrder}>No</button>
                                            <button onClick={paymentHandler}>Pay Now</button>
                                        </div>
                                    </div>
                                )} */}
                        </div>

                    </div>
            }
        </div>
    )
}

export default Payment
