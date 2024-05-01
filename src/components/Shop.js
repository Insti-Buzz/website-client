import React from 'react'
import '../css/Shop.css'
import productImage from '../assets/Image.jpg'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingPage from './LoadingPage';
import Banner from '../assets/Shop-Banner.png'

function Shop() {
    const [ourProducts, setOurProducts] = useState([]);
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    const productPage = async (productId, index) => {
        navigate(`/product/${productId}`);
    };

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        setLoading(true)
        try {
            let result = await fetch(
                `${process.env.REACT_APP_server_url}/api/v1/products/get-product`,
                {
                    method: "POST",
                }
            );
            result = await result.json();
            setOurProducts(result);
            console.log(result)
        } catch (error) { }
        setLoading(false)
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
                console.log("style is empty");
                filteredProducts = activeFilteredProducts.filter((prod) => prod.sizeQuantities[0].size == value);
                setActiveProducts(filteredProducts);
            } else {
                console.log("style:", styleFilter);
                filteredProducts = activeFilteredProducts.filter((prod) => {
                    return prod.inventory[value] > 0 && (prod.style).toLowerCase() === styleFilter.toLowerCase();
                });
                setActiveProducts(filteredProducts);
            }
        } else if (filterBy === "style") {
            setStyleFilter(value);
            console.log(value);
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
            <div className="shop-product-div">
                <button
                    className="shop-product-card"
                    onClick={() => productPage(item.product_id, index)}
                >
                    <img src={item.imageUrl[0]} alt="Image " />
                    <div className="shop-product-name">
                        <h2>{item.name}</h2>
                    </div>
                    <div className="shop-product-price">
                        <h3>Rs. {item.price}</h3>
                    </div>
                </button>
            </div>
        );
    }

    return (
        <div className='shop'>
            {
                loading ? <LoadingPage /> :
                    <div>
                        <div className="shop-page-info">
                            <div className="shop-page-banner">
                                <img src={Banner}/>
                            </div>
                        </div>
                        <div className="shop-navigation-container">
                            <div className="shop-navigation">
                                <p className='shop-path'>Shop / <span style={{ color: 'black' }}>Our Products</span></p>
                                {/* <br /> */}
                                <p className='shop-count'><span style={{ color: 'black' }}>Our Products</span> - {activeProducts.length}</p>
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
                            <div className="shop-products-display">{activeProducts.map(e)}</div>
                        </div>
                    </div>
            }
        </div>


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