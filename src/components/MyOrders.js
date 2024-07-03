import React,{ useState , useEffect } from 'react'
import '../css/MyOrders.css'

import { useNavigate } from "react-router-dom";
import LoadingPage from "./LoadingPage";

import { isExpired, decodeToken } from "react-jwt";
import { Height } from '@mui/icons-material';

function MyOrders({userDetails}) {
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
  
    // const checkAuth = async (email, token) => {
    //   const myDecodedToken = decodeToken(token);
    //   if (myDecodedToken && myDecodedToken.email === email) {
    //       return myDecodedToken.email;
    //   }else {
    //       await susActivity(myDecodedToken.email);
    //       return null;
    //   }
    // };
  
    // const susActivity = async (susEmailId) => {
    //   try {
    //       let result = await fetch(
    //           `${process.env.REACT_APP_server_url}/api/v1/auth/safetyProtocol`,
    //           {
    //               method: "POST",
    //               body: JSON.stringify({ susEmailId: `${susEmailId}` , component: 'OrderHistory.js' }),
    //               headers: {
    //                   "Content-Type": "application/json",
    //               },
    //           }
    //       );
    //       result = await result.json();
  
    //       if (result.status === 404) {
    //           console.log("Error");
    //       } else {
    //           console.log("Action may result in Account Ban");
    //       }
    //   } catch (error) {
    //       console.error("Error during suspicious activity notification", error);
    //   }
    // };  
  
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
 
        const now = parseInt(item.date); // Get the current timestamp in milliseconds
        const date = new Date(now);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();
    
        return (
            <div className="orders-card">
                <div className="block user-info ">
                    <h3>{userDetails.name}</h3>
                    {/* <p className='sm-text'>{item.details}</p> */}
              <span className='sm-text'>Mobile: <span style={{ fontWeight: 500 }}>{userDetails.phone}</span></span>
              <span className="order-placed-date" style={{ fontWeight: 300 }}>Date: {day+":"+month+":"+year} </span>
              <span className='sm-text'>Subtotal: <span style={{ fontWeight: 500 }}>{item.subTotal}</span></span>

                </div>
            <>
            {item.productsOrdered.map(e1)}
            </>    

                <div className="delivery-info">
                    <div className="timeline">
                        <div className="circle circle-one" style={{ backgroundColor: 'green' }}></div>
                        <hr style={item.isDelivered ? { borderTop: '2.5px dashed green '} : {}}/>
                        {/* <div className="circle circle-two" style={isDispatched ? { backgroundColor: 'green' } : {}}></div> */}
                        {/* <hr style={isDelivered ? { borderTop: '2.5px dashed green '} : {}}/> */}
                        <div className="circle circle-three" style={item.isDelivered ? { backgroundColor: 'green' } : {}}></div>
                    </div>
                    <div className="timeline-status">
                        <div className="status status-one">
                            <span className="order-placed">Order Placed</span>
                            {/* <span className="order-placed-date">date</span> */}
                        </div>

                        {/* <div className="status status-two">
                                <span className="dispatched">Dispatched</span>
                                <span className="dispatched-date">date</span>
                        </div> */}

                        <div className="status status-three">
                                <span className="delivered" style={item.isDelivered? {}:{color:'grey'}}>Delivered</span>
                                {/* <span className="order-placed-date" style={item.isDelivered? {}:{color:'grey'}}>date</span> */}
                        </div>
                    </div>
                </div>
            </div>
        );
  }
  
  function e1(item, index) {
    return (
                    <div className="block product-info">
                        <div className="info ">
                      <img src={item.product.imageUrl[0]} alt="ordered product info" />
                      <div className='sub-block'>
                          <h2>{item.product.name}</h2>
                          <p className='sm-text'>{item.style}</p>
                          <div style={{marginTop:10+"px"}}>

                          <span className='sm-text' style={{marginRight:10+"px"}}>Size: {item.size}</span>
                          <span className='sm-text'>Qty: {item.quantity}</span>
                          </div>
                      </div>
                  </div>
                  <div className="price"><h2>₹{item.price}</h2><span className='smm-text'>Inclusive of all taxes.</span></div>
                  
                  </div>
    
    );
  }

    // const [tshirt,setTshirt] = useState({
    //     name:"White IITM",
    //     style:"Regular T-shirt",
    //     size:"S",
    //     qty:1,
    //     price:50
    // })

    // const [user,setUser] = useState({
    //     name:"Ritika Sahni",
    //     address:"House No. 94, Near Village Metro Station, Nellutla City, Sector 30, Deot Wada, North East Delhi, Delhi, Pincode-199222",
    //     mobile:"1234567891"
    // })

    // const [isDispatched, setIsDispatched] = useState(true);
    // const [isDelivered, setIsDelivered] = useState(true);
  return (
    <>
        <div className='container'>
        {loading ? (
          OrderCards()
      ) : (
        <div class="order-my-order">
          {/* <h1>My Orders</h1>
          <hr /> */}

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
        {/* {orders.map(e)} */}
          
        </div>
    </>
  )
}

export default MyOrders
