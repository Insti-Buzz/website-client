import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import '../css/MyOrders.css';
import orderPlacedImage from '../assets/vectors/OrderPlaced.svg';
import arrowHead from '../assets/vectors/ArrowHead.svg';
import deliveredSvg from '../assets/vectors/Delivered.svg';
import infoPopupSymbol from '../assets/vectors/InfoPopupSymbol.svg';
import IndividualOrder from './IndividualOrder.js';

function MyOrders({ userDetails}) {
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

            <div className='dikshant-ka-idea'>
                <div className='orders-card' key={i}>
                    <div className="block user-info" style={{width:'100%'}}>
                        <div className="status-indicator-container" >
                            <div className="status-img-container productImg-loader"></div>
                            <div className="status-text-container" style={{ width:'80%', height:'100%' , gap:'5px'}}>
                                <div className="status-text text-loader" style={{ height: "1.2rem", width: "22%" }}></div>
                                <div className="status-date text-loader" style={{ height: "0.7rem", width: "30%" }}></div>
                            </div>
                        </div>  
                    </div>

                    <div className="block product-info"  style={{cursor:'pointer'}}>
                        <div className="info" style={{width:'100%',height:'100%', alignItems:"center"}}>
                            <div className='productImg-loader'></div>
                            <div className='sub-block' style={{width:'30%' , height:'100px' ,justifyContent: 'space-between'}}>
                                <div className="name-style-container" style={{display: 'flex' , flexDirection: 'column' ,gap: '5px'  }}>
                                    <h2 className='text-loader' style={{ height: "1.8rem", width: "80%" }}></h2>
                                    <p className='sm-text text-loader' style={{ height: "1.1rem", width: "55%"}}></p>
                                </div>
                                <div style={{ marginTop:"10px", width:'100%' , height: "1.4rem", display:'inline-flex'}}>
                                    <div className='text-loader' style={{ width: "30%" , height:'75%'}}></div>
                                    <div className='text-loader' style={{ width: "30%" , height:'75%' , marginLeft:"10px"}}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="available-action block" style={{padding:'15px' , justifyContent:'start'}}>
                        <div className='text-loader' style={{height:'1.2rem', width:'35%'}}></div>
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
        
      const allowedTimeToCancelTheOrder = 30000; //in millisecond. Define same value in IndividualOrder.js too
        item1.isCancellable = (currentDate - item.date) < allowedTimeToCancelTheOrder;
        
        const allowedTimeToExchangeTheOrder = 600; //in millisecond Define same value in IndividualOrder.js too
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
                <div className="block product-info" onClick={() => navigate(`/profile/my-orders/${item1.orderItem_id}`,{state:{id: item.order_id}})} style={{cursor:'pointer'}}>
                    <div className="info ">
                        <img src={item1.product.imageUrl[0]} alt="ordered product info" />
                        <div className='sub-block'>
                            <div className="name-style-container">
                                <h2>{item1.product.name}</h2>
                                <p className=''>{item1.product.style}</p>
                            </div>
                            <div style={{ marginTop: "10px" }}>
                                <span className='myorders-sm-text' style={{ marginRight: 10 + "px" }}>Size: {item1.size}</span>
                                <span className='myorders-sm-text'>Qty: {item1.quantity}</span>
                            </div>
                        </div>
                    </div>
                    <img src={arrowHead} className="price" alt="" />
                </div>
            <div className="available-action block"
              style={((!item1.isCancellable && !item1.isDelivered) || (!item1.isExchangable && item1.isDelivered)) ?
                {justifyContent:'start' , fontSize:'14px'} : {}}>
                    <div className='availlable-action-btn' style={{ marginLeft: '15px' ,cursor:'default'  }}>
                        {item1.isDelivered ?
                            (item1.isExchangable ? <div style={{cursor:'pointer'}}>Exchange</div> : <div className='exchange-not-allowed-text' style={{cursor:'not-allowed'}}>Exchange window was closed on {new Date(parseInt(item1.deliveredDate) + allowedTimeToExchangeTheOrder).toLocaleDateString( undefined,options )}</div>) :
                            (item1.isCancellable ? <div style={{cursor:'pointer'}}>Cancel</div> : <div className='cancel-not-allowed-text' style={{}}>Cancellation window was closed on {new Date(parseInt(item.date) + allowedTimeToCancelTheOrder).toLocaleDateString( undefined,options )}</div>)}
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
               <div className='order-my-order'> {OrderCards()} </div>
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
