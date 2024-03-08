import React, { useEffect } from 'react'
import TungaImg from '../assets/Tunga.png'
import TaptiImg from '../assets/Tapti.png'
import "../css/OrderHistory.css"
import { useNavigate } from 'react-router-dom'

function OrderHistory() {
    const [orders, setOrders] = React.useState([])
    const [isAdmin, setIsAdmin] = React.useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const email = localStorage.getItem('userEmail')
        const token = localStorage.getItem('token')
        if (!email || !token) {
            alert("Please Login")
            navigate('/app/home')
        }
        if (email == 'instibuzziitm@gmail.com') {
            setIsAdmin(true)
        }
        getProducts();
    }, [])

    const getProducts = async () => {
        const email = localStorage.getItem("userEmail")
        const token = localStorage.getItem("token")
        console.log(email)
        let result = await fetch('http://localhost:5000/api/v1/products/orders', {
            method: 'POST',
            body: JSON.stringify({ email }),
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
        })
        result = await result.json();
        console.log(result)
        if (result.status == 404) {
            alert(result.message)
            localStorage.removeItem("userEmail")
            navigate('/app/home')
            window.location.reload();
        } else {
            setOrders(result.products)
        }
    }


    function e(item, index) {
        const orderId = item.order_id

        // const deliveryDone = async () => {
        //     const token = localStorage.getItem("token")
        //     let result = await fetch('http://localhost:5000/api/v1/products/delivered', {
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

        return (
            <div className='orders-div'>
                <div>
                    {
                        item.productsOrdered.map(e1)
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
                <div><p>Sizes: 
                    {
                        item.size
                    }
                    </p>
                </div>
            </div>
        )
    }

    function e1(item, index) {
        return (
            <div>
                <div class="checkout-product-card">
                    <div class="checkout-product-img-container">
                        <img src={TungaImg} alt="Tunga jersey" />
                    </div>
                    <div class="checkout-product-details">
                        <div class="checkout-product-name">
                            <h2>{item.name}</h2>
                        </div>
                        <div class="checkout-product-price">
                            <h3>₹{item.price}</h3>
                        </div>
                    </div>
                    <hr />
                </div>
            </div>

        )
    }

    return (

        <div >
            <h1>Order History</h1>

            {orders?
                orders.map(e):
                <h1>No Orders</h1>
            }
        </div>
    )
}

export default OrderHistory
