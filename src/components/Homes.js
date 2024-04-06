// import React from 'react'
import '../css/Home.css'
import CoverImg from '../assets/Cover Image 2.jpg'
import Cauvery from '../assets/Cauvery.png'
import Dikchand from '../assets/Untitled design.png'

function Home() {
  return (
    
    <>
      <div className="top">
        <h1 className="header">Quality.Style.Campus <br /> Spirit.</h1>
        <div className="img-container">
          <img src={CoverImg} alt="an image" className="cover-img" />
        </div>
        <div className="intro-text">
          <h2 className="intro-text-header">The Ultimate T-shirt Destination</h2>
          <p className="intro-text-paragraph">Welcome to our store, where you can find the coolest and most affordable T-shirts that<br />
                    represent your campus spirit. Our amazing service and selection make browsing a <br />
                    pleasure. Explore our latest collections and remember, we are here to help if you have any <br />
                      questions.</p>
          <a className='discover-button' href=''>Discover</a>          
        </div>

      </div>

      <div className="divider-container">
        <div className="divider"></div>
      </div>
      
      
      <div className="bottom">
        {/* <div className="card-one"> */}
          {/* <h1 className="card-one-title">Latest Arrivals</h1> */}
          {/* <div className="product-container"> */}
            
            {/* <div className="product">
              <div className="product-image">
                <img src={Cauvery} alt="product image" className="product-image-detail" />
              </div>
              <div className="product-title">Cauvery Jersey</div>
              <div className="product-price">Price: 400 /-</div>
            </div> */}
            {/* <div className="product">
              <div className="product-image">
                <img src={Cauvery} alt="product image" className="product-image-detail" />
              </div>
              <div className="product-title">Cauvery Jersey</div>
              <div className="product-price">Price: 400 /-</div>
            </div> */}
            {/* <div className="product">
              <div className="product-image">
                <img src={Cauvery} alt="product image" className="product-image-detail" />
              </div>
              <div className="product-title">Cauvery Jersey</div>
              <div className="product-price">Price: 400 /-</div>
            </div> */}
          
            {/* <div className="product">
              <div className="product-image">
                <img src={Cauvery} alt="product image" className="product-image-detail" />
              </div>
              <div className="product-title">Cauvery Jersey</div>
              <div className="product-price">Price: 400 /-</div>
            </div> */}
          {/* </div> */}
        {/* </div> */}
        
        <div className="card-two">
          <div className="card-two-left">
            <h1 className="card-two-left-header">About InstiBuzz</h1>
            <p className="card-two-left-para-one">At InstiBuzz, we celebrate the vibrant campus life by offering an exclusive
                      collection of T-shirts that feature Insti slang, taglines, and campus spirit
                      designs. We carefully select each piece in our collections, making sure that it
                      meets our high standards. Our <br/>T-shirts feel exceptional because they are:
                      expertly crafted to fit well, last long and look great. Shop today and experience
                      the campus spirit.</p>
            <p className="card-two-left-para-two">We aim to unite and influence the culture of educational institutes, starting with IIT Madras
             and expanding to other colleges across India. At InstiBuzz, we believe that the
             right T-shirt can make a statement and create a sense of belonging. That`s why we`re
             committed to bringing you the latest trends and styles that capture your campus spirit.</p>
            <a className='learn-more-button' href=''>Learn More</a>          
          </div>
          <div className="card-two-right">
              <img src={Dikchand} alt="" className="card-two-right-img" />
          </div>
        </div>
      </div>


    </>
  )
}

export default Home
