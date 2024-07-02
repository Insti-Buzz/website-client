import "./App.css";
import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainContainer from "./components/MainContainer";
import Product from "./components/Product";
import Shop from "./components/Shop";
import Home from "./components/Home";
import AddProduct from "./components/AddProduct";
import Cart from "./components/Cart";
import Payment from "./components/Payment";
import Signup from "./components/Signup";
import Login from "./components/Login";
import OrderHistory from "./components/OrderHistory";
import Ticket from "./components/Ticket";
import AllOrders from "./components/AllOrders";
import AboutUs from "./components/AboutUs";
import Terms from "./components/Terms";
import ReturnRefund from "./components/Exchange";
import Shipping from "./components/Shipping";
import Privacy from "./components/Privacy";
import Private from "./components/Private";
import UpdateProduct from "./components/UpdateProduct";
import OurServices from "./components/OurServices";
import Collab from "./components/Collab";
import CollabForm from "./components/CollabForm";
import FAQs from "./components/FAQs";
import Wishlist from "./components/Wishlist";
import Address from "./components/Address";
import PaymentValid from './components/PaymentValid.js'
import Settings from "./components/Settings"

import MyOrders from './components/MyOrders.js';
import Profile from './components/Profile.js';

function App() {
  
  const [reqComp, setReqComp] = useState({ comp: Profile, compName: "Profile" });
  // const [userDetails, setUserDetails] = useState({
  //   name: 'per',
  //   email: 'person@gmail.com',
  //   phone: '123456789',
  // });

  // function updateUserDetails(res) {
  //   console.log("res : ", res);
  //   setUserDetails({
  //     name: res.userName,
  //     email: res.email,
  //     phone: res.userPhone,
  //   });
  // }

  function chooseComp(comp , compName) {
    setReqComp({ comp: comp, compName: compName });
  }
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<MainContainer chooseComp={chooseComp}/>}>
          <Route element={<Private />}>
            <Route path="add" element={<AddProduct />} />
            <Route path="allOrders" element={<AllOrders />} />
            <Route path="updateProduct/:id" element={<UpdateProduct />} />
          </Route>
          <Route path="faqs" element={<FAQs />} />
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route path="" element={<Home />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="shop" element={<Shop />} />
          <Route path="product/:id" element={<Product />} />
          <Route path="cart" element={<Cart chooseComp={chooseComp}/>} />
          <Route path="paymentValid/:id" element={<PaymentValid />} />
          <Route path="address" element={<Address />} />
          <Route path="confirm" element={<Payment />} />
          {/* <Route path="orders" element={<OrderHistory />} /> */}
          <Route path="ticket" element={<Ticket />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="terms-conditions" element={<Terms />} />
          <Route path="exchange" element={<ReturnRefund />} />
          <Route path="shipping" element={<Shipping />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="ourServices" element={<OurServices />} />
          <Route path="collab" element={<Collab />} />
          <Route path="collabForm" element={<CollabForm />} />
          <Route path="settings" element={<Settings reqComp={reqComp} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
