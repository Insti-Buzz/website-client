import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../css/Wishlist.css';
import LoadingPage from "./LoadingPage";

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

    const getWishlistedProducts = async () => {
        setLoading(true)
        const email = localStorage.getItem("userEmail");
        const token = localStorage.getItem("token");

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
                >
                    <img src={item.imageUrl[0]} alt="Image " />
                    <div className="shop-product-name">
                        <h2>{item.name}</h2>
                    </div>
                    <hr />
                    <div className='shop-product-style'>
                        <p>{(item.style == 'regular') ? "Regular T-Shirts" : "Oversized T-Shirts"}</p>
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