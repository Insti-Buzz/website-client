import React, { useEffect, useState, CSSProperties } from "react";
import "../css/Address.css";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { IconButton } from "@mui/material";
import InstiBuzzLogo from '../assets/Horizontal Logo Transparent.png';
import { isEqual } from "lodash";
import CloseIcon from "@mui/icons-material/Close";
import LoadingPage from "./LoadingPage";
import { isExpired, decodeToken } from "react-jwt";
import MyOrders from "./MyOrders";
import toast from "react-hot-toast";
import addAddressIcon from "../assets/Address page/Add icon.png";


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
    const [id, setId] = useState();
    const [index, setIndex] = useState();
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [pinCode, setPinCode] = useState('');
    const [validPin, setValidPin] = useState(true)
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [loading, setLoading] = useState(false);
    const [delivery, setDelivery] = useState('pickup');
    const [deliveryCharge, setDeliveryCharge] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState("COD");
    const [error, setError] = React.useState(false);
    const [addresses, setAddresses] = React.useState([""])
    const [showAddAddress, setShowAddAddress] = useState(false)
    const [showEditAddress, setShowEditAddress] = useState(false)
    const [selectedAddressId, setSelectedAddressId] = useState('');
    const [totalMrp, setTotalMrp] = useState(0)
    const [noOfProducts, setNoOfProducts] = useState('')
    // const totalMrp=0,noOfProducts=0
    // const totalMrp = location.state.mrp;
    // const noOfProducts = location.state.noOfProducts

    useEffect(() => {
        // const mrp = localStorage.getItem('mrp')
        // const noOfProducts = localStorage.getItem('noOfProducts')
        if (!location.state) {
            navigate("/");
        } else {

            setTotalMrp(location.state.mrp);
            setNoOfProducts(location.state.noOfProducts);
            setDelivery(location.state.deliveryMethod);

            getProducts();
            getAddresses()

            const name = localStorage.getItem('name');
            const phone = localStorage.getItem('phone');
            const email = localStorage.getItem("userEmail");
            const token = localStorage.getItem("token");
            setEmail(email)
            setName(name)
            setPhone(phone)
            if (!email || !token) {
                alert("Please Login");
                navigate("/");
            }
            if (location.state.deliveryMethod == 'hostel') {
                setDeliveryCharge(19);
            } else if (location.state.deliveryMethod == 'delivery') {
                setDeliveryCharge(99);
            }
            // console.log(totalMrp)
        }
    }, []);

    const isValidPinCode = async () => {
        const response = await fetch(`https://api.postalpincode.in/pincode/${pinCode}`);
        const data = await response.json();

        if (data[0].Status === "Error" || data[0].Status === "404") {
            alert("Enter a valid pin code");
            setValidPin(false)
            return false;
        } else {
            setValidPin(true)
            return true;
            // const district = data[0].PostOffice[0].District;
            // setDeliveryCharge(99)
            // if (pinCode === "600036") {
            //     setDeliveryCharge(19);
            // } else if (district === "Chennai") {
            //     setDeliveryCharge(49);
            // } else {
            //     setDeliveryCharge(99);
            // }
        }
    }

    const calculateSubtotal = () => {
        let subtotal = parseInt(totalMrp);

        subtotal += deliveryCharge;
        // subtotal += deliveryCharge;
        // alert(deliveryCharge)

        return subtotal;
    };

    function RadioButtonGroup(props) {
        return (
            <div class="checkout-select-delivery">

            </div>
        );
    }

    function handleChange(event) {
        setPaymentMethod(event.target.value);
    }

    const setAddressField = (event) => {
        console.log(event.target.value);
        setSelectedAddressId(event.target.value);
        const index = addresses.findIndex((e) => e.id === event.target.value);
        // console.log(addresses[index]);
        setAddress1(addresses[index].address1);
        setAddress2(addresses[index].address2);
        setPinCode(addresses[index].pinCode);
        setCity(addresses[index].city);
        setState(addresses[index].state);
    }

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
            localStorage.removeItem('token');
            localStorage.removeItem('userEmail');
            localStorage.removeItem('name');
            localStorage.removeItem('phone');
            // result = {status: 404};
        }
    }

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
    }

    const susActivity = async (susEmailId) => {
        try {
            let result = await fetch(
                `${process.env.REACT_APP_server_url}/api/v1/auth/safetyProtocol`,
                {
                    method: "POST",
                    body: JSON.stringify({ susEmailId: `${susEmailId}`, component: 'Address.js' }),
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
    }

    const closePayment = () => {
        setShowPayment(false)
    }

    const closeAddress = () => {
        setShowAddAddress(false)
    }

    const proceedPayment = () => {
        const subtotal = calculateSubtotal()
        setTotalAmount(subtotal)

        if (selectedAddressId.length == 0) {
            alert("Select an address");
            return;
        }

        setShowPayment(true)

    }

    const confirmOrder = async () => {
        const amount = totalAmount
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
            // chooseComp(MyOrders,"My Orders")
            navigate('/profile/my-orders')
        }
    };

    const amount = calculateSubtotal();
    const currency = "INR";
    const receiptId = "qwsaq1";

    const paymentHandler = async (e) => {
        const token = localStorage.getItem('token')

        setShowPayment(false)
        const isHomeDelivery = true
        localStorage.setItem("isHomeDelivery", isHomeDelivery)
        localStorage.setItem("totalAmount", totalAmount)
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
        window.location.href = order.link
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

    const getAddresses = async () => {
        setLoading(true);
        const email = localStorage.getItem("userEmail");
        const token = localStorage.getItem("token");

        var result;
        if (email) {
            // console.log("trueEmail exists : ", trueEmail);
            result = await fetch(
                `${process.env.REACT_APP_server_url}/api/v1/auth/get-user-addresses`,
                {
                    method: "POST",
                    body: JSON.stringify({
                        email: email,

                    }),
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            result = await result.json();
            console.log(result)
            setTimeout(() => {
                setLoading(false)
            }, 1000);
        } else {
            localStorage.removeItem('token');
            localStorage.removeItem('userEmail');
            localStorage.removeItem('name');
            localStorage.removeItem('phone');
            //   result = {status: 404};      
        }

        if (result.status == 404) {
            localStorage.removeItem("userEmail");
            localStorage.removeItem("token");
            localStorage.removeItem("name");
            localStorage.removeItem("phone");
            setLoading(false);
            navigate("/");
            window.location.reload();
        } else {
            console.log("No issues")
            setAddresses(result);
            // console.log("orders:", orders);
        }
        if (result.length == 0) {
            setShowAddAddress(true);
        }
    };

    const saveAddress = async () => {
        if (!address1 || !address2 || !pinCode || !city || !state) {
            setError(true);
            throw new Error("Enter Details");
            return false;
        }
        if (!validPin) {
            setError(true);
            alert("Please Enter Valid PinCode")
            return false;
        }
        const email = localStorage.getItem("userEmail");
        const token = localStorage.getItem("token");

        var result;
        if (email) {
            try {


                setLoading(true);
                // console.log("trueEmail exists : ", trueEmail);
                result = await fetch(
                    `${process.env.REACT_APP_server_url}/api/v1/auth/add-user-address`,
                    {
                        method: "POST",
                        body: JSON.stringify({
                            email,
                            address1,
                            address2,
                            pinCode,
                            city,
                            state
                        }),
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                result = await result.json();
                // setLoading(false)
                window.location.reload();

                // console.log(result)
                // navigate('/address') 
                // setTimeout(() => {
                //     setLoading(false)
                // }, 1000);
            } catch (error) {
                alert(error)
            }
        } else {
            localStorage.removeItem('token');
            localStorage.removeItem('userEmail');
            localStorage.removeItem('name');
            localStorage.removeItem('phone');
        }
        if (result.status == 404) {
            localStorage.removeItem("userEmail");
            localStorage.removeItem("token");
            localStorage.removeItem("name");
            localStorage.removeItem("phone");
            setLoading(false);
            navigate("/");
            window.location.reload();
        } else {
            console.log("object")
        }
    }

    const removeAddress = async (index) => {
        const email = localStorage.getItem("userEmail");
        const token = localStorage.getItem("token");
        console.log(index)

        var result;
        if (email) {
            try {
                // console.log("trueEmail exists : ", trueEmail);
                setLoading(true)
                result = await fetch(
                    `${process.env.REACT_APP_server_url}/api/v1/auth/remove-user-address`,
                    {
                        method: "POST",
                        body: JSON.stringify({
                            email,
                            index
                        }),
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                result = await result.json();
                // setLoading(false)
                // alert(result.message)
                window.location.reload()
                setTimeout(() => {
                    setLoading(false)
                }, 1000);
            } catch (error) {
                alert(error)
            }
        } else {
            localStorage.removeItem('token');
            localStorage.removeItem('userEmail');
            localStorage.removeItem('name');
            localStorage.removeItem('phone');
        }
        if (result.status == 404) {
            localStorage.removeItem("userEmail");
            localStorage.removeItem("token");
            localStorage.removeItem("name");
            localStorage.removeItem("phone");
            setLoading(false);
            navigate("/");
            window.location.reload();
        }
    }

    const showEditPopup = (item, index) => {
        setId(item.id);
        setIndex(index);
        setAddress1(item.address1);
        setAddress2(item.address2);
        setCity(item.city);
        setState(item.state);
        setPinCode(item.pinCode);
        setShowEditAddress(true);
    }

    const closeEditPopup = () => {
        setId('');
        setAddress1('');
        setAddress2('');
        setCity('');
        setState('');
        setPinCode('');
        setShowEditAddress(false);
    }

    const editAddress = async () => {
        const email = localStorage.getItem("userEmail");
        const token = localStorage.getItem("token");

        if (!address1 || !address2 || !pinCode || !city || !state) {
            setError(true);
            throw new Error("Enter Details");
            return false;
        }
        if (email) {
            const isValidPin = await isValidPinCode();
            if (isValidPin) {
                let result = await fetch(
                    `${process.env.REACT_APP_server_url}/api/v1/auth/edit-user-address`,
                    {
                        method: "POST",
                        body: JSON.stringify({ id, email, index, address1, address2, pinCode, city, state }),
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    },
                );
                result = await result.json();
                console.log(result);
            } else {
                alert("Enter a valid pin code");
            }
        } else {
            localStorage.removeItem('token');
            localStorage.removeItem('userEmail');
            localStorage.removeItem('name');
            localStorage.removeItem('phone');
        }
    }

    const toPayment = () => {
        if (!selectedAddressId) {
            alert("Select a delivery address");
        } else {
            navigate("/payment",
                {
                    state: {
                        mrp: totalMrp,
                        deliveryMethod: delivery,
                        noOfProducts: noOfProducts,
                        address: {
                            address1,
                            address2,
                            city,
                            state,
                            pinCode,
                        }
                    }
                }
            );
        }
    }

    function e(item, index) {
        return (
            <>
                <div className="address-card">
                    <label>
                        <div className="address-card-content">
                            <div className="address-card-name">
                                <h3>{name}</h3>
                            </div>
                            <div className="address-card-address">
                                <p>{item.address1}, {item.address2},</p>
                                <p>{item.city}, {item.state}, Pin Code-{item.pinCode}</p>
                            </div>
                            <div className="address-card-phone">
                                <p>Mobile: {phone}</p>
                            </div>
                        </div>
                        <input type="radio" value={item.id} checked={selectedAddressId == item.id} onClick={setAddressField} />
                    </label>
                    <div className="address-card-buttons">
                        <div className="address-card-remove" onClick={() => removeAddress(index)}>
                            <h3>Remove</h3>
                        </div>
                        <div className="address-card-edit" onClick={() => showEditPopup(item, index)}>
                            <h3>Edit</h3>
                        </div>
                    </div>
                </div>

            </>
        )
    }
    const addressHandler = async (e) => {
        setShowAddAddress(true)
    }

    return (
        <div>
            {
                loading ? <LoadingPage /> :
                    <div>
                        <div className="checkout-navbar">
                            <div className="checkout-navbar-content">
                                <p style={{ color: "#00C437" }}>CART</p>
                                <div style={{ borderTop: "2px dashed #00C437" }} className="checkout-navbar-line checkout-navbar-line-1"></div>
                                <p style={{ color: "#004FC4" }}>ADDRESS</p>
                                <div className="checkout-navbar-line checkout-navbar-line-2"></div>
                                <p>PAYMENT</p>
                            </div>
                        </div>
                        <div class="checkout-main-container">
                            <div className="checkout-address-container">
                                <h2>Select Delivery Address</h2>
                                <div className="address-container">
                                    {addresses.map(e)}
                                </div>

                                <div className='add-address-btn' onClick={addressHandler}><img src={addAddressIcon} />Add Address</div>
                            </div>




                            <div class="checkout-order-summary">
                                <div className="checkout-order-summary-content">
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
                                                {/* <p>{(deliveryCharge == 0) ? "MAY VARY" : `₹${deliveryCharge}`}</p> */}
                                                <p>₹{deliveryCharge}</p>
                                            </div>
                                        </div>
                                        <hr />
                                        <div class="checkout-total-amount">
                                            <p>Total Amount</p>
                                            <p>₹{calculateSubtotal()}</p>
                                        </div>
                                    </div>
                                    <div className="cart-order-btn-container">
                                        <button
                                            class="cart-order-btn"
                                            onClick={toPayment}
                                        >
                                            PROCEED TO PAYMENT
                                        </button>
                                    </div>

                                    {showAddAddress && <div class="address-form cart-popup">
                                        <div className="cart-popup-close-btn">
                                            <IconButton onClick={() => closeAddress()}>
                                                <CloseIcon />
                                            </IconButton>
                                        </div>
                                        <h3>ADDRESS</h3>
                                        <div className="address-form-form">
                                            <label>Address line 1</label>
                                            <input id={error && !address1 && "input-error"} autoComplete="disabled" type="text" placeholder="Address line 1" value={address1} onChange={(e) => setAddress1(e.target.value)} required></input>
                                            <label>Address line 2</label>
                                            <input id={error && !address2 && "input-error"} autoComplete="disabled" type="text" placeholder="Address line 2" value={address2} onChange={(e) => setAddress2(e.target.value)} required></input>
                                            <label>Pin code</label>
                                            <input id={error && !pinCode && "input-error"} autoComplete="disabled" type="text" placeholder="Pin Code" value={pinCode} onBlur={isValidPinCode} onChange={(e) => setPinCode(e.target.value)} required></input>
                                            <label>City</label>
                                            <input id={error && !city && "input-error"} autoComplete="disabled" type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} required></input>
                                            <label>State</label>
                                            <input id={error && !state && "input-error"} autoComplete="disabled" type="text" placeholder="State" value={state} onChange={(e) => setState(e.target.value)} required></input>
                                            <button onClick={saveAddress}>Save Address</button>
                                            {/* <button class="cart-order-btn" onClick={toPaymentPage}>
                                        DELIVER TO THIS ADDRESS
                                    </button> */}
                                        </div>
                                    </div>}
                                    {showEditAddress && <div class="address-form cart-popup">
                                        <div className="cart-popup-close-btn">
                                            <IconButton onClick={closeEditPopup}>
                                                <CloseIcon />
                                            </IconButton>
                                        </div>
                                        <h3>EDIT ADDRESS</h3>
                                        {/* <form> */}
                                        <div className="address-form-form">
                                            <label>Address line 1</label>
                                            <input id={error && !address1 && "input-error"} autoComplete="disabled" type="text" placeholder="Address line 1" value={address1} onChange={(e) => setAddress1(e.target.value)} required></input>
                                            <label>Address line 2</label>
                                            <input id={error && !address2 && "input-error"} autoComplete="disabled" type="text" placeholder="Address line 2" value={address2} onChange={(e) => setAddress2(e.target.value)} required></input>
                                            <label>Pin code</label>
                                            <input id={error && !pinCode && "input-error"} autoComplete="disabled" type="text" placeholder="Pin Code" value={pinCode} onBlur={isValidPinCode} onChange={(e) => setPinCode(e.target.value)} required></input>
                                            <label>City</label>
                                            <input id={error && !city && "input-error"} autoComplete="disabled" type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} required></input>
                                            <label>State</label>
                                            <input id={error && !state && "input-error"} autoComplete="disabled" type="text" placeholder="State" value={state} onChange={(e) => setState(e.target.value)} required></input>
                                            <button onClick={editAddress}>Save Address</button>
                                            {/* <button class="cart-order-btn" onClick={toPaymentPage}>
                                        DELIVER TO THIS ADDRESS
                                    </button> */}
                                            {/* </form> */}
                                        </div>
                                    </div>}
                                    {
                                        // showPayment && (
                                        //     <div className="cart-popup">
                                        //         {/* <i className='fa fa-times' aria-hidden='true' onClick={setShowPayment(false)}></i> */}
                                        //         <IconButton onClick={() => closePayment()}>
                                        //             <CloseIcon />
                                        //         </IconButton>
                                        //         <h1>Confirm Your Order?</h1>
                                        //         <div className="cart-popup-content">
                                        //             {/* <button onClick={confirmOrder}>Cash On Delivery</button> */}
                                        //             {/* <button onClick={cancelOrder}>No</button> */}
                                        //             <button onClick={paymentHandler}>Pay Now</button>
                                        //         </div>
                                        //     </div>
                                        // )
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
            }
        </div>

    );
}

export default Address;