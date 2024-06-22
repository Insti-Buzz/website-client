import React, { useEffect, useState, CSSProperties } from "react";
import "../css/Address.css";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { IconButton } from "@mui/material";
import InstiBuzzLogo from '../assets/Horizontal Logo Transparent.png';

import CloseIcon from "@mui/icons-material/Close";
import LoadingPage from "./LoadingPage";

function Address() {
    const [products, setProducts] = React.useState([]);
    // const [quantity, setQuantity] = useState(Array(products.length).fill(''));
    // const [quantity, setQuantity] = useState(Array.from({ length: products.length }, () => 1));
    // const [quantity, setQuantity] = useState(Array(products.length).fill(1));
    const [quantity, setQuantity] = useState("1");
    // const [selectedSize, setSelectedSize] = useState(Array(products.length).fill());
    const [totalAmount, setTotalAmount] = React.useState();
    // const [showDetails, setShowDetails] = React.useState(false)
    const [showPayment, setShowPayment] = React.useState(false);
    const [name, setName] = React.useState('')
    const [phone, setPhone] = React.useState('')
    const [email, setEmail] = React.useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [pinCode, setPinCode] = useState('');
    const [validPin, setValidPin] = useState(true)
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [loading, setLoading] = useState(false);
    const [deliveryCharge, setDeliveryCharge] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState("COD");
    const [error, setError] = React.useState(false);


    const totalMrp = location.state.mrp;
    const noOfProducts = location.state.noOfProducts

    useEffect(() => {
        const name = localStorage.getItem('userName')
        const phone = localStorage.getItem('userPhone')
        const email = localStorage.getItem("userEmail");
        const token = localStorage.getItem("token");
        setEmail(email)
        setName(name)
        setPhone(phone)
        if (!email || !token) {
            alert("Please Login");
            navigate("/");
        }
        console.log(totalMrp)
    }, []);

    const setDeliveryCharges = async () => {
        const response = await fetch(`https://api.postalpincode.in/pincode/${pinCode}`);
        const data = await response.json();

        if (data[0].Status === "Error" || data[0].Status === "404") {
            setValidPin(false)
            alert("Enter a valid pin code")
        } else {
            setValidPin(true)
            const district = data[0].PostOffice[0].District;

            if (pinCode === "600036") {
                setDeliveryCharge(19);
            } else if (district === "Chennai") {
                setDeliveryCharge(49);
            } else {
                setDeliveryCharge(99);
            }
        }
    }

    const calculateSubtotal = () => {
        let subtotal = totalMrp;

        subtotal += deliveryCharge;

        return subtotal;
    };

    function RadioButtonGroup(props) {
        return (
            <div class="checkout-select-delivery">
                <label>
                    <p>Cash on Delivery.</p>
                    <input
                        type="radio"
                        value="COD"
                        checked={props.selectedOption === "COD"}
                        onChange={props.handleChange}
                    />
                </label>
                <label>
                    <p>Pay now</p>
                    <input
                        type="radio"
                        value="pay now"
                        checked={props.selectedOption === "pay now"}
                        onChange={props.handleChange}
                    />
                </label>
            </div>
        );
    }

    function handleChange(event) {
        setPaymentMethod(event.target.value);
    }

    const closePayment = () => {
        setShowPayment(false)
    }

    const proceedPayment = () => {
        const subtotal = calculateSubtotal()
        setTotalAmount(subtotal)

        if (!address1 || !address2 || !pinCode || !city || !state) {
            setError(true);
            return false;
            throw new Error("Enter Details");
        }
        if (!validPin) {
            alert("Please Enter Valid PinCode")
            return false;
        }
        setShowPayment(true)

    }

    const confirmOrder = async () => {
        const amount=totalAmount
        setLoading(true);
        const email = localStorage.getItem("userEmail");
        const token = localStorage.getItem("token");
        const isHomeDelivery = true;
        const response = await fetch(
            `${process.env.REACT_APP_server_url}/api/v1/payment/confirm`,
            {
                method: "POST",
                body: JSON.stringify({
                    email,
                    products,
                    amount,
                    isHomeDelivery,
                    address1,
                    address2,
                    pinCode,
                    city,
                    state
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
        if (response.status == 404) {
            alert(response.message)
            localStorage.removeItem("userEmail")
            navigate('/')
            window.location.reload();
        } else {
            alert('Your order is Placed Successfully')
            // window.location.reload();
            navigate('/orders')
        }
    };

    const amount = calculateSubtotal() ;
    const currency = "INR";
    const receiptId = "qwsaq1";

    const paymentHandler = async (e) => {
        const token = localStorage.getItem('token')

        setShowPayment(false)
        const isHomeDelivery=true
        localStorage.setItem("isHomeDelivery",isHomeDelivery)
        localStorage.setItem("totalAmount",totalAmount)
        const response = await fetch(`${process.env.REACT_APP_server_url}/api/v1/payment/order`, {

            method: "POST",
            body: JSON.stringify({
                email,
                amount,
                isHomeDelivery,
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
        const order = await response.json();
        window.location.href=order.link
        // console.log(order)

        if (order.status == 404) {
            alert(order.message)
            localStorage.removeItem("userEmail")
            navigate('/')
            window.location.reload();
        }
    };

    // const paymentHandler = async (e) => {
    //     setLoading(true)
    //     const token = localStorage.getItem('token')
    //     const isHomeDelivery = true
    //     setShowPayment(false)
    //     const response = await fetch(`${process.env.REACT_APP_server_url}/api/v1/payment/order`, {

    //         method: "POST",
    //         body: JSON.stringify({
    //             email,
    //             amount,
    //             currency,
    //             receipt: receiptId,
    //             isHomeDelivery,
    //             address1,
    //             address2,
    //             pinCode,
    //             city,
    //             state
    //         }),
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //     });
    //     const order = await response.json();
    //     if (order.status == 404) {
    //         alert(order.message)
    //         localStorage.removeItem("userEmail")
    //         navigate('/')
    //         window.location.reload();
    //     }
    //     // console.log(order);

    //     var options = {
    //         key: "rzp_live_4KDT1L43T3GoOI", // Enter the Key ID generated from the Dashboard
    //         amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    //         currency,
    //         name: "InstiBuzz", //your business name
    //         description: "Transaction",
    //         image: InstiBuzzLogo,
    //         order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    //         callback_url: "https://eneqd3r9zrjok.x.pipedream.net/",
    //         handler: async function (response) {
    //             const body = {
    //                 ...response,
    //                 email,
    //                 totalAmount
    //             };

    //             const validateRes = await fetch(
    //                 `${process.env.REACT_APP_server_url}/api/v1/payment/order/validate`,
    //                 {
    //                     method: "POST",
    //                     body: JSON.stringify(body),
    //                     headers: {
    //                         "Content-Type": "application/json",
    //                     },
    //                 }
    //             );
    //             const jsonRes = await validateRes.json();
    //             // console.log(jsonRes);
    //             // console.log(jsonRes.status);
    //             // console.log(jsonRes.msg);
    //             // console.log(jsonRes.razorpay_order_id);
    //             // console.log(jsonRes.razorpay_payment_id);
    //             if (jsonRes.status == 404) {
    //                 alert('Failed')
    //             } else {
    //                 alert('Your order is Placed Successfully')
    //                 // window.location.reload();
    //                 navigate('/orders')
    //             }
    //         },
    //         prefill: {
    //             //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
    //             name: name, //your customer's name
    //             email: email,
    //             contact: phone, //Provide the customer's phone number for better conversion rates
    //         },
    //         notes: {
    //             address: "Razorpay Corporate Office",
    //         },
    //         theme: {
    //             color: "#3399cc",
    //         },
    //     };
    //     var rzp1 = new window.Razorpay(options);
    //     rzp1.on("payment.failed", function (response) {
    //         // alert(response.error.code);
    //         alert(response.error.description);
    //         // alert(response.error.source);
    //         // alert(response.error.step);
    //         alert(response.error.reason);
    //         // alert(response.error.metadata.order_id);
    //         // alert(response.error.metadata.payment_id);
    //     });
    //     setTimeout(() => {
    //         setLoading(false)
    //     }, 1000);
    //     rzp1.open();
    //     e.preventDefault();
    // };

    return (
        <div>
            {
                loading ? <LoadingPage /> :
                    <div>
                        <div class="checkout-main-container">
                            <div class="address-form">
                                <h3>ADDRESS</h3>
                                <form>
                                    <input id={error && !address1 && "input-error"}autoComplete="disabled" type="text" placeholder="Address line 1*" name="address_line1" onChange={(e) => setAddress1(e.target.value)} required></input>
                                    <input id={error && !address2 && "input-error"} autoComplete="disabled" type="text" placeholder="Address line 2*" name="address_line2" onChange={(e) => setAddress2(e.target.value)} required></input>
                                    <input id={error && !pinCode && "input-error"} autoComplete="disabled" type="text" placeholder="Pin Code*" name="pin_code" onBlur={setDeliveryCharges} onChange={(e) => setPinCode(e.target.value)} required></input>
                                    <input id={error && !city && "input-error"} autoComplete="disabled" type="text" placeholder="City*" name="city" onChange={(e) => setCity(e.target.value)} required></input>
                                    <input id={error && !state && "input-error"} autoComplete="disabled" type="text" placeholder="State*" name="state" onChange={(e) => setState(e.target.value)} required></input>
                                    {/* <button class="cart-order-btn" onClick={toPaymentPage}>
                                        DELIVER TO THIS ADDRESS
                                    </button> */}
                                </form>
                            </div>
                            <div class="checkout-order-summary">
                                {/* <div class="checkout-delivery-method">
                                    <h3>PAYMENT METHOD</h3>
                                    <RadioButtonGroup
                                        selectedOption={paymentMethod}
                                        handleChange={handleChange}
                                    />
                                </div> */}
                                {/* <hr /> */}
                                <div class="checkout-price-details">
                                    <h3>
                                        PRICE DETAILS ({noOfProducts}{" "}
                                        {noOfProducts == 1 ? "item" : "items"})
                                    </h3>
                                    <div class="checkout-price-details">
                                        <div class="checkout-summary-details">
                                            <p>Total MRP</p>
                                            <p>₹{totalMrp}</p>
                                        </div>
                                        <div class="checkout-summary-details">
                                            <p>Platform Fee</p>
                                            <p>FREE</p>
                                        </div>
                                        <div class="checkout-summary-details">
                                            <p>Delivery Charges</p>
                                            <p>{(deliveryCharge == 0) ? "MAY VARY" : `₹${deliveryCharge}`}</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div class="checkout-total-amount">
                                        <p>Total Amount</p>
                                        <p>₹{calculateSubtotal()}</p>
                                    </div>
                                </div>
                                <button
                                    class="cart-order-btn"
                                    onClick={proceedPayment}
                                >
                                    {(paymentMethod === "COD") ? "PLACE ORDER" : "PROCEED TO PAYMENT"}
                                </button>

                                {showPayment && (
                                    <div className="cart-popup">
                                        {/* <i className='fa fa-times' aria-hidden='true' onClick={setShowPayment(false)}></i> */}
                                        <IconButton onClick={() => closePayment()}>
                                            <CloseIcon />
                                        </IconButton>
                                        <h1>Confirm Your Order?</h1>
                                        <div className="cart-popup-content">
                                            <button onClick={confirmOrder}>Cash On Delivery</button>
                                            {/* <button onClick={cancelOrder}>No</button> */}
                                            <button onClick={paymentHandler}>Pay Now</button>
                                        </div>
                                    </div>
                                )}

                            </div>
                        </div>
                    </div>
            }
        </div>

    );
}

export default Address;