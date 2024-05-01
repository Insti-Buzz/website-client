import '../css/Home.css'
// import LatestArrivals from './LatestArrivals';
import { useRef, useEffect, useState } from 'react';
import Video from '../assets/mylivewallpapers.com-City-Night-Lights.mp4'

// import '../css/Carousel.css';
import CoverImg1 from '../assets/red wall intense-min-min.jpg';
import CoverImg2 from '../assets/take lite back-min-min.jpg';
import CoverImg3 from '../assets/avg iitian pair -park-min-min.jpg';
import CoverImg4 from '../assets/trio 2-min-min.jpg';

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

import Banner from '../assets/Home-Banner.png'
import { useNavigate } from 'react-router-dom';





function Home() {
  const latestArrivalsRef = useRef(null);
  const ScrollToLatestArrivals = () => {
    useEffect(() => {
      if (latestArrivalsRef.current) {
        const latestArrivalsTop = latestArrivalsRef.current.offsetTop;

        setTimeout(() => {
          window.scrollTo({
            top: latestArrivalsTop - 70,
            behavior: 'smooth'
          });
        }, 700);

      }
    }, []);

  };
  ScrollToLatestArrivals();

  // for carousal
  const coverImgArray = [CoverImg1, CoverImg2, CoverImg3, CoverImg4];
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const carouselInterval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % coverImgArray.length);
    }, 5000);

    return () => clearInterval(carouselInterval);
  }, [coverImgArray.length]);

  const toOurServices = () => {
    navigate("/ourServices")
  }

  // for Latest Arrivals
  const overSizedProducts = [
    { productName: "Average IITian", image: [Avg_IITian_1, Avg_IITian_2], link: "#" },
    { productName: "Take Lite", image: [Take_Lite_1, Take_Lite_2], link: "#" },
    { productName: "Boss Baby", image: [Boss_Baby_1, Boss_Baby_2], link: "#" },
  ];

  const normalProducts = [
    { productName: "White IIT M", image: [White_IITM_1, White_IITM_2], link: "#" },
    { productName: "Green IIT M", image: [Green_IITM_1, Green_IITM_2], link: "#" },
    { productName: "Entreprenurial Flame", image: [Entre_Flame_1, Entre_Flame_2], link: "#" },
  ];

  const [overSizedCount, setOverSizedCount] = useState(0);
  const [classicCountOne, setClassicCountOne] = useState(0);
  const navigate = useNavigate()

  useEffect(() => {
    const interval_2 = setInterval(() => {
      setClassicCountOne(prevCount => (prevCount + 1) % normalProducts.length);
      console.log("The interval 2 count is", classicCountOne);
    }, 4109);


    const interval_1 = setInterval(() => {
      setOverSizedCount(prevCount => (prevCount + 1) % overSizedProducts.length);
      console.log("The interval 1 count is", overSizedCount);
    }, 5931);

    return () => {
      clearInterval(interval_1);
      clearInterval(interval_2);
    }

  }, [])

  return (

    <>
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
                  alt={index}
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

      <div className="home-bottom" >

        <div className="home-bottom-container-one" ref={latestArrivalsRef}>
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

        <div className="home-banner">
          <img src={Banner}/>
        </div>

        {/* <div className="home-bottom-container-two">
          <div className="home-container-two-video-container">
            <video className='home-video' width='100%' height='100%' autoPlay muted loop>
              <source src={Video} type="video/mp4" />
            </video>
          </div>
        </div> */}

        <div className="home-bottom-container-three">
          <div className="home-container-three-top">
            <div className="home-service-one">
              <h1 className='home-service-one-title'>Manufacturing</h1>
              <p className="home-service-one-text">Starting with the first phase,
                i.e. Manufacturing, we uphold our unwavering dedication to quality.
                We meticulously source materials from esteemed....  </p>
              <div className="home-service-one-button-container">
                <div onClick={toOurServices} className="home-service-one-button">Know more</div>
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
                <div onClick={toOurServices} className="home-service-two-button">Know more</div>
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
                <div onClick={toOurServices} className="home-service-three-button">Know more</div>
              </div>
            </div>
            <div className="home-service-four">
              <h1 className='home-service-four-title'>Visibility</h1>
              <p className="home-service-four-text">Lastly comes Visibility.We actively support Insti clubs
                and societies by helping them market their events. This involves
                leveraging our website and social media platforms to... </p>
              <div className="home-service-four-button-container">
                <div onClick={toOurServices} className="home-service-four-button">Know more</div>
              </div>
            </div>
            <div className="home-filler-div-two">
              <i className="fa fa-snowflake-o" aria-hidden="true"></i>
            </div>

          </div>
        </div>

        <div className="home-bottom-container-four">
          <div className="home-bottom-container-four-bar">
            <div className="home-bar-collab-text">COLLABORATION</div>
          </div>
          <h1 className="home-bottom-container-four-title">Want to Work With InstiBuzz?</h1>
          <div className="home-four-container">
            <p className="home-four-container-text">This is the space to tell people what it's like to work with the business. Describe the team's culture and why people enjoy being a part of it.</p>
            <div className="home-four-container-cards-container">
              <div className="home-fccc-card">
                <h3 className="home-fccc-card-title">Designers</h3>
                <p className="home-fccc-card-body">Our designs capture the essence of campus life,
                  reflecting the vibrancy and spirit of our college community. By becoming part of
                  our designer squad, you'll have the opportunity to immerse yourself in college
                  festivals, social events, and more, you will have a hands-on along the way. Join
                  our dynamic design team where you'll not only create but also learn extensively
                  about graphic designing</p>
                {/* <div className="home-fccc-card-desc">
                  <div className="home-desc-one">
                    <div className="home-ques-one">Location</div>
                    <div className="home-ans-one">Chennai</div>
                  </div>
                  <div className="home-desc-two">
                    <div className="home-ques-two">Type</div>
                    <div className="home-ans-two">Offline / WFH</div>
                  </div>
                </div> */}
                <div className="home-fccc-card-button">Start Now</div>
              </div>
              <div className="home-fccc-card">
                <h3 className="home-fccc-card-title">Manufacturers</h3>
                <p className="home-fccc-card-body">At InstiBuzz, we place great
                  importance on the quality of our tees as it reflects our promise
                  to customers. We actively seek partnerships with manufacturers who
                  can deliver cost-effective solutions, timely production, and superior
                  materials for our designs. This ensures that our customers receive nothing
                  but the best when they choose Instibuzz products.</p>
                {/* <div className="home-fccc-card-desc">
                  <div className="home-desc-one">
                    <div className="home-ques-one">Location</div>
                    <div className="home-ans-one">Chennai</div>
                  </div>
                  <div className="home-desc-two">
                    <div className="home-ques-two">Type</div>
                    <div className="home-ans-two">Offline / WFH</div>
                  </div>
                </div> */}
                <div className="home-fccc-card-button">Start Now</div>
              </div>
              <div className="home-fccc-card">
                <h3 className="home-fccc-card-title">Videographers</h3>
                <p className="home-fccc-card-body">As part of Instibuzz's videography 
                team, you'll dive into the world of shooting and editing engaging videos 
                and photos. Your role extends beyond creativity as you join our Social Media 
                Marketing Team, actively enhancing our presence and engagement across diverse
                 social media channels.</p>
                {/* <div className="home-fccc-card-desc">
                  <div className="home-desc-one">
                    <div className="home-ques-one">Location</div>
                    <div className="home-ans-one">Chennai</div>
                  </div>
                  <div className="home-desc-two">
                    <div className="home-ques-two">Type</div>
                    <div className="home-ans-two">Offline / WFH</div>
                  </div>
                </div> */}
                <div className="home-fccc-card-button">Start Now</div>
              </div>
            </div>
          </div>
        </div>


      </div>


    </>
  )
}

export default Home