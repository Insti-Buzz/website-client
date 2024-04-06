import '../css/Home.css';
import CoverImg from '../assets/Cover Image 2.jpg';
import Image2 from '../assets/Image.jpg';
import { useNavigate } from 'react-router-dom';
// import Carousel from 'react-bootstrap/Carousel';

function Home() {
  const navigate=useNavigate()
  const toShop=()=>{
    navigate('/shop')
  }
  return (
    <>
    <div className="home-content home-content-one">
        <div className='home-container'>
            <h1 className="home-heading">Quality. Style. Campus<br />Spirit.</h1>
        </div>
        
        <div className='home-img-container'>
            <img src={CoverImg} alt="Cover Img of The Home Page" className="home-cover-img" />
        </div>
        
        <div className='home-about-container'>
            <h2 className="home-about-container-heading">The Ultimate T-shirt Destination</h2>
            <p className="home-about-container-paragraph">Welcome to our store, where you can find the coolest and most affordable T-shirts that<br />
                    represent your campus spirit. Our amazing service and selection make browsing a <br />
                    pleasure. Explore our latest collections and remember, we are here to help if you have any <br />
                      questions.</p>
            <button className='home-discover-button' onClick={toShop}>Shop</button>
        </div>
    </div>
    
      <div className="home-colour-bar-container">
        <div className="home-colour-bar"></div>
      </div>
    
      
      {/* <div className="home-content home-content-two">
        
        <h1 className='home-title'>Latest Arrivals</h1>
        
        <div className='home-products-container'>

          <div className="home-product">
            <div className="home-product-image">
              <img src="" alt="home-product image" className="home-product-image-detail" />
            </div>
            <div className="home-product-title">I`m a Product</div>
            <div className="home-product-price">Price: 0$</div>
          </div>
          <div className="home-product">
            <div className="home-product-image">
              <img src="" alt="home-product image" className="home-product-image-detail" />
            </div>
            <div className="home-product-title">I`m a Product</div>
            <div className="home-product-price">Price: 0$</div>
          </div>
          <div className="home-product">
            <div className="home-product-image">
              <img src="" alt="home-product image" className="home-product-image-detail" />
            </div>
            <div className="home-product-title">I`m a Product</div>
            <div className="home-product-price">Price: 0$</div>
          </div>
          <div className="home-product">
            <div className="home-product-image">
              <img src="" alt="home-product image" className="home-product-image-detail" />
            </div>
            <div className="home-product-title">I`m a Product</div>
            <div className="home-product-price">Price: 0$</div>
          </div>


        </div>
    </div> */}

      <div className="home-content home-content-three">
        <div className="home-about-container">
          <h1 className="home-heading">About InstiBuzz</h1>
          <h2 className="home-about-text">At InstiBuzz, we celebrate the vibrant campus life by offering an exclusive<br />
                      collection of T-shirts that feature Insti slang, taglines, and campus spirit <br />
                      designs. We carefully select each piece in our collections, making sure that it<br />
                      meets our high standards. Our T-shirts feel exceptional because they are<br />
                      expertly crafted to fit well, last long and look great. Shop today and experience<br />
                      the campus spirit.</h2>
        </div>
        <div className="home-content home-about-two-container">
          <p className="home-about-two-text">We aim to unite and influence the culture of educational institutes, starting with IIT Madras
            <br /> and expanding to other colleges across India. At InstiBuzz, we believe that the
            <br /> right T-shirt can make a statement and create a sense of belonging. That`s why we`re
            <br /> committed to bringing you the latest trends and styles that capture your campus spirit.
          </p>
          <a className='home-learn-more-button' href=''>Learn More</a>
          {/* <img src={Image2} alt="Some Image" className="home-image-two" /> */}
        </div>
      </div>
    </>
  )
}

export default Home
