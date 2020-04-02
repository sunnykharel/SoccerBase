import React, { Component } from 'react'
import FrontEnd from './../images/Front-End.png'


var sectionStyle = {
  width: "1536px",
  height: "690px",
  backgroundImage: "url(" +  FrontEnd  + ")",
  backgroundSize: "cover"
};

class Home extends Component {
  render() {
    return (
      <div> 
      <section style={ sectionStyle }>
       </section>
      </div>
    )
  }
}
 
export default Home;