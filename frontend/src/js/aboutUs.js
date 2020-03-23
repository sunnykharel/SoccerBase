import React, { Component } from 'react'
import Askar from './../images/Askar.png';
import Nithin from './../images/Nithin.png';
import Sunny from './../images/Sunny.png';
import Parm from './../images/Parmdeep.png';
import Tanay from './../images/Tanay.png';

import './../css/aboutUs.css'
class DisplayGitHubStatisticsClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalCommits: "loading commits ...", 
      totalIssues: "loading issues ...", 
      totalUnitTests: "loading unit tests ..."
    };
  }

  componentDidMount() {
    const scope = this;
    var httpCommits = new XMLHttpRequest();
    var urlCommits = "https://api.github.com/repos/sunnykharel/SoccerBase/stats/commit_activity";  
    httpCommits.open("GET",urlCommits, true);
    httpCommits.setRequestHeader("Authorization", "Basic " + btoa("grewalparm:Verybadpassword1!"));
    httpCommits.onload = function(){
      if (this.status == 200){
        console.log(httpCommits.response);
        var commits = JSON.parse(httpCommits.responseText);
        var totalCommits_ = 0;
        for (let i = 0; i < commits.length; i++) {
            totalCommits_ += commits[i].total;
        }
        scope.setState({
          totalCommits: totalCommits_,
        });
      }
      else {
        console.warn("Let's assume this works");
      }
    }
    httpCommits.send();

    var httpIssues = new XMLHttpRequest();
    var urlIssues = "https://api.github.com/repos/sunnykharel/SoccerBase/issues";
    httpIssues.open("GET",urlIssues, true);

    httpIssues.setRequestHeader("Authorization", "Basic " + btoa("tempforproj:Verybadpassword1!"));
    
    httpIssues.onload = function() {
      if (this.status == 200){
        var issues = JSON.parse(httpIssues.responseText);
        scope.setState({
          totalIssues:issues.length,
        });
      }
      else {
        console.warn("Let's assume this works");
      }
    }
    httpIssues.send();
    scope.setState({
      totalUnitTests: 0,
    });  
     
  }



  render(){
    return (
      <div style={{backgroundColor : "#B0C4DE", paddingTop : "10px", paddingBottom: "1200px"}}>
            <div>
                <h1> Team Stats :</h1>
                <h5> Total Commits: {this.state.totalCommits} </h5>
                <h5> Total Issues: {this.state.totalIssues} </h5>
                <h5> Total Unit Tests: {this.state.totalUnitTests} </h5>
            </div>
      </div>
    );
  }
}


class About extends Component {
  render() {
    function DisplayGitHubStatistics(props){
      var httpCommits = new XMLHttpRequest();
      var urlCommits = "https://api.github.com/repos/sunnykharel/SoccerBase/stats/commit_activity";
      
      httpCommits.open("GET",urlCommits, true);
      httpCommits.setRequestHeader("Authorization", "Basic " + btoa("grewalparm:Verybadpassword1!"));
      httpCommits.send();
      httpCommits.onreadystatechange = (error) => {
        console.log(httpCommits.responseText);
      }
      var httpIssues = new XMLHttpRequest();
      var urlIssues = "https://api.github.com/repos/sunnykharel/SoccerBase/issues";

      httpIssues.open("GET",urlIssues, true );
      httpIssues.setRequestHeader("Authorization", "Basic " + btoa("tempforproj:Verybadpassword1!"));
      httpIssues.send();
      var commits = httpCommits.response;
      var totalCommits = 0;
      for (let i = 0; i < commits.length; i++) {
          totalCommits += commits[i].total;
      }
      return (
        <div style={{backgroundColor : "#B0C4DE", paddingTop : "10px", paddingBottom: "1200px"}}>
              <div>
                  <h1> Team Stats :</h1>
                  <h5> Total Commits: {totalCommits} </h5>
                  <h5> Total Issues: {httpIssues.response.length} </h5>
                  <h5> Total Unit Tests: 0 </h5>
              </div>
  
        </div>
      );
    }

    function DisplayDeveloper(props){
      return (
        <div style={{backgroundColor : props.bckgndcolor,  paddingTop : "10px", paddingBottom: "10px"}}>
          <div style={{display: "inline-block" , marginRight: "10px", marginBottom: "-100px", width : "400px", height : "20px"}}>
          <img src= {props.imgsrc} style={{display: "inline-block", width: "350px"  }}class = "members"/>
          </div >
          <div style={{display: "inline-block", width: "200px" }}>
          <h1 style={{display: "inline-block", width: "200px" }}>stuff </h1>
          </div>
          <div>
          <h6 class = "memberName" id = "askar"> {props.name} </h6>
          </div>
        </div>
      );
    }

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

          <DisplayDeveloper name = "Askar Poudyal" imgsrc = {Askar} bckgndcolor = "#FFFFFF"/>
          <DisplayDeveloper name = "Sunny Kharel" imgsrc = {Sunny} bckgndcolor = "#00FFFF"/>
          <DisplayDeveloper name = "Nithin" imgsrc = {Nithin} bckgndcolor = "#FFFFFF"/>
          <DisplayDeveloper name = "Tanay" imgsrc = {Tanay} bckgndcolor = "#00FFFF"/>
          <DisplayDeveloper name = "Parmdeep" imgsrc = {Parm} bckgndcolor = "#FFFFFF"/>            
          <DisplayGitHubStatisticsClass/> 
       </div>
     
    );
  }
}
 
export default About;
