import React, { useEffect, useState } from "react";
import "../css/Product.css";

import { useNavigate, useParams, useLocation } from "react-router-dom";
import LoadingPage from "./LoadingPage";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { isExpired, decodeToken } from "react-jwt";
import toast from "react-hot-toast";
import Carousel from 'react-simply-carousel';
import securePayment from "../assets/Product/securePayment.svg"
import genuineProduct from "../assets/Product/genuineProduct.svg"
import easyExchange from "../assets/Product/easyExchange.svg"
// import { IconButton } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";


const Product = () => {
  const [imageUrl, setImageUrl] = React.useState([]);
  const [selectedImage, setSelectedImage] = React.useState(imageUrl[0]);
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showSizeChart, setShowSizeChart] = useState(false);
  const [teeName, setTeeName] = useState("")
  const [showTeeName, setShowTeeName] = useState(false);
  const [instiName, setInstiName] = useState("");


  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const [showSizeUnavailable, setShowSizeUnavailable] = useState(false)
  const [requiredSize, setRequiredSize] = useState('')
  const [requiredQuantity, setRequiredQuantity] = useState('')

  useEffect(() => {
    getProductDetails();
    const email = localStorage.getItem("userEmail");
    const token = localStorage.getItem("token");
    if (token) {
      const myDecodedToken = decodeToken(token);
      const isMyTokenExpired = isExpired(token);
      if (myDecodedToken.email === process.env.REACT_APP_admin_email && !isMyTokenExpired) {
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
  const [description, setDescription] = React.useState();
  const [price, setPrice] = React.useState();
  const [details, setDetails] = React.useState();
  const [style, setStyle] = useState('');
  const [quantity, setQuantity] = React.useState("1");
  const [isCart, setIsCart] = React.useState();
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  const [isLogin, setIsLogin] = React.useState(false);
  const [sizesAvailable, setSizesAvailable] = React.useState([]);
  const [comments, setComments] = React.useState([]);
  const [requiredEmail, setRequiredEmail] = React.useState([]);
  const [isCollabProduct, setIsCollabProduct] = useState(false)

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
    if (result.status == 404) {
      navigate("/productNotFound");
    } else {
      setName(result.name);
      setPrice(result.price);
      setStyle(result.style);
      // setSize(result.sizes)
      setImageUrl(result.imageUrl);
      setDetails(result.details);
      setDescription(result.description);
      setSizesAvailable(result.sizeQuantities);
      setTags(result.tags)
      let isCollab = !result.isInstibuzz
      setIsCollabProduct(isCollab);
    }
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
      throw new Error("Select a size");
      return;
    }
    if (isCollabProduct) {

      if (!teeName) {
        throw new Error("Enter Name");
        return;
      }
      if (!instiName) {
        throw new Error("Enter Institutuion Name");
      }
    }
    selectedSize = selectedSize.value;
    // console.log(token)
    if (!email) {
      throw new Error("Please login");
      navigate("./login");
    }
    let productId = params.id;
    // console.log(email)
    // console.log(productId)
    setIsDisabled(true);
    let result = await fetch(
      `${process.env.REACT_APP_server_url}/api/v1/products/addToCart`,
      {
        method: "POST",
        body: JSON.stringify({ email, productId, quantity, selectedSize, teeName, instiName }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    result = await result.json();
    // console.log(result)
    if (result.status === 404) {
      throw new Error(result.message);
      localStorage.removeItem("userEmail");
      navigate("/");
      window.location.reload();
    } else {
      // alert("Added to cart")
      // navigate('/cart')
      // window.location.reload();
    }
    setShowTeeName(false)
    setIsDisabled(false);
    setIsCart(true);
  };

  const addToCartToast = async () => {
    toast.promise(
      addToCart(),
      {
        loading: (result) => {
          return "Adding to cart";
        },
        success: (result) => {
          return "Added to cart";
        },
        error: (result) => {
          return result.message;
        }
      },
      {
        id: "addToCartToast"
      }
    )
  }

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
      (index == imageUrl.length - 1) ? null :
        <div className='product-img-button-container' onClick={() => selectImage(item)}>
          <img src={item} alt="Product image" class="product-img-button" />
        </div>
    );
  }

  function sizeAvailable(item, index) {
    return <option value={item.size}>{item.size}</option>;
  }

  const sizeUnavailable = async () => {
    if (!requiredQuantity || !requiredSize) {
      alert("Enter Details")
      return
    }
    let email
    if (isLogin == true) {
      email = localStorage.getItem("userEmail");
    }
    else {
      if (!requiredEmail) {
        alert("Enter Email")
        return
      }
      email = requiredEmail
    }
    setLoading(true);
    // let result = await fetch(`${process.env.REACT_APP_server_url}/api/v1/products/get-product-details/${params.id}`, {
    // console.log(params)
    let result = await fetch(
      `${process.env.REACT_APP_server_url}/api/v1/products/sizeUnavailable/${params.id}`,
      {
        method: "POST",
        body: JSON.stringify({ email, requiredQuantity, requiredSize, comments }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    result = await result.json();
    // console.log(result)
    alert(result.message)
    setLoading(false);
  }

  const proceedSizeUnavailable = () => {
    setShowSizeUnavailable(true)
  }

  const openTeeName = () => {
    var selectedSize = document.querySelector('input[name="radios"]:checked');
    console.log(selectedSize);
    if (!selectedSize) {
      alert("Select a size");
      return;
    }
    setShowTeeName(true);
  }

  const closeTeeName = () => {
    setShowTeeName(false)
  }

  const tagCard = (item, index) => {
    return (
      <div className="tag-card-container">
        <p>{item}</p>
      </div>
    )
  }

  return (
    <div>
      {
        loading ? <LoadingPage /> :
          <div className="product-main-container">
            <div className="product-image-container">
              <img src={selectedImage} alt="Image" className="product-display-img" />
              <div className="product-all-images">
                <Carousel
                  containerProps={{
                    style: {
                      width: "100%",
                      justifyContent: "space-between",
                      userSelect: "none"
                    }
                  }}
                  preventScrollOnSwipe
                  // swipeTreshold={60}
                  infinite={false}
                  activeSlideIndex={activeSlide}
                  // activeSlideProps={{
                  //   style: {
                  //     border: "1px solid blue"
                  //   }
                  // }}
                  onRequestChange={setActiveSlide}
                  forwardBtnProps={{
                    children: ">",
                    style: {
                      border: "1px solid #aaaaaa",
                      width: 30,
                      height: 60,
                      borderRadius: 5,
                      background: "white",
                      alignSelf: "center"
                    }
                  }}
                  backwardBtnProps={{
                    children: "<",
                    style: {
                      background: "white",
                      border: "1px solid #aaaaaa",
                      borderRadius: 5,
                      width: 30,
                      height: 60,
                      alignSelf: "center"
                    }
                  }}
                  dotsNav={{
                    show: false,
                    itemBtnProps: {
                      style: {
                        height: 16,
                        width: 16,
                        borderRadius: "50%",
                        border: 0
                      }
                    },
                    activeItemBtnProps: {
                      style: {
                        height: 16,
                        width: 16,
                        borderRadius: "50%",
                        border: 0,
                        background: "black"
                      }
                    }
                  }}
                  itemsToShow={windowWidth > 420 ? 4 : 3}
                  speed={300}
                // centerMode
                >
                  {imageUrl.map(imageButton)}
                </Carousel>
              </div>
            </div>
            <div className="product-product-description">
              <div className="product-product-name">
                <h2>{name}</h2>
              </div>
              <div className="product-product-detail">
                <p>{details}</p>
              </div>
              <hr />
              <div className="product-product-price">
                <h3>₹{price}.00</h3>
                <p>MRP inclusive of all taxes</p>
              </div>
              <div className="product-product-size">
                <h3>Select Size</h3>
                <a onClick={() => { setShowSizeChart(true) }}>Size Chart</a>
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
              {/* <div className="product-product-quantity">
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
              </div> */}
              {isLogin ? (
                <div className="product-btns">
                  {isCart ? (
                    <button onClick={toCart} className="product-btn">
                      GO TO CART
                    </button>
                  ) : (
                    isCollabProduct ?
                      <button className="product-btn" disabled={isDisabled} onClick={openTeeName}>
                        ADD TO CART
                      </button> :
                      <button className="product-btn" disabled={isDisabled} onClick={addToCartToast}>
                        ADD TO CART
                      </button>
                  )}
                  <button onClick={toggleWishlist} className="product-wishlist-btn">
                    <i style={{ marginRight: 10 }} class={isWishlisted ? "fa fa-heart" : "fa fa-heart-o"}></i>{isWishlisted ? "WISHLISTED" : "WISHLIST"}
                  </button>
                </div>
              ) : (
                <div className="product-btns">
                  <button onClick={toLogin} className="product-btn">
                    Login to Proceed
                  </button>
                </div>
              )}

              {isAdmin ? (
                <button onClick={toUpdate} class="product-btn">
                  Update product
                </button>
              ) : (
                <></>
              )}
              <div className="product-product-inavailable">
                Size Not Available?
                <a onClick={proceedSizeUnavailable}>Inform Us</a>
              </div>
              <hr />
              <div className="product-product-details product-product-info">
                <h3>Product Description</h3>
                <p>{description}</p>
                <div className="product-product-tags">
                  {
                    tags.map(tagCard)
                  }
                </div>
              </div>
              <hr />
              <div className="product-product-details product-shipping-policy">
                <h3>Shipping Policy</h3>
                <p>
                  Your product will be delivered within <span style={{ color: "#2b2b2b" }}>15 days</span> of placing the order.
                </p>
              </div>
              <hr />
              <div className="product-product-details product-return-refund-policy">
                <h3>Exchange Policy</h3>
                <p>Easy exchange up to <span style={{ color: "#2b2b2b" }}>7 days</span> of delivery.</p>
              </div>
              <hr />
              <div className="product-product-details product-product-icons">
                <div className="product-icon">
                  <img src={securePayment} />
                  <p>100% SECURE <br /> PAYMENTS</p>
                </div>
                <div className="product-icon">
                  <img src={easyExchange} />
                  <p>EASY EXCHANGE & <br /> RETURNS</p>
                </div>
                <div className="product-icon">
                  <img src={genuineProduct} />
                  <p>100% GENUINE <br /> PRODUCTS</p>
                </div>
              </div>
            </div>
            {showSizeChart && <div className="product-size-chart">
              <div className="cart-popup-close-btn">
                <IconButton onClick={() => setShowSizeChart(false)}>
                  <CloseIcon />
                </IconButton>
              </div>
              <h2>Size Chart: {style == 'regular' ? 'Normal Fit T-Shirt' : style == 'oversized' ? 'Oversized Fit T-Shirt' : style == 'sponsered' ? 'Normal Fit T-Shirt' : 'Hoodie'}</h2>
              <img src={imageUrl[imageUrl.length - 1]} />
            </div>}
          </div>
      }

      {showSizeUnavailable && <div class="address-form cart-popup">
        <div className="">
          <IconButton onClick={() => setShowSizeUnavailable(false)}>
            <CloseIcon />
          </IconButton>
        </div>
        {
          <>
            {/* <h3></h3> */}
            <div className="address-form-form">
              <input autoComplete="disabled" type="number" placeholder="Quantity" value={requiredQuantity} onChange={(e) => setRequiredQuantity(e.target.value)} />
              <input autoComplete="disabled" type="text" placeholder="Size" value={requiredSize} onChange={(e) => setRequiredSize(e.target.value)} />
              {isLogin ? <></> :

                <input autoComplete="disabled" type="text" placeholder="Your Email" value={requiredEmail} onChange={(e) => setRequiredEmail(e.target.value)} />
              }
              <input autoComplete="disabled" type="text" placeholder="Comments" value={comments} onChange={(e) => setComments(e.target.value)} />
              <button onClick={sizeUnavailable}>Send Request</button>
            </div>
          </>
        }
      </div>}
      {showTeeName && (
        <div className="cart-popup-background">
          <div class="address-form cart-popup">
            <div className="cart-popup-close-btn">
              <IconButton onClick={() => closeTeeName()}>
                <CloseIcon />
              </IconButton>
            </div>
            {
              <>
                <h3>Name on Tee</h3>
                <div className="address-form-form">
                  <input autoComplete="disabled" type="text" placeholder="TeeName" value={teeName} onChange={(e) => setTeeName(e.target.value)} required></input>
                  <input autoComplete="disabled" type="text" placeholder="InstitutionName" value={instiName} onChange={(e) => setInstiName(e.target.value)} required></input>
                  <button onClick={addToCartToast}>Add To Cart</button>
                </div>
              </>
            }
          </div>
        </div>
      )}
    </div>

  );
};

export default Product;
