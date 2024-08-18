import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation, Navigate } from "react-router-dom";
import '../css/IndividualOrder.css';

import ExchangeProduct from './ExchangeProduct';
import LoadingPage from './LoadingPage';


function IndividualOrder({ userDetails }) {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [order, setOrder] = useState();
  const [orderItem, setOrderItem] = useState();
  const [exchangeEndsOn, setExchangeEndsOn] = useState();
  const [returnEndsOn, setReturnEndsOn] = useState();
  const deliveryStatus = "Order Placed";
  const options = { year: "numeric", month: "short", day: "numeric" }
  const allowedTimeToCancelTheOrder = 30000; //in millisecond. Define same value in MyOrders.js too
  const allowedTimeToExchangeTheOrder = 6000000000000; //in millisecond Define same value in MyOrders.js too

  // function setExchangeAndReturnCondition(result) {
  //   setOrderItem(prevOrderItem => ({
  //     ...prevOrderItem, isCancellable: (Date.now() - result.order.date) < allowedTimeToCancelTheOrder
  //   }));
  //   if (result.orderItem.deliveredDate) {
  //     setOrderItem(prevOrderItem => ({
  //       ...prevOrderItem, isExchangable: (Date.now() - result.orderItem.deliveredDate) < allowedTimeToExchangeTheOrder
  //     }));
  //   };
  // }

  // const handleExchangeOrReturnLogic = (order,orderItem) => {
  //   if (orderItem.isDelivered) {
  //     if (orderItem.isExchangable) {
  //       console.log("helloo",order.order_id);
  //       navigate(`/profile/my-orders/exchange-product/${orderItem.orderItem_id}` , {state:{id:order.order_id}});
  //     }
  //   } else {
  //     if (orderItem.isCancellable) {
  //       alert('Handle return request');
  //     }
  //   }
  // }

  useEffect(() => {
    // const 
    window.scrollTo({
      top: 0,
      behavior: 'instant',
    });
    getIndividualOrder();
  }, []);

  const getIndividualOrder = async () => {
    try {
      let result = await fetch(
        `${process.env.REACT_APP_server_url}/api/v1/products/get-individual-order/${params.id}`,
        {
          method: "POST",
          body: JSON.stringify({
            orderId: location.state.id,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      result = await result.json();

      if (result) {
        setIsLoading(false);
        setOrder(result.order);
        setOrderItem(result.orderItem);
        console.log("result.order.date : ", result.order.date);

        // setExchangeAndReturnCondition(result);
        setReturnEndsOn(new Date(parseInt(result.order.date) + allowedTimeToCancelTheOrder).toLocaleDateString(undefined, options))
        setExchangeEndsOn(new Date(parseInt(result.orderItem.deliveredDate) + allowedTimeToExchangeTheOrder).toLocaleDateString(undefined, options))
      } else {
        throw new Error("Some error");
      }
    } catch (error) {
      alert(error);
      navigate('/');
      window.location.reload()
      localStorage.clear();
    }
  }


  //classname mein io- ka matlab individual order hai short mein likha hai bhai :)
  return (
    <>
      {isLoading ? <LoadingPage /> :
        <div className="individual-order-container">
          <div className="product-info-container block-2">
            <div className="io-product-img-container">
              <img src={orderItem.product.imageUrl[0]} alt="" />
            </div>
            <div className="product-name-container">{orderItem.product.name}</div>
            <div className="product-type-container">{orderItem.product.style}</div>
            <div className="product-size-container">Size : {orderItem.size}</div>
          </div>
          <div className="product-status-map-container block-2">
            <div className="timeline">
              <div className="circle circle-one" style={{ backgroundColor: '#00C437' }}></div>
              <hr style={orderItem.isDelivered ? { borderTop: '2.5px dashed #00C437 ' } : {}} />
              {(deliveryStatus === "Cancel Requested" || deliveryStatus === "Exchange Requested") ?
                <div className="circle circle-two" style={orderItem.isDelivered ? { backgroundColor: '#00C437' } : {}}></div>
                : <></>
              }
              <hr style={orderItem.isDelivered ? { borderTop: '2.5px dashed #00C437 ' } : {}} />
              <div className="circle circle-three" style={orderItem.isDelivered ? { backgroundColor: '#00C437' } : {}}></div>
            </div>
            <div className="timeline-status">
              <div className="status status-one">
                <span className="order-placed">Order Placed</span>
                <span className="order-placed-date">{new Date(parseInt(order.date)).toLocaleDateString(undefined, options)}</span>
              </div>
              {(deliveryStatus === "Cancel Requested" || deliveryStatus === "Exchange Requested") ?
                <div className="status status-three">
                  <span className="delivered" style={orderItem.isDelivered ? {} : { color: 'grey' }}>Delivered</span>
                  <span className="order-placed-date" style={orderItem.isDelivered ? {} : { color: 'grey' }}>{orderItem.deliveredDate}</span>
                </div>
                : <></>
              }

              <div className="status status-three">
                <span className="delivered" style={orderItem.isDelivered ? {} : { color: 'grey' }}>Delivered</span>
                <span className="order-placed-date" style={orderItem.isDelivered ? {} : { color: 'grey' }}>{orderItem.deliveredDate ? new Date(parseInt(orderItem.deliveredDate)).toLocaleDateString(undefined, options) : <div></div>}</span>
              </div>
            </div>
          </div>
          {/* <div className="product-status-info-container block-2">
              <div onClick={()=>handleExchangeOrReturnLogic(order,orderItem)} className='availlable-action-btn product-status-info' style={{ marginLeft: '15px' , cursor:'pointer' }} > 
                        {orderItem.isDelivered ?
                            (orderItem.isExchangable ? 'Exchange' : <div className='IO-exchange-not-allowed-text'>Exchange window is/was closed on {exchangeEndsOn}</div>) :
                            (orderItem.isCancellable ? 'Cancel' : <div className='IO-cancel-not-allowed-text'>Cancellation window is/was closed on {returnEndsOn}</div>)}
                    </div>
              </div> */}
          <div className="delivery-info-container block-2">
            <div className="delivery-info-header">{order.deliveryMethod == 'delivery' ? `Deliver to address:${orderItem.deliveryAddresses}` : order.deliveryMethod == 'hostel' ? `Deliver to hostel:` : "Pickup from Saraswathi Hostel"}</div>
            <div className="delivery-info-customer-name">Hey {userDetails.name},</div>
            {
              orderItem.isDelivered ? <>
                <div className="delivery-info-customer-address">{"Your Order is delivered Successfully!"}</div>

              </> :
                <div className="delivery-info-customer-address">{order.deliveryMethod == 'delivery' ? `${order.deliveryAddresses.address1}, ${order.deliveryAddresses.address2}, ${order.deliveryAddresses.city}, ${order.deliveryAddresses.state}, Pin Code: ${order.deliveryAddresses.pinCode} <br/> You'll be notified when your order is shipped` : order.deliveryMethod == 'hostel' ? order.hostelAddress : "You'll be notified when your order is ready for pickup!"}</div>
            }
            <div className="delivery-info-customer-phone">Phone : {userDetails.phone} </div>
          </div>
          <div className="total-price-info-container block-2">
            <div className="total-price-info-box-1">
              <div className="total-price-info-box-1-header">Total</div>
              <div className="total-price-info-box-1-Value">
                <div className="box-1-value">₹ {orderItem.price}</div>
                {/* <div className="box-1-value-breakup">View breakup</div> */}
              </div>
            </div>
            {/* <div className="total-price-info-box-2">
                    <div className="box-2-payment-method">Cash on Delivery</div>
                    <div className="box-2-payment-addn-info">At the time of delivery, UPI payment is accepted</div>
                  </div> */}
          </div>

        </div>}
    </>
  )
}

export default IndividualOrder
