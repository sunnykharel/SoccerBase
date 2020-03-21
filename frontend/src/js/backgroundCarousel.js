import React, { Component } from 'react'
 
import BackgroundSlideshow from 'react-background-slideshow'
 
import image1 from './../images/a.png'
import image2 from './../images/b.png'
import image3 from './../images/c.png'
 

const BackgroundCarousel = () =>  {
    return (
      <div >
        <BackgroundSlideshow id = "slideshow" images={[image1, image2, image3 ]}
        animationDelay = "2000" disableClick = "true" />
      </div>
        
    )
}


export default BackgroundCarousel;