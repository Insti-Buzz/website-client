import '../css/Navbar.css';
import InstiBuzzLogo from '../assets/Horizontal Logo Transparent.png';
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();

    const homePage = () => {
        navigate('/app/home')
    }

    const shopPage = () => {
        navigate('/app/shop')
    }

    const addProductPage = () => {
        navigate('/app/add')
    }

    const cartPage = () => {
        navigate('/app/cart')
    }

  return (
    <>
          <div className="nav-navbar">

              <div className="nav-top-left">
                  <img src={InstiBuzzLogo} onClick={homePage} alt="InstiBuzz's official logo" className="nav-instibuzz-logo" />
                  {/* <p>LOGO HERE</p> */}
              </div>

              <div className="nav-center">
                  <div className="nav-center-content">
                  <a className='nav-home' onClick={homePage}>Home</a>
                  <a className='nav-shop' onClick={shopPage}>Shop</a>
                  <a className='nav-blog' onClick={addProductPage}>Add</a>
                  <a className='nav-about' href=''>About</a>
                  </div>
              </div>

              <div className="nav-top-right">
                <a className="fa fa-shopping-bag" aria-hidden="true" onClick={cartPage}></a>
                <button className="nav-contact-button">Contact Us</button>
              </div>
        </div>
          


    </>
  )
}

export default Navbar
