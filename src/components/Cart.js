import React, { useEffect, useState, CSSProperties } from "react";
import "../css/Cart.css";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import InstiBuzzLogo from '../assets/Horizontal Logo Transparent.png';

import CloseIcon from "@mui/icons-material/Close";
import LoadingPage from "./LoadingPage";
import MyOrders from './MyOrders.js';

import { isExpired, decodeToken } from "react-jwt";

function Cart() {
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
    const navigate = useNavigate("");
    const [loading, setLoading] = useState(false);
    const [delivery, setDelivery] = useState("pickup");
    const [deliveryCharges, setDeliveryCharges] = useState(0);
    const [promoCode, setPromoCode] = useState('')
    const [isDiscount, setIsDiscount] = useState(false)

    useEffect(() => {
        // const name = localStorage.getItem('userName')
        // const phone = localStorage.getItem('userPhone')
        const email = localStorage.getItem("userEmail");
        const token = localStorage.getItem("token");
        setEmail(email)
        // setName(name)
        // setPhone(phone)
        if (!email || !token) {
            alert("Please Login");
            navigate("/");
        } else {
            getProducts();
        }
    }, []);

    const checkAuth = async (email, token) => {
        const myDecodedToken = await decodeToken(token);
        if (myDecodedToken && myDecodedToken.email === email) {
            return myDecodedToken.email;
        } else {
            // console.log("Unauth Activity");
            localStorage.clear('token');
            localStorage.clear('userEmail');
            await susActivity(myDecodedToken.email);
            return null;
        }
    };

    const susActivity = async (susEmailId) => {
        try {
            let result = await fetch(
                `${process.env.REACT_APP_server_url}/api/v1/auth/safetyProtocol`,
                {
                    method: "POST",
                    body: JSON.stringify({ susEmailId: `${susEmailId}`, component: 'Cart.js' }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            result = await result.json();

            if (result.status === 404) {
                // console.log("Error");
            } else {
                // console.log("Action may result in Account Ban");
            }
        } catch (error) {
            // console.error("Error during suspicious activity notification", error);
        }
    };


    const getProducts = async () => {
        setLoading(true);
        const email = localStorage.getItem("userEmail");
        const token = localStorage.getItem("token");
        const trueEmail = await checkAuth(email, token);
        // console.log("trueEmail = ", trueEmail);
        // var result;
        if (trueEmail) {
            setEmail(trueEmail);
            // console.log("email to be sent in backend:"+email+"  trueemail:"+trueEmail)
            let result = await fetch(`${process.env.REACT_APP_server_url}/api/v1/products/getProductsInCart`, {
                method: "POST",
                body: JSON.stringify({
                    email,
                }),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
            );
            // console.log("from backeng result: "+result)
            result = await result.json();
            // console.log("after trueemail: ", result);
            setTimeout(() => {
                setLoading(false)
            }, 1000);
            if (result.status == 404) {
                // alert(result.message);
                // console.log("issue in fetching");
                localStorage.removeItem("userEmail");
                navigate("/");
                window.location.reload();
            } else {
                // console.log("Fetched Successfully");
                setProducts(result.products);
            }


        } else {
            // alert('drfrefr');
            localStorage.clear()
            // localStorage.removeItem('token');
            // localStorage.removeItem('userEmail');
            // localStorage.removeItem('name');
            // localStorage.removeItem('phone');
            // result = {status: 404};
        }


        // for (let i = 0; i < result.length; i++) {
        //     const updatedProducts = result.filter(item => item._id === localStorage.getItem(`product${item._id}`));
        //     setProducts(updatedProducts);
        // }

    };

    const updateSize = async (id, e) => {
        // setLoading(true);
        const email = localStorage.getItem(`userEmail`);
        const token = localStorage.getItem("token");
        const trueEmail = checkAuth(email, token);
        const updatedSize = e.target.value;
        const orderItem_id = id;
        const response = await fetch(`${process.env.REACT_APP_server_url}/api/v1/products/changeSizeInCart`, {
            method: "POST",
            body: JSON.stringify({
                orderItem_id,
                updatedSize,
                email,
            }),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        const result = await response.json();
        // setLoading(false);
        if (result.status == 404) {
            alert(result.message)
            localStorage.removeItem("userEmail")
            navigate('/')
        }
        window.location.reload();
    };

    const updateQuantity = async (id, e) => {
        // setLoading(true);
        const email = localStorage.getItem(`userEmail`);
        const token = localStorage.getItem("token");
        const trueEmail = checkAuth(email, token);

        const updatedQuantity = e.target.value;
        const orderItem_id = id;
        const response = await fetch(`${process.env.REACT_APP_server_url}/api/v1/products/changeQuantityInCart`, {
            method: "POST",
            body: JSON.stringify({
                orderItem_id,
                updatedQuantity,
                email,
            }),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        const result = await response.json();
        // console.log(result);
        if (result.status == 404) {
            alert(result.message)
            localStorage.removeItem("userEmail")
            navigate('/')
            window.location.reload();
        }
        window.location.reload();
        // setLoading(true)
    };

    const calculateMrp = () => {
        let total = 0;

        // Iterate through the products array
        products.forEach((item, index) => {
            // Convert quantity to a number
            // const quantityValue = parseInt(quantity[index]);
            const quantityValue = item.quantity;

            // Check if quantity is a valid number
            if (!isNaN(quantityValue)) {
                // Calculate the subtotal for the current product and add it to the total
                total += quantityValue * item.price;
            }
        });

        return total;
    };

    const calculateSubtotal = () => {
        let subtotal = calculateMrp() + deliveryCharges;
        return subtotal;
    };

    const proceedPayment = () => {
        // console.log(quantity)
        // console.log(selectedSize)
        const subtotal = calculateSubtotal();
        setTotalAmount(subtotal);
        // setShowDetails(false)
        if (subtotal == 0) {
            alert("Pls add products in cart");
            return;
        }
        // if (!selectedSize) {
        //     alert("Please Select Size")
        //     return
        // }
        setShowPayment(true);
    };

    const closePayment = () => {
        setShowPayment(false);
    };

    function isSizeDisabled(size, sizesAvailable) {
        const foundSize = sizesAvailable.find((s) => s.size === size);
        return foundSize ? foundSize.quantity === 0 : true;
    }

    function e(item, index) {
        const sizesAvailable = item.product.sizeQuantities;

        return (
            <div class="checkout-product-card">
                <div class="checkout-product-details">
                    <div class="checkout-product-img-container">
                        <img src={item.product.imageUrl[0]} alt="" />
                    </div>
                    <div class="checkout-product-info">
                        <h3>{item.product.name}</h3>
                        {/* <p>{item.product.details}</p> */}
                        <div class="checkout-product-input">
                            <div class="checkout-product-size">
                                <h5>Size:</h5>
                                {/* <select id="dropdown" value={selectedSize[index]} onChange={(e => { handleSizeChange(index, e) })}> */}
                                <select id="size-dropdown" value={item.size} onChange={(e) => updateSize(item.orderItem_id, e)}>
                                    {/* <option value="">{selectedSize}</option> */}
                                    <option value="XS" id="XS" disabled={isSizeDisabled("XS", sizesAvailable)}>XS</option>
                                    <option value="S" id="S" disabled={isSizeDisabled("S", sizesAvailable)}>S</option>
                                    <option value="M" id="M" disabled={isSizeDisabled("M", sizesAvailable)}>M</option>
                                    <option value="L" id="L" disabled={isSizeDisabled("L", sizesAvailable)}>L</option>
                                    <option value="XL" id="XL" disabled={isSizeDisabled("XL", sizesAvailable)}>XL</option>
                                    <option value="2XL" id="2XL" disabled={isSizeDisabled("2XL", sizesAvailable)}>2XL</option>
                                </select>
                            </div>
                            <div class="checkout-product-quantity">
                                <h5>Qty:</h5>
                                <select
                                    class="dropdown"
                                    id="quantity-dropdown"
                                    value={item.quantity}
                                    onChange={(e) => updateQuantity(item.orderItem_id, e)}
                                >
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                            </div>
                        </div>
                        <div class="checkout-product-price">
                            <p>₹{item.quantity * item.product.price}</p>
                        </div>
                    </div>
                </div>
                <div class="checkout-product-cancel">
                    <IconButton
                        onClick={() =>
                            removeFromCart(item.product.product_id, item.orderItem_id)
                        }
                    >
                        <CloseIcon />
                    </IconButton>
                </div>
            </div>
        );
    }

    const removeFromCart = async (product_id, orderItem_id) => {
        const token = localStorage.getItem("token");
        const email = localStorage.getItem(`userEmail`);
        const productId = product_id;
        console.log('called')
        const response = await fetch(`${process.env.REACT_APP_server_url}/api/v1/products/removeFromCart`, {
            method: "POST",
            body: JSON.stringify({
                orderItem_id,
                productId,
                email,
            }),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        const result = await response.json();
        if (result.status == 404) {
            alert(result.message)
            localStorage.removeItem("userEmail")
            navigate('/')
            window.location.reload();
        }
        // console.log(result);
        // setLoading(false)
        window.location.reload();
    };

    // const amount = calculateSubtotal() * 100;
    // const currency = "INR";
    // const receiptId = "qwsaq1";
    // const paymentHandler = async (e) => {
    //     const token = localStorage.getItem('token')
    //     setShowPayment(false)
    //     const isHomeDelivery=false
    //     const response = await fetch(`${process.env.REACT_APP_server_url}/api/v1/payment/order`, {

    //         method: "POST",
    //         body: JSON.stringify({
    //             email,
    //             amount,
    //             currency,
    //             isHomeDelivery,
    //             receipt: receiptId,
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
    //     rzp1.open();
    //     e.preventDefault();
    // };


    /////////////////////////////////PHONEPAY////////////////////////////////////////////

    var amount = calculateSubtotal();

    const paymentHandler = async (e) => {
        const token = localStorage.getItem('token')
        if (isDiscount) {
            amount = 0.9 * amount
        }
        setShowPayment(false)
        const isHomeDelivery = false
        localStorage.setItem("isHomeDelivery", isHomeDelivery)
        localStorage.setItem("totalAmount", amount)
        const response = await fetch(`${process.env.REACT_APP_server_url}/api/v1/payment/order`, {

            method: "POST",
            body: JSON.stringify({
                email,
                amount,
                isHomeDelivery,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const order = await response.json();
        window.location.href = order.link
        // console.log(order)

        if (order.status == 404) {
            alert(order.message)
            localStorage.removeItem("userEmail")
            navigate('/')
            window.location.reload();
        }
    };

    /////////////////////////////////PHONEPAY////////////////////////////////////////////

    var amount = calculateSubtotal();
    const confirmOrder = async () => {
        setLoading(true);
        if (isDiscount) {
            amount = 0.9 * amount
            // console.log(amount)
        }
        const email = localStorage.getItem("userEmail");
        const token = localStorage.getItem("token");
        const isHomeDelivery = delivery == "delivery" ? true : false;
        const response = await fetch(
            `${process.env.REACT_APP_server_url}/api/v1/payment/confirm`,
            {
                method: "POST",
                body: JSON.stringify({
                    email,
                    products,
                    amount,
                    isHomeDelivery,
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

    const cancelOrder = () => {
        setShowPayment(false);
    };

    // function RadioButtonGroup(props) {
    //     return (
    //         <div class="checkout-select-delivery">
    //             <label>
    //                 <p>Deliver at your doorstep.</p>
    //                 <input
    //                     type="radio"
    //                     value="delivery"
    //                     checked={props.selectedOption === "delivery"}
    //                     onClick={props.handleChange}
    //                 />
    //             </label>
    //             <label>
    //                 <p>Pickup from Saraswati.</p>
    //                 <input
    //                     type="radio"
    //                     value="pickup"
    //                     checked={props.selectedOption === "pickup"}
    //                     onClick={props.handleChange}
    //                 />
    //             </label>
    //         </div>
    //     );
    // }

    function handleChange(event) {
        console.log(event.target.value);
        setDelivery(event.target.value);
        switch (event.target.value) {
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
    }

    function applyPromoCode() {
        if (promoCode === "TEE20") {
            setIsDiscount(true)
        } else {
            alert("Invalid Code")
        }
    }

    const toAddress = () => {
        navigate("/address", {
            state: {
                mrp: isDiscount ? 0.9 * calculateMrp() : calculateMrp(),
                noOfProducts: products.length,
            }
        }
        );
        localStorage.setItem("mrp", isDiscount ? 0.9 * calculateMrp() : calculateMrp())
        localStorage.setItem("noOfProducts", products.length)
    }

    return (
        <div>
            {
                loading ? <LoadingPage /> :
                    <div>
                        {products.length != 0 ?
                            <div class="checkout-main-container">
                                <div class="checkout-my-cart">
                                    {products.map(e)}

                                </div>
                                <div class="checkout-order-summary">
                                    <div class="checkout-delivery-method">
                                        <h3>DELIVERY METHOD</h3>
                                        <div class="checkout-select-delivery">
                                            <label>
                                                <p>Pickup from Saraswati.</p>
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
                                    <hr />
                                    <div class="checkout-price-details">
                                        <h3>
                                            PRICE DETAILS ({products.length}{" "}
                                            {products.length == 1 ? "item" : "items"})
                                        </h3>
                                        <div class="checkout-price-details">
                                            <div class="checkout-summary-details">
                                                <p>Total MRP</p>
                                                <p>₹{calculateMrp()}</p>
                                            </div>
                                            <div class="checkout-summary-details">
                                                <p>Platform Fee</p>
                                                <p>FREE</p>
                                            </div>
                                            <div class="checkout-summary-details">
                                                <p>Delivery Charges</p>
                                                <p>{deliveryCharges == 0 ? "FREE" : "₹"+ deliveryCharges}</p>
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
                                            <p class="checkout-total-amount">₹{isDiscount ?
                                                <div> <s>{calculateSubtotal()}</s>  {0.9 * calculateSubtotal()}
                                                </div>
                                                :
                                                calculateSubtotal()}</p>
                                        </div>
                                    </div>
                                    <button
                                        class="cart-order-btn"
                                        onClick={
                                            delivery !== "delivery" ? proceedPayment : () => {
                                                toAddress()
                                            }}
                                    >{
                                            delivery !== "delivery" ? "PLACE ORDER" : "CONTINUE"
                                        }

                                    </button>
                                </div>

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
                            :
                            <div class="checkout-title">
                                <h3>Seems like your cart is empty...</h3>
                            </div>
                        }
                    </div>
            }
        </div>

    );
}

export default Cart;