import React, { useEffect, useState } from "react";
import "../css/Product.css";

import { useNavigate, useParams } from "react-router-dom";
import LoadingPage from "./LoadingPage";

import { isExpired, decodeToken } from "react-jwt";

const Product = () => {
  const [imageUrl, setImageUrl] = React.useState([]);
  const [selectedImage, setSelectedImage] = React.useState(imageUrl[0]);
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    getProductDetails();
    const email = localStorage.getItem("userEmail");
    const token = localStorage.getItem("token");
    if (token) {
      const myDecodedToken = decodeToken(token);
      const isMyTokenExpired = isExpired(token); 
      if ( myDecodedToken.email === process.env.REACT_APP_admin_email && !isMyTokenExpired) {
        setIsAdmin(true);
      }
    }
    if (email) setIsLogin(true);  
  }, []);

  useEffect(() => {
    if (imageUrl.length > 0) {
      setSelectedImage(imageUrl[0]);
    }
  }, [imageUrl]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  const [name, setName] = React.useState();
  const [price, setPrice] = React.useState();
  const [details, setDetails] = React.useState();
  const [quantity, setQuantity] = React.useState("1");
  const [isCart, setIsCart] = React.useState();
  const navigate = useNavigate();
  const params = useParams();
  const [isLogin, setIsLogin] = React.useState(false);
  const [sizesAvailable, setSizesAvailable] = React.useState([]);

  useEffect(() => {
    if (sizesAvailable) {
      sizesAvailable.forEach((element) => {
        if (element.quantity === 0) {
          document.getElementById(element.size).disabled = true;
        }
      });
    }
  }, [sizesAvailable]);

  useEffect(() => {
    if (isLogin) {
      isProductWishlisted();
    }
  }, [isLogin])

  const selectImage = (type) => {
    setSelectedImage(type);
  };

  const isProductWishlisted = async () => {
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
    }

    const wishlist = result.products;
    const wishlistId = wishlist.map((product) => {
      return product.product_id;
    })

    let productId = params.id;
    if (wishlistId.includes(productId)) {
      setIsWishlisted(true);
    }
    setLoading(false)
  }

  const getProductDetails = async () => {
    // console.log(params)
    setLoading(true);
    // let result = await fetch(`${process.env.REACT_APP_server_url}/api/v1/products/get-product-details/${params.id}`, {
    // console.log(params)
    let result = await fetch(
      `${process.env.REACT_APP_server_url}/api/v1/products/get-product-details/${params.id}`,
      {
        method: "POST",
      }
    );

    result = await result.json();
    setLoading(false);
    setName(result.name);
    setPrice(result.price);
    // setSize(result.sizes)
    setImageUrl(result.imageUrl);
    setDetails(result.details);
    setSizesAvailable(result.sizeQuantities);
    // console.log(sizesAvailable);
  };

  const toggleWishlist = async () => {
    setLoading(true)
    if (isLogin) {
      let email = localStorage.getItem("userEmail");
      let token = localStorage.getItem("token");
      const productId = params.id;

      setIsWishlisted(!isWishlisted);

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
      setLoading(false)
      if (result.status === 404) {
        alert(result.message);
        localStorage.removeItem("userEmail");
        navigate("/");
        window.location.reload();
      }
    } else {
      alert('Login to add products to wishlist');
    }
  }

  const addToCart = async () => {
    let email = localStorage.getItem("userEmail");
    let token = localStorage.getItem("token");
    var selectedSize = document.querySelector('input[name="radios"]:checked');
    if (!selectedSize) {
      alert("Please Select Size");
      return;
    }
    selectedSize = selectedSize.value;
    // console.log(token)
    if (!email) {
      alert("Please Login");
      navigate("./login");
    }
    setLoading(true);
    let productId = params.id;
    // console.log(email)
    // console.log(productId)
    let result = await fetch(
      `${process.env.REACT_APP_server_url}/api/v1/products/addToCart`,
      {
        method: "POST",
        body: JSON.stringify({ email, productId, quantity, selectedSize }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    result = await result.json();
    // console.log(result)
    setLoading(false);
    if (result.status === 404) {
      alert(result.message);
      localStorage.removeItem("userEmail");
      navigate("/");
      window.location.reload();
    } else {
      // alert("Product is added to cart Successfully")
      // navigate('/cart')
      // window.location.reload();
    }
    setIsCart(true);
  };

  const changeButton = (e) => {
    setIsCart(false);
  };

  const toLogin = () => {
    navigate("/login");
  };

  const toUpdate = () => {
    navigate(`/updateProduct/${params.id}`);
  };

  const toCart = () => {
    navigate("/cart");
  };

  function imageButton(item, index) {
    // console.log(item)
    return (
      <button onClick={() => selectImage(item)}>
        <img src={item} alt="Product image" class="product-img-button" />
      </button>
    );
  }

  function sizeAvailable(item, index) {
    return <option value={item.size}>{item.size}</option>;
  }

  return (
    <div>
      {
        loading ? <LoadingPage /> :
          <div className="product-main-container">
            <div className="product-image-container">
              <img src={selectedImage} alt="Image" className="product-display-img" />
              <div className="product-all-images">{imageUrl.map(imageButton)}</div>
            </div>
            <div className="product-product-description">
              <div className="product-product-name">
                <h2>{name}</h2>
                <i class={isWishlisted ? "fa fa-heart" : "fa fa-heart-o"} onClick={toggleWishlist}></i>
              </div>
              <div className="product-product-price">
                <h3>₹{price}</h3>
              </div>
              <div className="product-product-size">
                <p>Select Size</p>
              </div>
              <div className="product-size-input-container">
                <label>
                  <input
                    type="radio"
                    name="radios"
                    value="XS"
                    id="XS"
                    onClick={(e) => {
                      changeButton(e.target.value);
                    }}
                  />
                  <span>XS</span>
                </label>
                <label>
                  <input
                    type="radio"
                    name="radios"
                    value="S"
                    id="S"
                    onClick={(e) => {
                      changeButton(e.target.value);
                    }}
                  />
                  <span>S</span>
                </label>
                <label>
                  <input
                    type="radio"
                    name="radios"
                    value="M"
                    id="M"
                    onClick={(e) => {
                      changeButton(e.target.value);
                    }}
                  />
                  <span>M</span>
                </label>
                <label>
                  <input
                    type="radio"
                    name="radios"
                    value="L"
                    id="L"
                    onClick={(e) => {
                      changeButton(e.target.value);
                    }}
                  />
                  <span>L</span>
                </label>
                <label>
                  <input
                    type="radio"
                    name="radios"
                    value="XL"
                    id="XL"
                    onClick={(e) => {
                      changeButton(e.target.value);
                    }}
                  />
                  <span>XL</span>
                </label>
                <label>
                  <input
                    type="radio"
                    name="radios"
                    value="2XL"
                    id="2XL"
                    onClick={(e) => {
                      changeButton(e.target.value);
                    }}
                  />
                  <span>2XL</span>
                </label>
              </div>
              <div className="product-product-quantity">
                <p>Quantity</p>
                <input
                  type="number"
                  name="product-quantity"
                  id="product-quantity"
                  value={quantity}
                  min="1"
                  max="5"
                  onChange={(e) => {
                    setQuantity(e.target.value);
                  }}
                />
              </div>
              {isLogin ? (
                isCart ? (
                  <button onClick={toCart} className="product-btn">
                    Go to Cart
                  </button>
                ) : (
                  <button className="product-btn" onClick={addToCart}>
                    Add to Cart
                  </button>
                )
              ) : (
                <>
                  <button onClick={toLogin} className="product-btn">
                    Login to Proceed
                  </button>
                </>
              )}

              {isAdmin ? (
                <button onClick={toUpdate} class="product-btn">
                  Update product
                </button>
              ) : (
                <></>
              )}
              <div className="product-product-details product-product-info">
                <h4>PRODUCT DESCRIPTION</h4>
                <p>{details}</p>
              </div>
              <hr />
              <div className="product-product-details product-shipping-policy">
                <h4>SHIPPING POLICY</h4>
                <p>
                  Your product will be delivered within 15 days of placing the order.
                </p>
              </div>
              <hr />
              <div className="product-product-details product-return-refund-policy">
                <h4>EXCHANGE POLICY</h4>
                <p>Easy exchange up to 7 days of delivery.</p>
              </div>
              <hr />
            </div>
          </div>

      }
    </div>

  );
};

export default Product;
