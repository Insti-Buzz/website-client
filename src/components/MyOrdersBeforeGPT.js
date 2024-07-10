import React,{ useState , useEffect } from 'react'
import { useNavigate } from "react-router-dom";

import '../css/MyOrders.css'
import orderPlacedImage from '../assets/vectors/OrderPlaced.svg' 
import arrowHead from '../assets/vectors/ArrowHead.svg'
import deliveredSvg from '../assets/vectors/Delivered.svg'
import infoPopupSymbol from '../assets/vectors/InfoPopupSymbol.svg'
import { Icon } from '@mui/material';

import IndividualOrder from './IndividualOrder.js';


function MyOrders({userDetails , settingsNavigation}) {
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
  
  
    const getProducts = async () => {
      setLoading(true);
      const email = localStorage.getItem("userEmail");
      const token = localStorage.getItem("token");
  
      var result;
      if (email) {
        // console.log("trueEmail exists : ", trueEmail);
        result = await fetch(
          `${process.env.REACT_APP_server_url}/api/v1/products/orders`,
          {
            method: "POST",
            body: JSON.stringify({ email:email }),
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
        localStorage.removeItem('token');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('name');
        localStorage.removeItem('phone');
        result = {status: 404};      
      }

      if (result.status == 404) {
        localStorage.removeItem("userEmail");
        localStorage.removeItem("token");
        localStorage.removeItem("name");
        localStorage.removeItem("phone");
        setLoading(false);
        navigate("/");
        window.location.reload();
      } else {
        console.log("No issues")
        setOrders(result.products);
        // console.log("orders:", orders);
      }
  };
  
  function OrderCards() {
    const cards = [];

    for (let i = 0; i <= 6; i++) {
        cards.push(
          <div className="orders-card">
          <div className="block user-info ">
              <div className="text-loader" style={{height:"1.8rem", width:"20%"}}></div>
              <span className='text-loader sm-text' style={{height:"0.9rem", width:"18%"}}></span>
              <span className="text-loader sm-text" style={{height:"0.9rem", width:"17%"}}></span>
          </div>
          <div className="block product-info">
                <div className="info " style={{width:"40%"}}>
                  <div className='productImg-loader'></div>
                  <div className='sub-block'style={{width:"100%"}} >
                    <div className='text-loader' style={{height:"2rem", width:"65%"}}></div>
                    {/* <p className=' sm-text' style={{height:"0.9rem", width:"80%"}}></p> */}
                    <div style={{marginTop:10+"px" , width:"100%" , display:"inline-flex"}}>

                      <div className='text-loader sm-text' style={{height:"0.9rem", width:"30%", margin:"2px" }}></div>
                      <div className='text-loader sm-text' style={{height:"0.9rem", width:"30%" , margin:"2px"}}></div>
                    </div>
                  </div>
                </div>
              <div className="price" style={{width:"18%"}}>
                <div className='text-loader' style={{ height: "1.9rem", width: "48%"}}></div>
                <div className='text-loader' style={{ height: "0.5rem", width: "89%", marginTop:"10px"}}></div>
              </div>
                  
              </div>    

          <div className="delivery-info">
              <div className="timeline">
                  <div className="circle circle-one" style={{ backgroundColor: 'grey' }}></div>
                  <hr style={"item.isDelivered" ? { borderTop: '2.5px dashed grey '} : {}}/>
                  <div className="circle circle-three" style={"item.isDelivered" ? { backgroundColor: 'grey' } : {}}></div>
              </div>
              <div className="timeline-status">
                  <div className="status status-one">
                      <span className="text-loader" style={{color:"grey",height: "1.3rem", width: "85%", margin: "2px" }}></span>
                  </div>
                  <div className="status status-three">
                          <span className="text-loader" style={{color:"grey",height: "1.3rem", width: "85%", margin: "2px" }}></span>
                  </div>
              </div>
          </div>
      </div>
        );
    }

    return cards;
}

    function e(item, index) {
      const orderId = item.order_id;
      const isDelivered = item.isDelivered;
        return (
            <div className='dikshant-ka-idea'>
            {item.productsOrdered.map(e1(item))}
            </div>
        );
  }
  
  const e1 = (item) => (item1, index) => {

    const currentDate = parseInt(Date.now());
    if (currentDate - parseInt(item.date) < 3600000) {
      item1.isCancellable = true;
    } else {
      item1.isCancellable = false;
    }
    
    return (
<div className='orders-card' >
          <div className="block user-info ">
              
            <div className="status-indicator-container">
              <div className="status-img-container" style={item.isDelivered ? { backgroundColor: '#42210B' } : {}}>
              <img src={item.isDelivered ? deliveredSvg : orderPlacedImage} alt="" />
              </div>
              <div className="status-text-container">
                <div className="status-text">{ item.isDelivered? 'Delivered' : 'Order Placed'}</div>
                <div className="status-date">{ item.isDelivered? '' : `Order Placed on: ${item.date}`} </div>
              </div>
            </div>  
          </div>
        <div className="block product-info" onClick={()=>settingsNavigation(IndividualOrder, "My Orders" , {item:item , item1:item1 })}>
        <div className="info ">
            <img src={item1.product.imageUrl[0]} alt="ordered product info" />
            <div className='sub-block'>
                <h2>{item1.product.name}</h2>
                <p className='sm-text'>{item1.style}</p>
                <div style={{marginTop:10+"px"}}>

                <span className='sm-text' style={{marginRight:10+"px"}}>Size: {item1.size}</span>
                <span className='sm-text'>Qty: {item1.quantity}</span>
                </div>
            </div>
        </div>
        <img src={arrowHead} className="price"/> 
      </div>
        
        <div className="available-action block">
          <div className='availlable-action-btn' style={{ marginLeft: '15px' }}>
            {item.isDelivered ?
              'Exchange'
              :
              (item1.isCancellable ? 'Cancel' : 'Exchange window is/was closed on 1 Aug 2024')}</div>
          <img src={infoPopupSymbol} alt="" />
          <div className='popup'>
            {item.isDelivered ?
              'You can exchange your order within 7 days after delivery. Once 7 days have passed, exchange is not possible.'
              :
              'You can cancel your order within 24 hours of placing it. Once 24 hours have passed, cancellation is not possible.'}</div>
        </div>
  </div>  
    );
  }

  // const [activeComponent, setActiveComponent] = useState(null);

  // function chooseOrder(individualOrder) {
  //   setActiveComponent(individualOrder); 
  // }


  return (
    <>
        <div className='container'>
        {loading ? (
          OrderCards()
        ) : (
          <div class="order-my-order">

            {(orders.length != 0) ? (
              orders.map(e)
            ) : (
              <div class="order-content">
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
    </>
  )
}

export default MyOrders











// onClick='{() => chooseOrder(<IndividualOrder item={item} />)}'
