import React, { Component } from 'react'
import Askar from './Askar.png';
import Nithin from './Nithin.png';
import Sunny from './Sunny.png';
import Parm from './Parmdeep.png';
import Tanay from './Tanay.png';

import './aboutUs.css'

const httpCommits = new XMLHttpRequest();
const urlCommits = "https://api.github.com/repos/sunnykharel/SoccerBase/stats/commit_activity";
httpCommits.open("GET",urlCommits);
httpCommits.setRequestHeader("Authorization", "Basic " + btoa("grewalparm:Verybadpassword1!"));
httpCommits.send();

httpCommits.onreadystatechange = (error) => {
  console.log(httpCommits.responseText);
}

const httpIssues = new XMLHttpRequest();
const urlIssues = "https://api.github.com/repos/sunnykharel/SoccerBase/issues";
httpIssues.open("GET",urlIssues);
httpIssues.setRequestHeader("Authorization", "Basic " + btoa("tempforproj:Verybadpassword1!"));
httpIssues.send();

httpIssues.onreadystatechange = (error) => {
  console.log(httpIssues.responseText);
  console.log(JSON.parse(httpIssues.response).length);
}

class About extends Component {
  constructor(props) {
    super(props);
    var commits = JSON.parse(httpCommits.response)
    this.state = {totalCommits: commits[commits.length - 1].total, 
        totalIssues: JSON.parse(httpIssues.response).length, 
        totalUnitTests: 0};
  }
  render() {
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

          
            
            <div style={{backgroundColor : "#00FFFF",  paddingTop : "10px", paddingBottom: "10px"}}>
                <div style={{display: "inline-block" , marginRight: "10px", marginBottom: "-100px", width : "400px", height : "20px"}}>
                <img src={Askar} style={{display: "inline-block", width: "350px"  }}class = "members"/>

                </div >
                <div style={{display: "inline-block", width: "200px" }}>
                <h1 style={{display: "inline-block", width: "200px" }}>stuff </h1>

                </div>
                <div>
                <h6 class = "memberName" id = "askar"> Askar Poudyal </h6>

                </div>

            </div>

            <div style={{backgroundColor : "#FFFFFF",  paddingTop : "10px", paddingBottom: "10px"}}>
                <div style={{display: "inline-block" , marginRight: "10px", marginBottom: "-100px", width : "400px", height : "20px"}}>
                <img src={Sunny} style={{display: "inline-block", width: "350px"  }}class = "members"/>

                </div >
                <div style={{display: "inline-block", width: "200px" }}>
                <h1 style={{display: "inline-block", width: "200px" }}>stuff </h1>

                </div>
                <div>
                <h6 class = "memberName" id = "askar"> Sunny Kharel </h6>

                </div>

            </div>

            <div style={{backgroundColor : "#00FFFF",  paddingTop : "10px", paddingBottom: "10px"}}>
                <div style={{display: "inline-block" , marginRight: "10px", marginBottom: "-100px", width : "400px", height : "20px"}}>
                <img src={Nithin} style={{display: "inline-block", width: "350px"  }}class = "members"/>

                </div >
                <div style={{display: "inline-block", width: "200px" }}>
                <h1 style={{display: "inline-block", width: "200px" }}>stuff </h1>

                </div>
                <div>
                <h6 class = "memberName" id = "askar"> Nithin Panchakarla </h6>

                </div>

            </div>

            <div style={{backgroundColor : "#FFFFFF",  paddingTop : "10px", paddingBottom: "10px"}}>
                <div style={{display: "inline-block" , marginRight: "10px", marginBottom: "-100px", width : "400px", height : "20px"}}>
                <img src={Tanay} style={{display: "inline-block", width: "350px"  }}class = "members"/>

                </div >
                <div style={{display: "inline-block", width: "200px" }}>
                <h1 style={{display: "inline-block", width: "200px" }}>stuff </h1>

                </div>
                <div>
                <h6 class = "memberName" id = "askar"> Tanay Bidnurkar  </h6>

                </div>

            </div>

            <div style={{backgroundColor : "#00FFFF",  paddingTop : "10px", paddingBottom: "10px"}}>
                <div style={{display: "inline-block" , marginRight: "10px", marginBottom: "-100px", width : "400px", height : "20px"}}>
                <img src={Parm} style={{display: "inline-block", width: "350px"  }}class = "members"/>

                </div >
                <div style={{display: "inline-block", width: "200px" }}>
                <h1 style={{display: "inline-block", width: "200px" }}>stuff </h1>

                </div>
                <div>
                <h6 class = "memberName" id = "askar"> Parmdeep Grewal </h6>

                </div>

            </div>


            {/* <img src={Sunny} class = "members"/>
            <img src={Nithin} class = "members"/>
            <img src={Askar} class = "members"/>
            <img src={Parm} class = "members"/>
              <h6 class = "memberName" id = "sunny"> Sunny Kharel</h6>  
              <h6 class = "memberName" id = "nithin"> Nithin Panchakarla</h6>  
              <h6 class = "memberName" id = "tanay"> Tanay Bidnurkar</h6>  
             */}
            
              <div style={{backgroundColor : "#B0C4DE", paddingTop : "10px", paddingBottom: "1200px"}}>
            
            <div>
                <h1> Team Stats :</h1>
                <h5> Total Commits: {this.state.totalCommits} </h5>
                <h5> Total Issues: {this.state.totalIssues} </h5>
                <h5> Total Unit Tests: {this.state.totalUnitTests} </h5>
            </div>

          </div>
       </div>
     
    );
  }
}
 
export default About;
