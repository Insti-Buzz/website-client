import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import '../css/MyOrders.css';
import orderPlacedImage from '../assets/vectors/OrderPlaced.svg';
import arrowHead from '../assets/vectors/ArrowHead.svg';
import deliveredSvg from '../assets/vectors/Delivered.svg';
import infoPopupSymbol from '../assets/vectors/InfoPopupSymbol.svg';
import IndividualOrder from './IndividualOrder.js';

function MyOrders({ userDetails, settingsNavigation }) {
    const [orders, setOrders] = useState([]);
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
  
    const getProducts = async () => {
        setLoading(true);
        const email = localStorage.getItem("userEmail");
        const token = localStorage.getItem("token");
        let result;
        if (email) {
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
            setTimeout(() => setLoading(false), 1000);
        } else {
            localStorage.clear();
            result = { status: 404 };
        }
        if (result.status === 404) {
            localStorage.clear();
            setLoading(false);
            navigate("/");
            window.location.reload();
        } else {
            setOrders(result.products);
        }
    };
  
    function OrderCards() {
        const cards = [];
        for (let i = 0; i <= 6; i++) {
            cards.push(
                <div className="orders-card" key={i}>
                    <div className="block user-info ">
                        <div className="text-loader" style={{ height: "1.8rem", width: "20%" }}></div>
                        <span className='text-loader sm-text' style={{ height: "0.9rem", width: "18%" }}></span>
                        <span className="text-loader sm-text" style={{ height: "0.9rem", width: "17%" }}></span>
                    </div>
                    <div className="block product-info">
                        <div className="info " style={{ width: "40%" }}>
                            <div className='productImg-loader'></div>
                            <div className='sub-block' style={{ width: "100%" }}>
                                <div className='text-loader' style={{ height: "2rem", width: "65%" }}></div>
                                <div style={{ marginTop: 10 + "px", width: "100%", display: "inline-flex" }}>
                                    <div className='text-loader sm-text' style={{ height: "0.9rem", width: "30%", margin: "2px" }}></div>
                                    <div className='text-loader sm-text' style={{ height: "0.9rem", width: "30%", margin: "2px" }}></div>
                                </div>
                            </div>
                        </div>
                        <div className="price" style={{ width: "18%" }}>
                            <div className='text-loader' style={{ height: "1.9rem", width: "48%" }}></div>
                            <div className='text-loader' style={{ height: "0.5rem", width: "89%", marginTop: "10px" }}></div>
                        </div>
                    </div>
                    <div className="delivery-info">
                        <div className="timeline">
                            <div className="circle circle-one" style={{ backgroundColor: 'grey' }}></div>
                            <hr style={"item.isDelivered" ? { borderTop: '2.5px dashed grey ' } : {}} />
                            <div className="circle circle-three" style={" " ? { backgroundColor: 'grey' } : {}}></div>
                        </div>
                        <div className="timeline-status">
                            <div className="status status-one">
                                <span className="text-loader" style={{ color: "grey", height: "1.3rem", width: "85%", margin: "2px" }}></span>
                            </div>
                            <div className="status status-three">
                                <span className="text-loader" style={{ color: "grey", height: "1.3rem", width: "85%", margin: "2px" }}></span>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        return cards;
    }
  
    const e1 = (item) => (item1, index) => {
      const currentDate = Date.now();
        const options = { year: "numeric", month: "long", day: "numeric" }
        
      const allowedTimeToCancelTheOrder = 30000; //in millisecond.
        item1.isCancellable = (currentDate - item.date) < allowedTimeToCancelTheOrder;
        
        const allowedTimeToExchangeTheOrder = 6000; //in millisecond
        item1.deliveredDate ?
            item1.isExchangable = (currentDate - item1.deliveredDate) < allowedTimeToExchangeTheOrder
            : item1.isExchangable = false;


        return (
            <div className='orders-card' key={index}>
                <div className="block user-info ">
                    <div className="status-indicator-container">
                <div className="status-img-container"
                  style={item1.isDelivered ?
                    { backgroundColor: '#42210B' }
                    :
                    (item1.isCancellable && !item1.isDelivered ?
                      {backgroundColor : '#F9E8DC'} : {backgroundColor: '#42210B'})}>
                  <img
                    src=
                    {!item1.isCancellable && item1.isDelivered ?
                      deliveredSvg
                      :
                      (item1.isCancellable && !item1.isDelivered ?
                        orderPlacedImage
                      : deliveredSvg)} alt="" />
                        </div>
                        <div className="status-text-container">
                  <div className="status-text">
                    {item1.isDelivered ? 'Delivered' : 'Order Placed'}</div>
                            <div className="status-date">{item1.isDelivered ? `On ${new Date(parseInt(item1.deliveredDate)).toLocaleDateString( undefined,options )}` : `Order Placed on: ${new Date(parseInt(item.date)).toLocaleDateString( undefined,options )}`}</div>
                        </div>
                    </div>  
                </div>
                <div className="block product-info" onClick={() => settingsNavigation(IndividualOrder, "My Orders", { item, item1 , allowedTimeToCancelTheOrder, allowedTimeToExchangeTheOrder })} style={{cursor:'pointer'}}>
                    <div className="info ">
                        <img src={item1.product.imageUrl[0]} alt="ordered product info" />
                        <div className='sub-block'>
                            <h2>{item1.product.name}</h2>
                            <p className='sm-text'>{item1.style}</p>
                            <div style={{ marginTop: 10 + "px" }}>
                                <span className='sm-text' style={{ marginRight: 10 + "px" }}>Size: {item1.size}</span>
                                <span className='sm-text'>Qty: {item1.quantity}</span>
                            </div>
                        </div>
                    </div>
                    <img src={arrowHead} className="price" alt="" />
                </div>
            <div className="available-action block"
              style={((!item1.isCancellable && !item1.isDelivered) || (!item1.isExchangable && item1.isDelivered)) ?
                {justifyContent:'start' , fontSize:'14px'} : {}}>
                    <div className='availlable-action-btn' style={{ marginLeft: '15px' }}>
                        {item1.isDelivered ?
                            (item1.isExchangable ? 'Exchange' : <div className='exchange-not-allowed-text' style={{cursor:'not-allowed'}}>Exchange window was closed on {new Date(parseInt(item1.deliveredDate) + allowedTimeToExchangeTheOrder).toLocaleDateString( undefined,options )}</div>) :
                            (item1.isCancellable ? 'Cancel' : <div className='cancel-not-allowed-text' style={{cursor:'not-allowed'}}>Cancellation window was closed on {new Date(parseInt(item.date) + allowedTimeToCancelTheOrder).toLocaleDateString( undefined,options )}</div>)}
                    </div>
                    <img src={infoPopupSymbol} alt="" />
                    <div className='popup'>
                        {item1.isDelivered ?
                            'You can exchange your order within 7 days after delivery. Once 7 days have passed, exchange is not possible.' :
                            'You can cancel your order within 24 hours of placing it. Once 24 hours have passed, cancellation is not possible.'}
                    </div>
                </div>
            </div>  
        );
    }

    function e(item, index) {
        return (
            <div className='dikshant-ka-idea' key={index}>
                {item.productsOrdered.map(e1(item))}
            </div>
        );
    }

    return (
        <div className='container'>
            {loading ? (
                OrderCards()
            ) : (
                <div className="order-my-order">
                    {orders.length ? (
                        orders.map(e)
                    ) : (
                        <div className="order-content">
                            <h1>
                                Seems like you are new here...
                                <br />
                                Visit our shop page and order now!
                            </h1>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default MyOrders;
