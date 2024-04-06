import React, { useEffect, useState } from "react";
import "../css/Shop.css";
// import topImg from "../assets/22e53e_ef2ebbf33af24b7fba34e44589f3dc38~mv2.webp"
import topImg from "../assets/Untitled design.png";
// import prodImg from "../assets/Screenshot 2024-02-17 033151.png";

// import Img1 from "../assets/BossBaby1.png";
// import Img2 from "../assets/TakeLite1.jpg";
// import Img3 from "../assets/Green1.jpg";
// import Img4 from "../assets/White1.jpg";
// import Img5 from "../assets/BossBaby2.png";
// import Img7 from "../assets/Green2.jpg";
// import Img6 from "../assets/TakeLite2.jpg";
// import Img8 from "../assets/White2 (2).jpg";
// import Img9 from "../assets/Tapti.png"
// import Img10 from "../assets/Tapti.png"
// import Img11 from "../assets/Tapti.png"
// import Img12 from "../assets/Tapti.png"

import { Link, useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
// import "../assets/Screenshot"
import LoadingPage from "./LoadingPage";

function Shop() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false)
    // const images = [Img1, Img2, Img3, Img4, Img5, Img6, Img7, Img8];

    const navigate = useNavigate();

    const productPage = async (productId, index) => {
        localStorage.setItem("index", index);
        navigate(`/product/${productId}`);
    };

    useEffect(() => {
        // console.log("object")
        getProducts();
    }, []);

    const getProducts = async () => {
        // console.log("object");
        setLoading(true)
        try {
            let result = await fetch(
                "https://website-server-ijbv.onrender.com/api/v1/products/get-product",
                {
                    // headers:{

                    // }
                    method: "POST",
                }
            );
            // console.log(result)
            // console.log(result);
            result = await result.json();
            // console.log(result);
            setProducts(result);
        } catch (error) {
            // console.log(error);
        }
        setLoading(false)
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
                    {/* <Link className='home-right-product' to="/" >Product Details</Link> */}
                    <div className="shop-product-name">
                        <h2>{item.name}</h2>
                    </div>
                    {/* <h3 className='home-right-product'>{item.details}</h3> */}
                    <div className="shop-product-price">
                        <h3>Rs. {item.price}</h3>
                    </div>
                    {/* <p className='home-right-product'>({item.discount} margin)</p>
                <h3 className='home-right-product'>{item.colors}</h3> */}
                    {/* <Link className='shop-product-details' to={"/app/product/" + item.product_id} >Product Details</Link> */}
                </button>
            </div>
        );
    }

    return (
        <div>
            {
                loading ? <LoadingPage /> :


                    <div class="shop-body-container">

                        {/* <div class="shop-path-display">
                <span>
                    <a href="">Home</a>
                </span>
                <span>&gt;</span>
                <span>All Products</span>
            </div> */}
                        <div class="shop-main-container">
                            {/* <div class="shop-side-bar">
                    <div class="shop-browse-by-section">
                        <h3>Browse by</h3>
                        <hr />
                        <a href="">All Products</a>
                    </div>
                    <div class="shop-filter-section">
                        <h3>Filter by</h3>
                        <hr />
                        <div class="shop-filters">
                            <div class="shop-filter-price">
                                <p>Price</p>
                            </div>
                            <hr />
                            <div class="shop-filter-colour">
                                <p>Colour</p>
                            </div>
                            <hr />
                            <div class="shop-filter-size">
                                <p>Size</p>
                            </div>
                            <hr />
                        </div>
                    </div>
                </div> */}
                            <div class="shop-display">
                                <div class="shop-image-container">
                                    <img src={topImg} alt="Design" />
                                </div>
                                <div class="shop-products">
                                    <div class="shop-products-title">
                                        <h2>All Products</h2>
                                        <p>
                                            This is your category description. It’s a great place to tell
                                            customers what this category is about, connect with your
                                            audience and draw attention to your products.
                                        </p>
                                    </div>
                                    <div class="shop-products-count">
                                        <h2>{Object.keys(products).length} products</h2>
                                    </div>

                                    <div className="shop-products-display">{products.map(e)}</div>
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </div>
    );
}

export default Shop;
