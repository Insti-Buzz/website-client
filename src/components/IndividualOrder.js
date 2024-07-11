import React from 'react'
import '../css/IndividualOrder.css'

import ExchangeProduct from './ExchangeProduct';


function IndividualOrder({ props , settingsNavigation }) {
  
  console.log("item: ", props.item);
  console.log("------------------------------");
  console.log("item1: ", props.item1);
  const now = parseInt(props.item.date);
  const date = new Date(now);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  const options = { year: "numeric", month: "short", day: "numeric" }  

  const deliveryStatus = "Order Placed";

  const returnOrExchangeLogic = (props) => {
    settingsNavigation(ExchangeProduct, "ExchangeProduct", props);
  }
  
  
  //classname mein io- ka matlab individual order hai short mein likha hai bhai :)
  return (
    <>
        <div className="individual-order-container">
              <div className="product-info-container block-2">
                <div className="io-product-img-container">
                  <img src={props.item1.product.imageUrl[0]} alt="" />
                </div>
          <div className="product-name-container">{ props.item1.product.name }</div>
          <div className="product-type-container">{props.item1.product.style}</div>
                <div className="product-size-container">Size : {props.item1.size}</div>
              </div>
              <div className="product-status-map-container block-2">
                <div className="timeline">
                        <div className="circle circle-one" style={{ backgroundColor: '#00C437' }}></div>
                        <hr style={props.item1.isDelivered ? { borderTop: '2.5px dashed #00C437 '} : {}}/>
                        { (deliveryStatus === "Cancel Requested" || deliveryStatus === "Exchange Requested") ?
                        <div className="circle circle-two" style={props.item1.isDelivered ? { backgroundColor: '#00C437' } : {}}></div> 
                        :<></>
                        }
                        <hr style={props.item1.isDelivered ? { borderTop: '2.5px dashed #00C437 '} : {}}/>
                        <div className="circle circle-three" style={props.item1.isDelivered ? { backgroundColor: '#00C437' } : {}}></div>
                </div>
                    <div className="timeline-status">
                        <div className="status status-one">
                            <span className="order-placed">Order Placed</span>
                            <span className="order-placed-date">{new Date(parseInt(props.item.date)).toLocaleDateString( undefined,options )}</span>
                        </div>
                      { (deliveryStatus === "Cancel Requested" || deliveryStatus === "Exchange Requested") ?
                        <div className="status status-three">
                                <span className="delivered" style={props.item1.isDelivered ? {}:{color:'grey'}}>Delivered</span>
                                <span className="order-placed-date" style={props.item1.isDelivered? {}:{color:'grey'}}>{props.item1.deliveredDate}</span>
                        </div>
                        :<></>
                      }
                                  
                        <div className="status status-three">
                                <span className="delivered" style={props.item1.isDelivered ? {}:{color:'grey'}}>Delivered</span>
                                <span className="order-placed-date" style={props.item1.isDelivered? {}:{color:'grey'}}>{new Date(parseInt(props.item1.deliveredDate) ? parseInt(props.item1.deliveredDate) : (parseInt(props.item.date) + 604800000)).toLocaleDateString( undefined,options )}</span>
                        </div>
                    </div>
              </div>
              <div className="product-status-info-container block-2">
              <div className='availlable-action-btn product-status-info' style={{ marginLeft: '15px' , cursor:'pointer' }} onClick={() => returnOrExchangeLogic(props)}> 
                        {props.item1.isDelivered ?
                            (props.item1.isExchangable ? 'Exchange' : <div className='IO-exchange-not-allowed-text'>Exchange window is/was closed on {new Date(parseInt(props.item1.deliveredDate) + props.allowedTimeToExchangeTheOrder).toLocaleDateString( undefined,options )}</div>) :
                            (props.item1.isCancellable ? 'Cancel' : <div className='IO-cancel-not-allowed-text'>Cancellation window is/was closed on {new Date(parseInt(props.item.date) + props.allowedTimeToCancelTheOrder).toLocaleDateString( undefined,options )}</div>)}
                    </div>
              </div>
              <div className="delivery-info-container block-2">
                <div className="delivery-info-header">Deliver to address:</div>
                <div className="delivery-info-customer-name">Elon Musk</div>
                <div className="delivery-info-customer-address">House No 1, Teslapur, Viman Nagar , Pune, New York , Pakistan, India 6969696</div>
                <div className="delivery-info-customer-phone">Phone : 09090909090 </div>
              </div>
              <div className="total-price-info-container block-2">
                  <div className="total-price-info-box-1">
                    <div className="total-price-info-box-1-header">Total</div>
                    <div className="total-price-info-box-1-Value">
                      <div className="box-1-value">₹ {props.item1.price}</div>
                      <div className="box-1-value-breakup">View breakup</div>
                    </div>
                  </div>
                  <div className="total-price-info-box-2">
                    <div className="box-2-payment-method">Cash on Delivery</div>
                    <div className="box-2-payment-addn-info">At the time of delivery, UPI payment is accepted</div>
                  </div>
              </div>
              
        </div>       
    </>
  )
}

export default IndividualOrder
