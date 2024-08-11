import React from 'react'
import '../css/Shop.css'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import LoadingPage from './LoadingPage';
import Banner from '../assets/Shop-Banner.jpg'
import mobileBanner from '../assets/Shop-mobile-banner.jpg'
import { Helmet } from 'react-helmet';
var getSlug = require('speakingurl');

function Shop() {
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "instant",
        });
        // const scrollToTop = () => {
        // }
    }, []);
    const [ourProducts, setOurProducts] = useState([]);
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate();

    const productPage = async (productId, productLink, index) => {
        navigate(`/products/${getSlug(productLink)}/${productId}`);
    };

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        // setLoading(true)
        try {
            let result = await fetch(
                `${process.env.REACT_APP_server_url}/api/v1/products/get-product`,
                {
                    method: "POST",
                }
            );
            result = await result.json();
            setOurProducts(result);
            setLoading(false);
            // console.log(result)
        } catch (error) {
            // console.log(error);

        }
        // // setTimeout(() => {
        // //     setLoading(false)
        // // }, 1000);
    };



    const [activeProducts, setActiveProducts] = useState(ourProducts);

    useEffect(() => {
        setActiveProducts(ourProducts)
    }, [ourProducts]);


    let filteredProducts = [];
    let activeFilteredProducts = ourProducts;
    const [sizeFilter, setSizeFilter] = useState("");
    const [styleFilter, setStyleFilter] = useState("");

    const handleButtonClick = (filterBy, value) => {
        activeFilteredProducts = ourProducts;
        if (filterBy === "size") {
            setSizeFilter(value);
            if (styleFilter === "") {
                // console.log("style is empty");
                filteredProducts = activeFilteredProducts.filter((prod) => prod.sizeQuantities[0].size == value);
                setActiveProducts(filteredProducts);
            } else {
                // console.log("style:", styleFilter);
                filteredProducts = activeFilteredProducts.filter((prod) => {
                    return prod.inventory[value] > 0 && (prod.style).toLowerCase() === styleFilter.toLowerCase();
                });
                setActiveProducts(filteredProducts);
            }
        } else if (filterBy === "style") {
            setStyleFilter(value);
            // console.log(value);
            if (sizeFilter === "") {
                filteredProducts = activeFilteredProducts.filter((prod) => (prod.style) === value);
                setActiveProducts(filteredProducts);
            } else {
                filteredProducts = activeFilteredProducts.filter((prod) => {
                    return (prod.style).toLowerCase() === value.toLowerCase() && prod.inventory[sizeFilter] > 0;
                });
                setActiveProducts(filteredProducts);
            }
        }
    }


    function handleClearFilterClick() {
        setSizeFilter("");
        setStyleFilter("");
        setActiveProducts(ourProducts)
    }

    function e(item, index) {
        const productId = item.product_id;
        return (
            <>
                <div className="shop-product-div">
                    <button
                        className="shop-product-card"
                        onClick={() => productPage(item.product_id, item.details, index)}
                    >

                        <img src={item.imageUrl[0]} className='shop-image' alt="Product" />

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

    function ProductCards() {
        const cards = [];

        for (let i = 0; i <= 10; i++) {
            cards.push(
                <div className="shop-product-div" key={i}>
                    <button className="shop-product-card">
                        <div className="shop-image loader"></div>
                        <div className="shop-product-name">
                            <h2 className="h2-name loader"> </h2>
                        </div>
                        <hr />
                        <div className="shop-product-style">
                            <p className="product-style loader"></p>
                        </div>
                        <div className="shop-product-price">
                            <h3 className="price loader"> </h3>
                        </div>
                    </button>
                </div>
            );
        }

        return cards;
    }

    return (
        <>
            <Helmet>
                <meta name="title" content="Shop at InstiBuzz" />
                <meta name="description" content="At InstiBuzz, we celebrate the vibrant campus life by offering an exclusive
                collection of T-shirts that feature Insti slang, taglines, and campus spirit
                designs. We carefully select each piece in our collections, making sure that it
                meets our high standards. Our T-shirts feel exceptional because they are
                expertly crafted to fit well, last long and look great. Shop today and experience
                the campus spirit." />
                <meta name="keywords" content="InstiBuzz, instibuzz, IIT Madras, College Fashion, College Culture" />
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="theme-color" content="#000000" />
                <meta name="robots" content="all" />

                <meta name="og:site_name" content="InstiBuzz" />
                <meta name="og:title" content="Shop at InstiBuzz" />
                <meta name="og:description" content="At InstiBuzz, we celebrate the vibrant campus life by offering an exclusive
                collection of T-shirts that feature Insti slang, taglines, and campus spirit
                designs. We carefully select each piece in our collections, making sure that it
                meets our high standards. Our T-shirts feel exceptional because they are
                expertly crafted to fit well, last long and look great. Shop today and experience
                the campus spirit."/>
                <meta name="og:url" content="https://www.instibuzz.com/shop" />
                <meta name="og:image" content="%PUBLIC_URL%/logo192.png" />
                <meta name="og:image:alt" content="Official logo of InstiBuzz Pvt Ltd." />
                <meta name="author" content="instibuzz" />
            </Helmet>
            <div className='shop'>
                {
                    // loading ? <LoadingPage /> :
                    <div>
                        <div className="shop-page-info">
                            <div className="shop-page-banner">
                                <img src={Banner} alt='Banner for advertising on InstiBuzz Shop page' className='ban-img loader' />
                            </div>
                            <div className="shop-page-banner-mobile">
                                <img src={mobileBanner} alt='Banner for advertsing on Shop page' className='ban-img-mob loader' />
                            </div>
                        </div>
                        <div className='shop-main-container'>

                            <div className="shop-navigation-container">
                                <div className="shop-navigation">
                                    {/* <p className='shop-path'>Shop / <span style={{ color: 'black' }}>Our Products</span></p> */}
                                    {/* <br /> */}
                                    <p className='shop-count'><span>Our Products-{loading ? <div className='p-qty'></div> : activeProducts.length}</span></p>
                                </div>
                            </div>
                            <div className="shop-container">
                                {/* <div className="shop-filter-container">
                                <div className="header">
                                    <p>Filter</p>
                                    <div className="shop-clear-all" onClick={handleClearFilterClick}>Clear</div>
                                    </div>
                                    <div className="filter-bar"> */}
                                {/* <div className="size-filter">
                            <h3>SIZE</h3>
                            <div className="s-filter sz-fil">S
                                <Button filterBy="size" value="S" handleClick={handleButtonClick} active={sizeFilter === 'S'} />
                                </div>
                                <div className="m-filter sz-fil">M
                                <Button filterBy="size" value="M" handleClick={handleButtonClick} active={sizeFilter === 'M'} />
                                </div>
                                <div className="l-filter sz-fil">L
                                <Button filterBy="size" value="L" handleClick={handleButtonClick} active={sizeFilter === 'L'} />
                                </div>
                                <div className="xl-filter sz-fil">XL
                                <Button filterBy="size" value="XL" handleClick={handleButtonClick} active={sizeFilter === 'XL'} />
                                </div>
                                <div className="xxl-filter sz-fil">XXL
                                <Button filterBy="size" value="XXL" handleClick={handleButtonClick} active={sizeFilter === 'XXL'} />
                                </div>
                                
                                </div> */}
                                {/* <div className="style-filter">
                                        <h3>STYLE</h3>
                                        <div className="normal-filter sty-fil">Regular
                                        <Button filterBy="style" value="regular" handleClick={handleButtonClick} active={styleFilter === 'regular'} />
                                        </div>
                                        <div className="oversized-filter sty-fil">OverSized
                                        <Button filterBy="style" value="oversized" handleClick={handleButtonClick} active={styleFilter === 'oversized'} />
                                        </div>
                                        
                                        </div> */}
                                {/* </div>
                            </div> */}
                                <div className="shop-products-display" style={loading ? { height: "300px", overflow: "hidden" } : {}}>{loading ? ProductCards() : activeProducts.map(e)}</div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

const Button = ({ filterBy, value, handleClick, active }) => {
    return (
        <div
            className={`sz-btn ${active ? 'active' : ''}`}
            onClick={() => {
                handleClick(filterBy, value);
            }}
        >
        </div>
    );
};

export default Shop