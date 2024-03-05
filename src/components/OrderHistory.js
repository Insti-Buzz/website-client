import React, { useEffect } from 'react'
import TungaImg from '../assets/Tunga.png'
import TaptiImg from '../assets/Tapti.png'

function OrderHistory() {
    const [products, setProducts] = React.useState()


    useEffect(() => {
        getProducts();
    }, [])

    const getProducts = async () => {
        let result = await fetch('http://localhost:5000/api/v1/products/orders', {
            // headers:{

            // }
            method: "Get"
        });
        result = await result.json();
        console.log(result);
        setProducts(result);
    }
    
    function e(item, index) {
        return (
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
                {/* <div class="checkout-product-quantity">
                    <input type="number" name="product-quantity" placeholder={quantity[index]} id="product-quantity" value={quantity[index]}
                        min="1" max='1' onChange={(e => { handleInputChange(index, e) })} />
                </div> */}
                {/* <div class="checkout-product-net-price">
                    <h3>{quantity[index] * item.price}</h3>
                </div> */}
                <div class="checkout-product-cancel">
                    {/* <button onClick={() => removeFromCart(item._id)} type="button">
                        cross
                    </button> */}
                </div>
                <hr />
            </div>
        )
    }
    return (

        <div>
            {
                products.map(e)
            }
        </div>
    )
}

export default OrderHistory
