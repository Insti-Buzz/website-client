import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import MyOrders from './MyOrders';

function PaymentValid() {
    const params = useParams();
    const navigate=useNavigate()
    useEffect(()=>{
        paymentValidator()
    })
    const paymentValidator = async (e) => {
        const token = localStorage.getItem('token')
        const email=localStorage.getItem('userEmail')
        const amount=localStorage.getItem('totalAmount')
        const deliveryMethod=localStorage.getItem('deliveryMethod')
        const id=params.id
        const response = await fetch(`${process.env.REACT_APP_server_url}/api/v1/payment/order/validate`, {

            method: "POST",
            body: JSON.stringify({
                id:id,
                email,
                amount,
                deliveryMethod
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const order = await response.json();
        // console.log(order)
        // console.log("code "+order.code)
        if(order.message=="orderAlreadyPlaced"){
            alert("orderAlreadyPlaced")
            // chooseComp(MyOrders,"My Orders")
            navigate('/profile/my-orders')
        }
        if(order.code == "PAYMENT_SUCCESS"){
            alert("Your order is placed successfully")
            // chooseComp(MyOrders,"My Orders")
            navigate('/profile/my-orders')
        }

        if (order.status == 404) {
            alert(order.message)
            localStorage.removeItem("userEmail")
            navigate('/')
            window.location.reload();
        }
    };
  return (
    <div>
     <h1>Processing The Payment</h1> 
    </div>
  )
}

export default PaymentValid
