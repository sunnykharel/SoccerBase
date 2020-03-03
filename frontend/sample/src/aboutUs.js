import React from 'react';
import Askar from './Askar.png';
import Nithin from './Nithin.png';
import Sunny from './Sunny.png';

import './aboutUs.css'


const About = () => {
    return (
       <div style={{backgroundColor : "#5F9EA0", paddingTop : "10px"}}>
          <h1 style = {{textAlign: "center"}} >About Us</h1>
          <p style = {{textAlign: "center"}}>More about the team that brought you this Soccer Database</p>
            <br></br>
            <br></br>
          <div style={{backgroundColor : "#ADD8E6", paddingTop : "10px", paddingBottom : "10px"}}>
            <p style = {{textAlign: "center"}}>SoccerBase is a database for searching information about International Soccer</p>
            <p style = {{textAlign: "center"}}>The Database houses information ranging from Leagues to Players</p>
            <p style = {{textAlign: "center"}}>This database was brought to you by the following EE 461L group 9 members:</p>
          </div>

          <div style={{backgroundColor : "#B0C4DE", paddingTop : "10px", paddingBottom: "1000px"}}>
            <img src={Askar} class = "members"/>
            <img src={Sunny} class = "members"/>
            <img src={Nithin} class = "members"/>
            <img src={Askar} class = "members"/>

            <div>
              <h6 class = "memberName" id = "askar"> Askar Poudyal </h6>  
              <h6 class = "memberName" id = "sunny"> Sunny Kharel</h6>  
              <h6 class = "memberName" id = "nithin"> Nithin Panchakarla</h6>  
              <h6 class = "memberName" id = "tanay"> Tanay Bidnurkar</h6>  
            </div>

            <div>
            <h1> Add GitHub Stuff here:</h1>

            </div>

          </div>
       </div>
     
    );
}
 
export default About;