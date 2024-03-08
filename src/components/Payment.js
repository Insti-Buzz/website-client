// import React, { useEffect } from 'react'

// function Payment() {
//     const [name, setName] = React.useState('')
//     const [email, setEmail] = React.useState('')
//     const [phoneNumber, setPhoneNumber] = React.useState('')
//     const[products,setProducts]=React.useState([])
    
//     useEffect(() => {
//         getProducts();
//     }, [])

//     const getProducts = async () => {
//         let result = await fetch('https://mollusk-thankful-externally.ngrok-free.app/api/v1/products/get-product', {
//             // headers:{

//             // }
//             method: "Get"
//         });
//         result = await result.json();
//         console.log(result);
//         for (let i = 0; i < result.length; i++) {
//             const updatedProducts = result.filter(item => item._id === localStorage.getItem(`product${item._id}`));
//             setProducts(updatedProducts);
//         }
//         // setProducts(result);
//     }

//     const confirmOrder = async () => {
//         const response = await fetch("https://mollusk-thankful-externally.ngrok-free.app/api/v1/payment/confirm", {
//             method: "POST",
//             body: JSON.stringify({
//                 products,
//                 name,
//                 email,
//                 phoneNumber
//             }),
//             headers: {
//                 "Content-Type": "application/json",
//             },
//         });
//     }
//     return (
//         <div>
//             <h1>hi</h1>
//             <input type='text' placeholder='Enter Your name' value={name}
//                 onChange={(e) => { setName(e.target.value) }} />
//             <input type='text' placeholder='Enter Your email' value={email}
//                 onChange={(e) => { setEmail(e.target.value) }} />
//             <input type='text' placeholder='Enter Your phoneNumber' value={phoneNumber}
//                 onChange={(e) => { setPhoneNumber(e.target.value) }} />

//             <button onClick={confirmOrder}>Proceed</button>
//         </div>
//     )

// }

// export default Payment
