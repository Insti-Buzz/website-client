import React, { useEffect, useState } from 'react'
import TungaImg from '../assets/Tunga.png'
import TaptiImg from '../assets/Tapti.png'
import "../css/OrderHistory.css"
import { useNavigate } from 'react-router-dom'
import LoadingPage from './LoadingPage'

function OrderHistory() {
    const [orders, setOrders] = React.useState([])
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const email = localStorage.getItem('userEmail')
        const token = localStorage.getItem('token')
        if (!email || !token) {
            alert("Please Login")
            navigate('/')
        }
        getProducts();
    }, [])

    const getProducts = async () => {
        setLoading(true)
        const email = localStorage.getItem("userEmail")
        const token = localStorage.getItem("token")
        // console.log(email)
        let result = await fetch(`${process.env.REACT_APP_server_url}/api/v1/products/orders`, {
            method: 'POST',
            body: JSON.stringify({ email }),
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
        })
        result = await result.json();
        // console.log(result)
        setLoading(false)
        if (result.status == 404) {
            alert(result.message)
            localStorage.removeItem("userEmail")
            navigate('/')
            window.location.reload();
        } else {
            setOrders(result.products)
        }
    }


    function e(item, index) {
        const orderId = item.order_id

        // const deliveryDone = async () => {
        //     const token = localStorage.getItem("token")
        //     let result = await fetch(`${process.env.REACT_APP_server_url}/api/v1/products/delivered`, {
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
        const now = parseInt(item.date) // Get the current timestamp in milliseconds
        const date = new Date(now);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();

        return (

            <div className='orders-div'>
                <div>
                    <h3>Order Id: {item.order_id}</h3>
                </div>
                <div>
                    {
                        item.productsOrdered.map(e1)
                    }
                </div>
                <div>
                    Subtotal:{
                        item.subTotal
                    }
                </div>
                <div>
                    {
                        item.isDelivered ?
                            <p><strong>Deliverd Successfully</strong></p>
                            :
                            <p>Coming Soon</p>
                    }
                </div>
                <div><p>Date:
                    {
                        day + "-" + month + "-" + year
                    }
                </p>
                </div>
            </div>
        )
    }

    function e1(item, index) {
        return (
            <div>
                <div class="orders-product-card">
                    {/* <div class="checkout-product-img-container">
                        <img src={TungaImg} alt="Tunga jersey" />
                    </div> */}
                    <div>
                        {/* <h3>{item.orderItem_id}</h3> */}
                    </div>
                    <div class="orders-product-details">
                        <div class="checkout-product-name">
                            <h2>{item.product.name}</h2>
                        </div>
                        <div class="orders-product-price">
                            <>₹{item.price}</>
                        </div>
                        <div>
                            Quantity: {item.quantity}
                        </div>
                        <div>
                            Size: {item.size}
                        </div>
                    </div>
                    <hr />
                </div>
            </div>

        )
    }

    return (
        <div>
            {loading ? <LoadingPage /> :

                <div >
                    <h1>Order History</h1>

                    {orders ?
                        orders.map(e) :
                        <h1>No Orders</h1>
                    }
                </div>
            }
        </div>
    )
}

export default OrderHistory
