import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainContainer from './components/MainContainer';
import Product from './components/Product';
import Shop from './components/Shop';
import Home from './components/Home';
import AddProduct from './components/AddProduct';
import Cart from './components/Cart';
import Payment from './components/Payment';
import Signup from './components/Signup';
import Login from './components/Login';
import OrderHistory from './components/OrderHistory';
// import GetDetails from './components/GetDetails'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='app' element={<MainContainer />}>
          <Route path='signup' element={<Signup/>}/>
          <Route path='login' element={<Login/>}/>
          <Route path='home' element={<Home />} />
          <Route path='shop' element={<Shop />} />
          <Route path='product/:id' element={<Product />} />
          <Route path='add' element={<AddProduct />} />
          <Route path='cart' element={<Cart />} />
          <Route path='confirm' element={<Payment />} />
          <Route path='orders' element={<OrderHistory />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
