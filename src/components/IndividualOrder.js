import React from 'react'
import '../css/IndividualOrder.css'


function IndividualOrder({ props }) {
  
  console.log(props.item.date);
  const now = parseInt(props.item.date);
  const date = new Date(now);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  
  return (
    <>
        <div className="individual-order-container">
              <div className="product-info-container block-2">
                <div className="product-img-container">
                  <img src={props.item1.product.imageUrl[0]} alt="" />
                </div>
          <div className="product-name-container">{ props.item1.product.name }</div>
          <div className="product-type-container">{props.item1.style}</div>
                <div className="product-size-container">Size : {props.item1.size}</div>
              </div>
              <div className="product-status-map-container block-2">
                <div className="timeline">
                        <div className="circle circle-one" style={{ backgroundColor: '#00C437' }}></div>
                        <hr style={props.item.isDelivered ? { borderTop: '2.5px dashed #00C437 '} : {}}/>
                        <div className="circle circle-two" style={'isDispatched' ? { backgroundColor: '#00C437' } : {}}></div>
                        <hr style={props.item.isDelivered ? { borderTop: '2.5px dashed #00C437 '} : {}}/>
                        <div className="circle circle-three" style={props.item.isDelivered ? { backgroundColor: '#00C437' } : {}}></div>
                </div>
                    <div className="timeline-status">
                        <div className="status status-one">
                            <span className="order-placed">Order Placed</span>
                            <span className="order-placed-date">{day}-{month}-{year}</span>
                        </div>

                        <div className="status status-two">
                                <span className="dispatched">Dispatched</span>
                                <span className="dispatched-date">date</span>
                        </div>

                        <div className="status status-three">
                                <span className="delivered" style={props.item.isDelivered ? {}:{color:'grey'}}>Delivered</span>
                                <span className="order-placed-date" style={props.item.isDelivered? {}:{color:'grey'}}>date</span>
                        </div>
                    </div>
              </div>
              <div className="product-status-info-container block-2">
                <div className="product-status-info">Exchange</div>
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
