import React, { Component } from 'react'
//import FrontEnd from './../images/Front-End.png'
// react component for creating beautiful carousel
import Carousel from "react-slick";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import LocationOn from "@material-ui/icons/LocationOn";
// core components
import Grid from '@material-ui/core/Grid';
// import GridItem from "components/Grid/GridItem.js";
//import Card from "components/Card/Card.js";
import Card from '@material-ui/core/Card';
import Slider from "react-slick";

//import carouselStyle from "assets/jss/nextjs-material-kit-pro/pages/componentsSections/carouselStyle.js";

import image2 from "./../images/Capture3.jpg";
import image1 from "./../images/Capture.PNG";
import image3 from "./../images/Capture2.jpg";

// const useStyles = makeStyles(carouselStyle);
import './../css/home.css'


function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "red" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "green" }}
      onClick={onClick}
    />
  );
}
export default function SectionCarousel() {
  // const classes = useStyles();
  // const settings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 1000,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   autoplay: true,
  //   nextArrow: <SampleNextArrow />,
  //   prevArrow: <SamplePrevArrow />
  // };

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    autoplaySpeed: 2000,
    adaptiveHeight: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    // fade: true,
    adaptiveHeight: true,
    centerPadding: "60px",
    nextArrow: <SampleNextArrow />,
    // prevArrow: <SamplePrevArrow />
  };
  return (
    <div  id="carousel">
        {/* maybe put the search bar here? */}
        <div >
        <Slider {...settings}  style={{
            width: "98%",
            height: "auto"}}>
          <div className="slick">
          <img src={image1}  alt="First slide" className="slick-image" style={{
            width: "100%",
            height: "auto"
            }} />
          </div>
          <div className="slick">
          <img src={image2} alt="Second slide" className="slick-image" style={{
            width: "100%",
            height: "auto",
            }} />
          </div>
          <div className="slick">
            <img src={image3} alt="Third slide" className="slick-image" style={{
            width: "100%",
            height: "auto",
            }} />
          </div>
        </Slider>
        </div>
      
      </div>
  );
}

