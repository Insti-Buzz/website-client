import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
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
import MyAddresses from "./components/MyAddresses.js";
import IndividualOrder from "./components/IndividualOrder.js";
import ExchangeProduct from "./components/ExchangeProduct.js";
import ForgotPassword from "./components/ForgotPassword.js";
import EnterOTP from "./components/EnterOTP.js";
import ChangePassword from "./components/ChangePassword.js";

function App() {

  const [profileDropDownHeight, setProfileDropDownHeight] = useState({ height: '0', display: 'none', open: false });
  function profileDropDownOpen() {
    setProfileDropDownHeight({
      height: 'fit-content',
      // padding:'30px',
      boxShadow: '1px 1px 12px 1px rgba(0, 0, 0, 0.482)',
      open: true
    });
  }
  function profileDropDownClose() {
    setProfileDropDownHeight({
      height: '0',
      boxShadow: '0 0 0 0 transparent',
      // padding:'0px',
      open: false
    });
  }
  const profileProps = {
    profileDropDownHeight: profileDropDownHeight,
    profileDropDownOpen: profileDropDownOpen,
    profileDropDownClose: profileDropDownClose,
  }

  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    phone: '',
    gender: '',
    address: '',
    city: '',
    state: '',
    pinCode: '',
  });

  function getAndStoreUserDetails(result) {
    setUserDetails(prevDetails => ({
      ...prevDetails,
      name: result.name,
      email: result.email,
      phone: result.phoneNumber,
      gender: result.gender,
      address: result.address,
      city: result.city,
      state: result.state,
      pinCode: result.pinCode,
  }));
  }

  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<MainContainer profileProps={ profileProps } />}>
          <Route element={<Private />}>
            <Route path="add" element={<AddProduct />} />
            <Route path="allOrders" element={<AllOrders />} />
            <Route path="updateProduct/:id" element={<UpdateProduct />} />
          </Route>
          <Route path="faqs" element={<FAQs />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="enter-otp" element={<EnterOTP />} />
          <Route path="change-password" element={<ChangePassword />} />
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route path="" element={<Home />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="shop" element={<Shop />} />
          <Route path="product/:id" element={<Product />} />
          <Route path="cart" element={<Cart/>} />
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
          <Route path="profile/" element={<Settings getAndStoreUserDetails={getAndStoreUserDetails} profileProps={profileProps} />} >
            <Route path="" element={<Profile userDetails={userDetails} />} />
            <Route path="my-orders" element={<MyOrders />} />
            <Route path="my-orders/:id" element={<IndividualOrder userDetails={userDetails} />} />
            <Route path="my-addresses" element={<MyAddresses />} />
            {/* <Route path="my-orders/exchange-product/:id" element={<ExchangeProduct userDetails={userDetails} /> } /> */}
          </Route>
          <Route path="*" element={<Navigate to='/' replace/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
