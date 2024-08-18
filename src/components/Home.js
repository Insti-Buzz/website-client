import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "../css/Home.css";
// import LatestArrivals from './LatestArrivals';
import { useRef, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import cultureImg from "../assets/About us/Culture.png";
import integrationImg from "../assets/About us/Integration.png";
import visibilityImg from "../assets/About us/Visibility.png";
import communityImg from "../assets/About us/Community.png";

// import '../css/Carousel.css';
import CoverImg2 from "../assets/red wall intense-min-min.jpg";
import CoverImg4 from "../assets/take lite back-min-min.jpg";
import CoverImg1 from "../assets/avg iitian pair -park-min-min.jpg";
import CoverImg3 from "../assets/trio 2-min-min.jpg";

// import '../css/LatestArrivals.css'
import Avg_IITian_1 from "../assets/boy back avg iitm-min-min.jpg";
import Avg_IITian_2 from "../assets/girl back final-min-min.jpg";
import Take_Lite_1 from "../assets/boy front take lite-min-min.jpg";
import Take_Lite_2 from "../assets/boy back on tree-portrait-min-min.jpg";
import Boss_Baby_1 from "../assets/pair back front-min-min.jpg";
import Boss_Baby_2 from "../assets/rutika side look-min-min.jpg";

import White_IITM_1 from "../assets/girl back-min-min.jpg";
import White_IITM_2 from "../assets/boy front white iitm-min-min.jpg";
import Green_IITM_1 from "../assets/girl front green iitm-min-min.jpg";
import Green_IITM_2 from "../assets/boy back green iitm-min-min.jpg";
import Entre_Flame_1 from "../assets/boy back-min-min.jpg";
import Entre_Flame_2 from "../assets/girl front-min-min.jpg";

import Banner from "../assets/Home-Banner.jpg";
import mobileBanner from "../assets/Home-mobile-banner.jpg";
// import Banner from '../assets/t20_banner.jpg';
// import mobileBanner from '../assets/t20_banner_mobile.jpg';
import collabImg from "../assets/Home/collab.svg";
import testimonialDesign from "../assets/Home/testimonialDesign.svg";
import {
  Autoplay,
  EffectCoverflow,
} from "swiper/modules";
import { useNavigate } from "react-router-dom";

function Home() {
  const coverImgArray = [CoverImg1, CoverImg2, CoverImg3, CoverImg4];

  const overSizedProducts = [
    {
      productName: "Average IITian",
      image: [Avg_IITian_1, Avg_IITian_2],
      link: "/shop",
    },
    {
      productName: "Take Lite",
      image: [Take_Lite_1, Take_Lite_2],
      link: "/shop",
    },
    {
      productName: "Boss Baby",
      image: [Boss_Baby_1, Boss_Baby_2],
      link: "/shop",
    },
  ];

  const normalProducts = [
    {
      productName: "White IIT M",
      image: [White_IITM_1, White_IITM_2],
      link: "/shop",
    },
    {
      productName: "Green IIT M",
      image: [Green_IITM_1, Green_IITM_2],
      link: "/shop",
    },
    {
      productName: "Entreprenurial Flame",
      image: [Entre_Flame_1, Entre_Flame_2],
      link: "/shop",
    },
  ];

  const testimonials = [
    {
      name: "Jujhar",
      testimonial: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqu Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      photo: "https://placehold.co/400"
    },
    {
      name: "Jujhar",
      testimonial: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqu Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      photo: "https://placehold.co/400"
    },
    {
      name: "Jujhar",
      testimonial: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqu Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      photo: "https://placehold.co/400"
    },
    {
      name: "Jujhar",
      testimonial: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqu Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      photo: "https://placehold.co/400"
    },
    {
      name: "Jujhar",
      testimonial: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqu Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      photo: "https://placehold.co/400"
    },
  ]

  const [overSizedCount, setOverSizedCount] = useState(0);
  const [classicCountOne, setClassicCountOne] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval_2 = setInterval(() => {
      setClassicCountOne(
        (prevCount) => (prevCount + 1) % normalProducts.length
      );
    }, 4109);

    const interval_1 = setInterval(() => {
      setOverSizedCount(
        (prevCount) => (prevCount + 1) % overSizedProducts.length
      );
    }, 5931);

    return () => {
      clearInterval(interval_1);
      clearInterval(interval_2);
    };
  }, []);

  function testimonialCard(item, index) {
    return (
      <SwiperSlide>
        <div className="home-testimonial-card">
          <h4>{item.name}</h4>
          <p>
            {item.testimonial}
          </p>
          <div className="home-testimonial-img">
            <img src={item.photo} />
          </div>
        </div>
      </SwiperSlide>
    );
  }

  function testimonialCardMobile(item, index) {
    return (
      <SwiperSlide>
        <div className="home-testimonial-card">
          <div className="home-testimonial-img-container">
            <div className="home-testimonial-img">
              <img src={testimonials[0].photo} />
            </div>
          </div>
          <p>
            {testimonials[0].testimonial}
          </p>
          <h4>{testimonials[0].name}</h4>
        </div>
      </SwiperSlide>
    );
  }

  return (
    <>
      <Helmet>
        <meta name="title" content="InstiBuzz : The all-in-one Campus Brand" />
        <meta
          name="description"
          content="At InstiBuzz, we celebrate the vibrant campus life by offering an exclusive
        collection of T-shirts that feature Insti slang, taglines, and campus spirit
        designs. We carefully select each piece in our collections, making sure that it
        meets our high standards. Our T-shirts feel exceptional because they are
        expertly crafted to fit well, last long and look great. Shop today and experience
        the campus spirit."
        />
        <meta
          name="keywords"
          content="InstiBuzz, instibuzz, IIT Madras, College Fashion, College Culture"
        />
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="robots" content="all" />

        <meta name="og:site_name" content="InstiBuzz" />
        <meta
          name="og:title"
          content="Welcome to InstiBuzz: The one-stop-shop Campus Brand"
        />
        <meta
          name="og:description"
          content="At InstiBuzz, we celebrate the vibrant campus life by offering an exclusive
        collection of T-shirts that feature Insti slang, taglines, and campus spirit
        designs. We carefully select each piece in our collections, making sure that it
        meets our high standards. Our T-shirts feel exceptional because they are
        expertly crafted to fit well, last long and look great. Shop today and experience
        the campus spirit."
        />
        <meta name="og:url" content="https://www.instibuzz.com" />
        <meta name="og:image" content="%PUBLIC_URL%/logo192.png" />
        <meta
          name="og:image:alt"
          content="Official logo of InstiBuzz Pvt Ltd."
        />
        <meta name="author" content="instibuzz" />
      </Helmet>
      <div className="home-desktop">

        <div className="home-carousel">
          <Swiper
            // pagination={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            loop={true}
            grabCursor={true}
            modules={[Autoplay]}
            className="mySwiper"
          >
            {
              coverImgArray.map((item, index) => {
                return (<SwiperSlide><img src={item} /></SwiperSlide>);
              })
            }
          </Swiper>
        </div>
        <div className="home-new-collection">
          <h2>New collection</h2>
          <hr />
          <div className="home-new-collection-imgs">
            <div>
              <img
                onClick={() => navigate("/shop")}
                src={
                  normalProducts[classicCountOne % normalProducts.length].image[1]
                }
              />
            </div>
            <div>
              <img
                onClick={() => navigate("/shop")}
                src={
                  overSizedProducts[overSizedCount % overSizedProducts.length]
                    .image[1]
                }
              />
            </div>
            <div>
              <img
                onClick={() => navigate("/shop")}
                src={
                  normalProducts[(classicCountOne + 2) % normalProducts.length]
                    .image[1]
                }
              />
            </div>
          </div>
          <hr />
        </div>
        <div className="home-what-we-offer">
          <h2>What We Offer?</h2>
          <div className="home-what-we-offer-grid">
            <div onClick={() => navigate("/ourServices")} className="home-what-we-offer-card">
              <img src={integrationImg} alt="ClipArt for integration" />
              <h3>Manufacturing</h3>
              <p>
                We uphold our unwavering dedication to quality. We meticulously
                source materials from esteemed units in Tirupur, renowned for
                their superior quality fabrics knitted with utmost care...
              </p>
            </div>
            <div onClick={() => navigate("/ourServices")} className="home-what-we-offer-card">
              <img src={communityImg} alt="ClipArt for integration" />
              <h3>Design</h3>
              <p>
                At InstiBuzz, our products go beyond mere fashion - they embody
                the vibrant essence of college life, capturing its lively emotions
                and memorable moments. Our designers carefully blend the spirit of
                campus life with modern fashion trends...
              </p>
            </div>
            <div onClick={() => navigate("/ourServices")} className="home-what-we-offer-card">
              <img src={cultureImg} alt="ClipArt for integration" />
              <h3>Sales</h3>
              <p>
                Our website is a dynamic platform that captures the essence of
                college life. By seamlessly integrating different clubs and
                organizations of the college that enrich the campus experience, we
                provide a space for them to showcase and sell their tees to the
                entire Insti audience...
              </p>
            </div>
            <div onClick={() => navigate("/ourServices")} className="home-what-we-offer-card">
              <img src={visibilityImg} alt="ClipArt for integration" />
              <h3>Visibility</h3>
              <p>
                We actively support Insti clubs and societies by helping them
                market their events. This involves leveraging our website and
                social media platforms to boost visibility and engagement...
              </p>
            </div>
          </div>
          <div className="home-what-we-offer-btn-container">
            <button
              className="home-what-we-offer-btn"
              onClick={() => navigate("/ourServices")}
            >
              Know more
            </button>
          </div>
          <hr />
        </div>
        <div className="home-banner home-banner-desktop">
          <img
            src={Banner}
            alt="Banner for Home page for advertising"
            className="home-banner-image"
          />
        </div>
        <div className="home-collab">
          <hr />
          <h2>Collaboration</h2>
          <div className="home-collab-display">
            <div className="home-collab-content">
              <h3>Let's Work Together!</h3>
              <p>
                We are a diverse group with varied perspectives who love to
                express the campus stories and we believe the best way to do that
                is by fashion!
              </p>
              <p>
                We are always looking for people to join us in this fun and
                creative journey of elevating campus fashion. If you think you
                will fit just right in, apply right away!
              </p>
              <div className="home-collab-btn-container">
                <button onClick={() => navigate("/collabForm")} className="home-collab-btn">View Details</button>
              </div>
            </div>
            <div className="home-collab-img">
              <img src={collabImg} />
            </div>
          </div>
        </div>
        {/* <div className="home-testimonial">
          <div className="home-testimonial-design-container">
            <img src={testimonialDesign} />
          </div>
          <div className="home-testimonial-heading">
            <h2>What Our Clients Say</h2>
            <p>
              Our clients send us bunch of smiles with our services and we love
              them.
            </p>
          </div>
          <div className="home-testimonials-card-container">
            <Swiper
              effect={"coverflow"}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={"auto"}
              spaceBetween={100}
              loop={true}
              autoplay={{
                delay: 1500,
                disableOnInteraction: false,
              }}
              coverflowEffect={{
                rotate: 45,
                stretch: 0,
                depth: 150,
                modifier: 1,
                slideShadows: false,
              }}
              modules={[Autoplay, EffectCoverflow]}
              className="mySwiper"
            >
              {
                testimonials.map(testimonialCard)
              }
            </Swiper>
          </div>
        </div > */}
      </div>
      <div className="home-mobile">
        <div className="home-carousel">
          <Swiper
            // pagination={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            loop={true}
            grabCursor={true}
            modules={[Autoplay]}
            className="mySwiper"
          >
            {
              coverImgArray.map((item, index) => {
                return (<SwiperSlide><img src={item} /></SwiperSlide>);
              })
            }
          </Swiper>
        </div>
        <div className="home-new-collection">
          <h3>New Collection</h3>
          <div className="home-new-collection-grid">
            <div>
              <img
                onClick={() => navigate("/shop")}
                src={
                  normalProducts[classicCountOne % normalProducts.length].image[1]
                }
              />
            </div>
            <div>
              <img
                onClick={() => navigate("/shop")}
                src={
                  overSizedProducts[overSizedCount % overSizedProducts.length]
                    .image[1]
                }
              />
            </div>
            <div>
              <img
                onClick={() => navigate("/shop")}
                src={
                  normalProducts[(classicCountOne + 2) % normalProducts.length]
                    .image[1]
                }
              />
            </div>
            <div>
              <img
                onClick={() => navigate("/shop")}
                src={
                  overSizedProducts[(overSizedCount + 2) % overSizedProducts.length]
                    .image[1]
                }
              />
            </div>
          </div>
        </div>
        <div className="home-what-we-offer">
          <h3>What we offer?</h3>
          <div className="home-what-we-offer-grid-mobile">
            <div className="home-what-we-offer-card">
              <img src={integrationImg} alt="ClipArt for integration" />
              <h3>Manufacturing</h3>
              <p>
                We uphold our unwavering dedication to quality. We meticulously
                source materials from esteemed units in Tirupur, renowned for
                their superior quality fabrics knitted with utmost care...
              </p>
            </div>
            <div className="home-what-we-offer-card">
              <img src={communityImg} alt="ClipArt for integration" />
              <h3>Design</h3>
              <p>
                At InstiBuzz, our products go beyond mere fashion - they embody
                the vibrant essence of college life, capturing its lively emotions
                and memorable moments...
              </p>
            </div>
            <div className="home-what-we-offer-card">
              <img src={cultureImg} alt="ClipArt for integration" />
              <h3>Sales</h3>
              <p>
                By seamlessly integrating different clubs and
                organizations of the college that enrich the campus experience, we
                provide a space for them to showcase and sell their tees to the
                entire Insti audience...
              </p>
            </div>
            <div className="home-what-we-offer-card">
              <img src={visibilityImg} alt="ClipArt for integration" />
              <h3>Visibility</h3>
              <p>
                We actively support Insti clubs and societies by helping them
                market their events. This involves leveraging our website and
                social media platforms to boost visibility and engagement...
              </p>
            </div>
          </div>
          <div className="home-what-we-offer-btn-container">
            <button
              className="home-what-we-offer-btn"
              onClick={() => navigate("/ourServices")}
            >
              Know more
            </button>
          </div>
        </div>
        <div className="home-banner">
          <img src={mobileBanner} />
        </div>
        <div className="home-collab">
          <hr />
          <h3>Collaboration</h3>
          <div className="home-collab-container">
            <h4>Let's Work Together!</h4>
            <p>
              We are a diverse group with varied perspectives who love to
              express the campus stories and we believe the best way to do that
              is by fashion!
            </p>
            <p>
              We are always looking for people to join us in this fun and
              creative journey of elevating campus fashion. If you think you
              will fit just right in, apply right away!
            </p>
            <div className="home-collab-btn">
              <button onClick={() => navigate("/collabForm")}>View details</button>
            </div>
          </div>
        </div>
        {/* <div className="home-testimonials">
          <hr />
          <h3>What Our Clients Say</h3>
          <Swiper
            spaceBetween={5}
            slidesPerView={1.25}
            loop={true}
            centeredSlides={true}
            autoplay={{
              delay: 1500,
              disableOnInteraction: false,
            }}
            // pagination={{
            //     clickable: true,
            // }}
            // navigation={true}
            modules={[Autoplay]}
            className="mySwiper"
          >
            {
              testimonials.map(testimonialCardMobile)
            }
          </Swiper>
        </div> */}
      </div>
    </>
  );
}

export default Home;
