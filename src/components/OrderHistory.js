import React, { useEffect, useState } from "react";
import "../css/OrderHistory.css";

import { useNavigate } from "react-router-dom";
import LoadingPage from "./LoadingPage";

import { isExpired, decodeToken } from "react-jwt";

function OrderHistory() {
  const [orders, setOrders] = React.useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    const token = localStorage.getItem("token");
    if (!email || !token) {
      alert("Please Login");
      navigate("/");
    } else {
      getProducts();
    }
  }, []);

  const checkAuth = async (email, token) => {
    const myDecodedToken = decodeToken(token);
    if (myDecodedToken && myDecodedToken.email === email) {
        return myDecodedToken.email;
    }else {
        // console.log("Unauth Activity");
        // localStorage.clear('token');
        // localStorage.clear('userEmail');
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
                body: JSON.stringify({ susEmailId: `${susEmailId}` , component: 'OrderHistory.js' }),
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
        console.error("Error during suspicious activity notification", error);
    }
  };  

  const getProducts = async () => {
    setLoading(true);
    const email = localStorage.getItem("userEmail");
    const token = localStorage.getItem("token");
    const trueEmail = await checkAuth(email, token);

    var result;
    if (trueEmail) {
      // console.log("trueEmail exists : ", trueEmail);
      result = await fetch(
        `${process.env.REACT_APP_server_url}/api/v1/products/orders`,
        {
          method: "POST",
          body: JSON.stringify({ email }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      result = await result.json();
      // console.log(result)  
      setTimeout(() => {
        setLoading(false)
      }, 1000);
    } else {
      // console.log("trueEmail does not exist!");
      localStorage.clear()
      // localStorage.removeItem('token');
      // localStorage.removeItem('userEmail');
      // localStorage.removeItem('name');
      // localStorage.removeItem('phone');
      // navigate('/')
      result = {status: 404};      
    }
    // console.log(email)


    if (result.status == 404) {
      // alert(result.message);
      localStorage.clear()
      // localStorage.removeItem("userEmail");
      // localStorage.removeItem("token");
      // localStorage.removeItem("name");
      // localStorage.removeItem("phone");
      setLoading(false);
      navigate("/");
      window.location.reload();
    } else {
      // console.log("No issues")
      setOrders(result.products);
      // console.log("orders:", orders);
    }
  };

  function e(item, index) {
    const orderId = item.order_id;

    // const deliveryDone = async () => {
    //     const token = localStorage.getItem("token")
    //     let result = await fetch(`${import.meta.env.VITE_server_url}/api/v1/products/delivered`, {
    //         method: 'POST',
    //         body: JSON.stringify({ orderId }),
    //         headers: {
    //             'Content-Type': 'application/json',
    //             "Authorization": `Bearer ${token}`
    //         },
    //     })
    //     result = await result.json();
    //     console.log(result)

    //     window.location.reload()
    // }
    const now = parseInt(item.date); // Get the current timestamp in milliseconds
    const date = new Date(now);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    return (
      <div className="orders-div">
        <div>
          <div className="order-id">OrderId :{item.order_id}</div>
          <div>
            {item.transactionId ? (
              <p>Payment Id: {item.transactionId}</p>
            ) : (
              <p>Cash On delivery</p>
            )}
          </div>
          <p>Date: {day + "-" + month + "-" + year}</p>
          <div>{item.productsOrdered.map(e1)}</div>
          {/* <hr/> */}
          <div>Subtotal:{item.subTotal}</div>
          <div>
            {item.isDelivered ? (
              <p>
                <strong>Deliverd Successfully</strong>
              </p>
            ) : (
              <p>Coming Soon</p>
            )}
          </div>
          {/* <div>
            <p>
              Date:
              {day + "-" + month + "-" + year}
            </p>
          </div> */}
        </div>
      </div>
    );
  }

  function e1(item, index) {
    return (
      <div class="order-card">
        <div class="order-date">{/* <p>22 April, 2023</p> */}</div>
        <hr />
        <div class="order-product-img-container">
          <img src={item.product.imageUrl[0]} alt="Product image" />
        </div>
        <div class="order-product-details">
          <div class="order-product-name">
            <h2>{item.product.name}</h2>
          </div>
          <div class="order-product-size">Size: {item.size}</div>
          <div class="order-product-quantity">Qty: {item.quantity}</div>
          <div class="order-product-quantity">Price: {item.price}/-</div>

          <hr />
        </div>
      </div>
    );
  }

  return (
    <div class="order-main-container">
      {loading ? (
        <LoadingPage />
      ) : (
        <div class="order-my-order">
          <h1>My Orders</h1>
          <hr />

          {(orders.length != 0) ? (
            orders.map(e)
          ) : (
            <div class="order-content">
              <h1>
                Seems like you are new here...
                <br />
                Visit our shop page and order now
              </h1>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default OrderHistory;
