import '../css/Home.css'
// import LatestArrivals from './LatestArrivals';
import { useRef, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

// import '../css/Carousel.css';
import CoverImg2 from '../assets/red wall intense-min-min.jpg';
import CoverImg4 from '../assets/take lite back-min-min.jpg';
import CoverImg1 from '../assets/avg iitian pair -park-min-min.jpg';
import CoverImg3 from '../assets/trio 2-min-min.jpg';

// import '../css/LatestArrivals.css'
import Avg_IITian_1 from '../assets/boy back avg iitm-min-min.jpg';
import Avg_IITian_2 from '../assets/girl back final-min-min.jpg';
import Take_Lite_1 from '../assets/boy front take lite-min-min.jpg';
import Take_Lite_2 from '../assets/boy back on tree-portrait-min-min.jpg';
import Boss_Baby_1 from '../assets/pair back front-min-min.jpg';
import Boss_Baby_2 from '../assets/rutika side look-min-min.jpg';

import White_IITM_1 from '../assets/girl back-min-min.jpg';
import White_IITM_2 from '../assets/boy front white iitm-min-min.jpg';
import Green_IITM_1 from '../assets/girl front green iitm-min-min.jpg';
import Green_IITM_2 from '../assets/boy back green iitm-min-min.jpg';
import Entre_Flame_1 from '../assets/boy back-min-min.jpg';
import Entre_Flame_2 from '../assets/girl front-min-min.jpg';

import Banner from '../assets/Home-Banner.jpg'
import mobileBanner from '../assets/Home-mobile-banner.jpg';
// import Banner from '../assets/t20_banner.jpg';
// import mobileBanner from '../assets/t20_banner_mobile.jpg';
import { useNavigate } from 'react-router-dom';

function Home() {

  const coverImgArray = [CoverImg1, CoverImg2, CoverImg3, CoverImg4];
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const carouselInterval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % coverImgArray.length);
    }, 5000);

    return () => clearInterval(carouselInterval);
  }, [coverImgArray.length]);

  const overSizedProducts = [
    { productName: "Average IITian", image: [Avg_IITian_1, Avg_IITian_2], link: "/shop" },
    { productName: "Take Lite", image: [Take_Lite_1, Take_Lite_2], link: "/shop" },
    { productName: "Boss Baby", image: [Boss_Baby_1, Boss_Baby_2], link: "/shop" },
  ];

  const normalProducts = [
    { productName: "White IIT M", image: [White_IITM_1, White_IITM_2], link: "/shop" },
    { productName: "Green IIT M", image: [Green_IITM_1, Green_IITM_2], link: "/shop" },
    { productName: "Entreprenurial Flame", image: [Entre_Flame_1, Entre_Flame_2], link: "/shop" },
  ];

  const [overSizedCount, setOverSizedCount] = useState(0);
  const [classicCountOne, setClassicCountOne] = useState(0);
  const navigate = useNavigate()

  useEffect(() => {
    const interval_2 = setInterval(() => {
      setClassicCountOne(prevCount => (prevCount + 1) % normalProducts.length);
    }, 4109);


    const interval_1 = setInterval(() => {
      setOverSizedCount(prevCount => (prevCount + 1) % overSizedProducts.length);
    }, 5931);

    return () => {
      clearInterval(interval_1);
      clearInterval(interval_2);
    }

  }, [])

  return (

    <>
      <Helmet>
        <meta name="title" content="InstiBuzz : The all-in-one Campus Brand"/>
        <meta name="description" content="At InstiBuzz, we celebrate the vibrant campus life by offering an exclusive
        collection of T-shirts that feature Insti slang, taglines, and campus spirit
        designs. We carefully select each piece in our collections, making sure that it
        meets our high standards. Our T-shirts feel exceptional because they are
        expertly crafted to fit well, last long and look great. Shop today and experience
        the campus spirit." />
        <meta name="keywords" content="InstiBuzz, instibuzz, IIT Madras, College Fashion, College Culture" />
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="robots" content="all"/>
        
        <meta name="og:site_name" content="InstiBuzz"/>
        <meta name="og:title" content="Welcome to InstiBuzz: The one-stop-shop Campus Brand"/>
        <meta name="og:description" content="At InstiBuzz, we celebrate the vibrant campus life by offering an exclusive
        collection of T-shirts that feature Insti slang, taglines, and campus spirit
        designs. We carefully select each piece in our collections, making sure that it
        meets our high standards. Our T-shirts feel exceptional because they are
        expertly crafted to fit well, last long and look great. Shop today and experience
        the campus spirit."/>
        <meta name="og:url" content="https://www.instibuzz.com" />
        <meta name="og:image" content="%PUBLIC_URL%/logo192.png"/>
        <meta name="og:image:alt" content="Official logo of InstiBuzz Pvt Ltd."/>
        <meta name="author" content="instibuzz" />        
      </Helmet>

      <div className="home-top">
        <div className="home-top-carousal">
          <div className="home-carousel-container">
            {coverImgArray.map((img, index) => {
              let position = index - activeIndex - 1;
              if (position < -1) position = position + coverImgArray.length;
              return (
                <img
                  key={index}
                  src={img}
                  alt="Models styling InstiBuzz Tees"
                  style={{
                    zIndex: coverImgArray.length - position,
                    transform: `translateX(${100 * position}%)`,
                    transition: `transform 1.5s`,
                  }}
                  className="home-carousel-image"
                />
              );
            })}
          </div>
        </div>
      </div>

        <div className="home-banner">
          <img src={Banner} alt='Banner for Home page for advertising' className='home-banner-image'/>
        </div>
        <div className="home-banner-mobile">
          <img src={mobileBanner} alt='Banner for advertising'/>
        </div>

      <div className="home-bottom" >

        <div className="home-bottom-container-one">
          <h1 className="home-container-one-title">Best Sellers</h1>
          <div className="home-container-one-cards-container">
            {/* <LatestArrivals></LatestArrivals> */}
            <>
              <a className="home-container-one-card-one" href={normalProducts[(classicCountOne + 2) % normalProducts.length].link}>
                <img src={normalProducts[classicCountOne % normalProducts.length].image[1]} alt={normalProducts[classicCountOne % normalProducts.length].productName} className="home-product-image-one home-product-image" />
                {/* <p className="product-name product-name-one">InstiBuzz Classic Tees</p> */}
              </a>

              <a className="home-container-one-card-two" href={overSizedProducts[overSizedCount % overSizedProducts.length].link}>
                <img src={overSizedProducts[overSizedCount % overSizedProducts.length].image[1]} alt={overSizedProducts[overSizedCount % overSizedProducts.length].productName} className="home-product-image-two home-product-image" />
                {/* <p className="product-name product-name-two">Over-Sized Tees</p> */}
              </a>

              <a className="home-container-one-card-three" href={normalProducts[(classicCountOne + 2) % normalProducts.length].link}>
                <img src={normalProducts[(classicCountOne + 2) % normalProducts.length].image[1]} alt={normalProducts[(classicCountOne + 2) % normalProducts.length].image} className="home-product-image-three home-product-image" />
                {/* <p className="product-name product-name-three">InstiBuzz Classic Tees</p> */}
              </a>

            </>
          </div>
        </div>

        {/* <div className="home-bottom-container-two">
          <div className="home-container-two-video-container">
            <video className='home-video' width='100%' height='100%' autoPlay muted loop>
              <source src={Video} type="video/mp4" />
            </video>
          </div>
        </div> */}

        <div className="home-bottom-container-three">
        <div className="home-bottom-container-three-bar">
            <div className="home-bar-collab-text-one">OUR SERVICES</div>
        </div>
          <h1 className="home-bottom-container-three-title">What we Offer?</h1>
          <div className="home-container-three-top">
            <div className="home-service-one">
              <h1 className='home-service-one-title'>Manufacturing</h1>
              <p className="home-service-one-text">Starting with the first phase,
                i.e. Manufacturing, we uphold our unwavering dedication to quality.
                We meticulously source materials from esteemed....  </p>
              <div className="home-service-one-button-container">
                <a href='/ourServices' className="home-service-one-button">Know more</a>
              </div>
            </div>
            <div className="home-filler-div-one">
              <i className="fa fa-long-arrow-up" aria-hidden="true"></i>
            </div>
            <div className="home-service-two">
              <h1 className='home-service-two-title'>Design</h1>
              <p className="home-service-two-text">The second aspect is Design.
                At InstiBuzz, our products go beyond mere fashion - they embody the
                vibrant essence ... </p>
              <div className="home-service-two-button-container">
                <a href="/ourServices" className="home-service-two-button">Know more</a>
              </div>
            </div>
          </div>
          <div className="home-container-three-bottom">
            <div className="home-service-three">
              <h1 className='home-service-three-title'>Sales</h1>
              <p className="home-service-three-text">Next is the Sales.
                Our website is a dynamic platform that captures the essence of
                college life. By seamlessly integrating different clubs and organizations.. </p>
              <div className="home-service-three-button-container">
                <a href="/ourServices" className="home-service-three-button">Know more</a>
              </div>
            </div>
            <div className="home-service-four">
              <h1 className='home-service-four-title'>Visibility</h1>
              <p className="home-service-four-text">Lastly comes Visibility.We actively support Insti clubs
                and societies by helping them market their events. This involves
                leveraging our website and social media platforms to... </p>
              <div className="home-service-four-button-container">
                <a href="/ourServices" className="home-service-four-button">Know more</a>
              </div>
            </div>
            <div className="home-filler-div-two">
              <i className="fa fa-snowflake-o" aria-hidden="true"></i>
            </div>
            <div className="home-service-button-container">
                <a href="/ourServices" className="home-service-button">Know more</a>
            </div>
            

          </div>
        </div>

        <div className="home-bottom-container-four">
          <div className="home-bottom-container-four-bar">
            <div className="home-bar-collab-text">COLLABORATION</div>
          </div>
          <h1 className="home-bottom-container-four-title">Let's Work Together!</h1>
          <div className="home-four-container">
            <p className="home-four-container-text">We are a diverse group with varied perspectives who love to express the campus stories and we believe the best way to do that is by fashion!
<br/> <br/>We are always looking for people to join us in this fun and creative journey of elevating campus fashion. If you think you will fit just right in, apply right away!</p>
            {/* <p className="home-four-container-text">This is the space to tell people what it's like to work with the business. Describe the team's culture and why people enjoy being a part of it.</p> */}
            <div className="bottom-container-four-button-container">
                <a className="collaborate-button" href='/collab'>View Details</a>
            </div>
          </div>
        </div>


      </div>


    </>
  )
}

export default Home