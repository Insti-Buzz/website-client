import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../css/Wishlist.css';
import LoadingPage from "./LoadingPage";

import { isExpired, decodeToken } from "react-jwt";

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
        }else {
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
                    body: JSON.stringify({ susEmailId: `${susEmailId}` , component:"Wishlist.js" }),
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

    const productPage = async (productId, index) => {
        navigate(`/product/${productId}`);
    };

    function e(item, index) {
        const productId = item.product_id;
        return (
            <div className="shop-product-div">
                <button
                    className="shop-product-card"
                    onClick={() => productPage(item.product_id, index)}
                    // style={{height:'fit-content'}}
                >
                    <img src={item.imageUrl[0]} alt="Image "  style={{height:'35vh',width:'100%',objectFit:'cover'}}/>
                    <div className="shop-product-name">
                        <h2>{item.name}</h2>
                    </div>
                    <hr />
                    <div className='shop-product-style'>
                        <p>{
                            (item.style === 'regular') ? "Regular T-Shirt" :
                            (item.style === 'hoodie') ? "Hoodie" :
                            "Oversized T-Shirt"}</p>
                    </div>
                    <div className="shop-product-price">
                        <h3>₹{item.price}</h3>
                    </div>
                </button>
            </div>
        );
    }

    return (
        <div>
            {loading ? <LoadingPage /> :
                <div class="wishlist-main-container">
                    <h1>Wishlist</h1>
                    {
                        (wishlistedProducts.length != 0)
                            ?
                            <div className="shop-products-display">
                                {wishlistedProducts.map(e)}
                            </div>
                            :
                            <div><h2>There are no items in your wishlist...</h2></div>
                    }
                </div>
            }
        </div>
    );
}

export default Wishlist