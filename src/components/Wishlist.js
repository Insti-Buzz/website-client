import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../css/Wishlist.css';
import LoadingPage from "./LoadingPage";
import CloseIcon from "@mui/icons-material/Close";
import { isExpired, decodeToken } from "react-jwt";
import { IconButton } from "@mui/material";
import emptyWishlistIllustration from "../assets/Illustrations/No items in wishlist.png";
import IllustrationPage from "./IllustrationPage";
var getSlug = require('speakingurl');

function Wishlist() {
    const [wishlistedProducts, setWishlistedProducts] = useState([]);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getWishlistedProducts();
        const email = localStorage.getItem("userEmail");
        const token = localStorage.getItem("token");
        if (!email || !token) {
            alert("Please Login");
            navigate("/");
        }
    }, []);

    const navigate = useNavigate();

    const checkAuth = async (email, token) => {
        const myDecodedToken = decodeToken(token);
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
                    body: JSON.stringify({ susEmailId: `${susEmailId}`, component: "Wishlist.js" }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            result = await result.json();

            if (result.status === 404) {
                // console.log("Error");
            } else {
                // console.log("Mail sent and notified to the team!");
            }
        } catch (error) {
            // consoleconsole.error("Error during suspicious activity notification", error);
        }
    };

    const getWishlistedProducts = async () => {
        setLoading(true)
        const email = localStorage.getItem("userEmail");
        const token = localStorage.getItem("token");

        const trueEmail = checkAuth(email, token);

        let result = await fetch(
            `${process.env.REACT_APP_server_url}/api/v1/products/get-wishlisted-products`,
            {
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

        result = await result.json();
        if (result.status == 404) {
            alert(result.message);
            localStorage.removeItem("userEmail");
            navigate("/");
            window.location.reload();
        } else {
            setWishlistedProducts(result.products);
        }

        setTimeout(() => {
            setLoading(false)
        }, 1000);
    }

    const removeFromWishlist = async (productId) => {
        setLoading(true)
        let email = localStorage.getItem("userEmail");
        let token = localStorage.getItem("token");

        let result = await fetch(
            `${process.env.REACT_APP_server_url}/api/v1/products/toggleWishlist`,
            {
                method: "POST",
                body: JSON.stringify({ email, productId }),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        result = await result.json();
        window.location.reload();
        if (result.status === 404) {
            alert(result.message);
            localStorage.removeItem("userEmail");
            navigate("/");
            window.location.reload();
        }
    }

    const productPage = async (productId, productLink, index) => {
        navigate(`/products/${getSlug(productLink)}/${productId}`);
    };

    function e(item, index) {
        const productId = item.product_id;
        return (
            <>
                <div className="shop-product-div">
                    <button
                        className="shop-product-card"
                    >
                        <div className="shop-product-img">
                            <div className="wishlist-remove-btn">
                                <IconButton onClick={() => removeFromWishlist(productId)}>
                                    <CloseIcon />
                                </IconButton>
                            </div>
                            <img src={item.imageUrl[0]} className='shop-image' alt="Product"
                                onClick={() => productPage(item.product_id, item.details, index)} />
                        </div>
                        <div className="shop-product-name">
                            <h2 className='h2-name'>{item.name}</h2>
                        </div>
                        <hr className='shop-product-card-divider' />
                        <div className='shop-product-style'>
                            <p className='product-style'>{
                                (item.style === 'regular') ? "Regular T-Shirt" :
                                    (item.style === 'hoodie') ? "Hoodie" :
                                    (item.style === 'sponsered') ? "Sponsered" :
                                        "Oversized T-Shirt"}</p>
                        </div>

                        <div className="shop-product-price">
                            <h3 className='price'>₹{item.price}<s>₹{item.style === 'hoodie' ? (parseInt(item.price) + 100) : (parseInt(item.price) + 50)}</s></h3>
                            <p>Inc. of all taxes</p>
                        </div>
                    </button>
                </div>
            </>
        );
    }

    return (
        <div>
            {loading ? <LoadingPage /> : <>
                {
                    (wishlistedProducts.length != 0)
                        ?
                        <div className="wishlist-main-container">
                            <h1>Wishlist</h1>
                            <div className="shop-products-display">
                                {wishlistedProducts.map(e)}
                            </div>
                        </div>
                        :
                        <IllustrationPage
                            heading="Your Wishlist Awaits!"
                            subheading="Time to Add Some Wishes"
                            img={emptyWishlistIllustration}
                            btnText="SHOP"
                            btnNavigate="/shop"
                        />
                }
            </>
            }
        </div>
    );
}

export default Wishlist