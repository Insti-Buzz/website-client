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
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [loading, setLoading] = useState(false);
    const [deliveryCharge, setDeliveryCharge] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState("COD");

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

        console.log(data);

        if (data[0].Status === "Error" || data[0].Status === '404') {
            alert("Enter a valid pin code")
        } else {
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

    return (
        <div>
            {
                loading ? <LoadingPage /> :
                    <div>
                        <div class="checkout-main-container">
                            <div class="address-form">
                                <h3>ADDRESS</h3>
                                <form>
                                    <input autoComplete="disabled" type="text" placeholder="Address line 1*" name="address_line1" onChange={(e) => setAddress1(e.target.value)} required></input>
                                    <input autoComplete="disabled" type="text" placeholder="Address line 2*" name="address_line2" onChange={(e) => setAddress2(e.target.value)} required></input>
                                    <input autoComplete="disabled" type="text" placeholder="Pin Code*" name="pin_code" onBlur={setDeliveryCharges} onChange={(e) => setPinCode(e.target.value)} required></input>
                                    <input autoComplete="disabled" type="text" placeholder="City*" name="city" onChange={(e) => setCity(e.target.value)} required></input>
                                    <input autoComplete="disabled" type="text" placeholder="State*" name="state" onChange={(e) => setState(e.target.value)} required></input>
                                    {/* <button class="cart-order-btn" onClick={toPaymentPage}>
                                        DELIVER TO THIS ADDRESS
                                    </button> */}
                                </form>
                            </div>
                            <div class="checkout-order-summary">
                                <div class="checkout-delivery-method">
                                    <h3>PAYMENT METHOD</h3>
                                    <RadioButtonGroup
                                        selectedOption={paymentMethod}
                                        handleChange={handleChange}
                                    />
                                </div>
                                <hr />
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
                                    // onClick={(paymentMethod === "COD") ? placeOrder : proceedPayment}
                                >
                                    {(paymentMethod === "COD") ? "PLACE ORDER" : "PROCEED TO PAYMENT"}
                                </button>
                            </div>
                        </div>
                    </div>
            }
        </div>

    );
}

export default Address;