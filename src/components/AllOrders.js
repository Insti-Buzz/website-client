import React, { useEffect } from 'react'
import "../css/AllOrders.css"

import { useNavigate } from 'react-router-dom'
import { X } from '@mui/icons-material'
function AllOrders() {
    const [orders, setOrders] = React.useState([])
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
        const email = localStorage.getItem("userEmail")
        const token = localStorage.getItem("token")
        let result = await fetch(`${process.env.REACT_APP_server_url}/api/v1/products/allOrders`, {
            method: 'POST',
            body: JSON.stringify({ email }),
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
        })
        result = await result.json();
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

        const deliveryDone = async () => {
            const token = localStorage.getItem("token")
            let result = await fetch(`${process.env.REACT_APP_server_url}/api/v1/products/delivered`, {
                method: 'POST',
                body: JSON.stringify({ orderId }),
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
            })
            result = await result.json();

            window.location.reload()
        }

        const now = parseInt(item.date) // Get the current timestamp in milliseconds
        const date = new Date(now);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();

        return (
            <div className='orders-div'>
                <div>
                    <div className='order-id'>OrderId :
                        {
                            item.order_id
                        }
                    </div>
                    <div>
                        {item.razorpayPaymentId ?
                            <p>Payment Id: {item.razorpayPaymentId}</p>
                            :
                            <p>Cash On delivery</p>
                        }
                    </div>
                    <p>Date: {day + "-" + month + "-" + year}</p>
                    <p>
                        {
                            item.user.name
                        }</p>
                    {
                        item.productsOrdered.map(e1)
                    }
                </div>
                <div>
                    SubTotal:{item.subTotal}
                </div>
                <div>
                    {
                        item.isDelivered ?
                            <p><strong>Deliverd Successfully</strong></p>
                            :
                            <p>Coming Soon</p>
                    }
                </div>
                <div>
                    {
                        item.isDelivered ?
                            <></>
                            :
                            <button onClick={deliveryDone}>Mark as deliverd</button>
                    }
                </div>
            </div>
        )
    }

    function e1(item, index) {
        return (
            <div className='order-my-order'>
                <div class="order-card">
                    <div class="order-date">
                        {/* <p>22 April, 2023</p> */}
                    </div>
                    <hr />
                    <div class="order-product-img-container">
                        <img src={item.product.imageUrl[0]} alt="Product image" />
                    </div>
                    <div class="order-product-details">
                        <div class="order-product-name">
                            <h2>{item.product.name}</h2>
                        </div>
                        <div class="order-product-size">
                            Size: {item.size}
                        </div>
                        <div class="order-product-quantity">
                            Qty: {item.quantity}
                        </div>
                    </div>
                </div>
            </div>

        )
    }
    return (

        <div class="order-main-container">

            <div class="order-my-order">
                <h1>My Orders</h1>
                <hr />
                {
                    orders.map(e)
                }
            </div>
        </div>
    )
}

export default AllOrders
