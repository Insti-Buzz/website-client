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
import Ticket from './components/Ticket';
import AllOrders from './components/AllOrders';
import Private from './components/Private';
import UpdateProduct from './components/UpdateProduct';
// import GetDetails from './components/GetDetails'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='' element={<MainContainer />}>
          <Route element={<Private/>}>
          <Route path='add' element={<AddProduct />} />
          <Route path='allOrders' element={<AllOrders />} />
          <Route path='updateProduct/:id' element={<UpdateProduct />} />
          </Route>

          <Route path='signup' element={<Signup/>}/>
          <Route path='login' element={<Login/>}/>
          <Route path='' element={<Home />} />
          <Route path='shop' element={<Shop />} />
          <Route path='product/:id' element={<Product />} />
          <Route path='cart' element={<Cart />} />
          <Route path='confirm' element={<Payment />} />
          <Route path='orders' element={<OrderHistory />} />
          <Route path='ticket' element={<Ticket />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
