import React, { Component } from 'react'
import Askar from './../images/Askar.png';
import Nithin from './../images/Nithin.png';
import Sunny from './../images/Sunny.png';
import Parm from './../images/Parmdeep.png';
import Tanay from './../images/Tanay.png';

import './../css/aboutUs.css'

class Card extends Component {
    
    render() {
        return(
            <ul>
                <li className="card">
                    <div className="cardContent">
                        <h3 className="cardTitle"> {this.props.name} </h3>
                        <p className="bio">
                            {this.props.bio}<br/>
                        </p>
                        <p className="gitStats">
                            Number of Commits: {this.props.numCommits} <br/>
                            Number of Issues: {this.props.numIssues} <br/>
                            Number of Tests: {this.props.numTests}
                        </p>
                    </div>
                    <img src={this.props.img} />
                </li>
            </ul>
        );
    }
}

class CardList extends Component {
    
    render() {
        return(
            <div className="cardDiv">
                {this.props.users.map((user) => {
                    return (
                        <Card 
                            name={user.name}
                            ghUsername={user.ghUsername}
                            img = {user.img}
                            numCommits = {user.commits}
                            numTests = {user.tests}
                            numIssues = {user.issues}
                            bio = {user.bio}
                        />
                    );
                })}
            </div>
        );
    }
}

class About extends Component {
    //TODO: Github Stat API calls
    //TODO: Pass state members to card list and the proper members to each card
    
    constructor(props) {
        super(props);
        this.state = {
            totalCommits: "loading commits...",
            totalIssues: "loading issues...",
            totalUnitTests: "loading unit tests...",
            parmCommits: "loading commits...",
            parmIssues: "loading issues...",
            parmUnitTests: "loading unit tests...",
            tanayCommits: "loading commits...",
            tanayIssues: "loading issues...",
            tanayUnitTests: "loading unit tests...",
            askarCommits: "loading commits...",
            askarIssues: "loading issues...",
            askarUnitTests: "loading unit tests...",
            sunnyCommits: "loading commits...",
            sunnyIssues: "loading issues...",
            sunnyUnitTests: "loading unit tests...",
            nithinCommits: "loading commits...",
            nithinIssues: "loading issues...",
            nithinUnitTests: "loading unit tests..."
        }
    }
    
    componentDidMount() {
        //Getting total commits
        const scope = this;
        var httpCommits = new XMLHttpRequest();
        var urlCommits = "https://api.github.com/repos/sunnykharel/SoccerBase/stats/commit_activity";  
        httpCommits.open("GET",urlCommits, true);
        httpCommits.setRequestHeader("Authorization", "Basic " + btoa("tempforproj:Verybadpassword1!"));
        httpCommits.onload = function(){
          if (this.status == 200){
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

        //Getting commits by contributor
        var httpContCommits = new XMLHttpRequest();
        var urlContCommits = "https://api.github.com/repos/sunnykharel/SoccerBase/stats/contributors";
        httpContCommits.open("GET", urlContCommits, true);
        httpContCommits.setRequestHeader("Authorization", "Basic " + btoa("tempforproj:Verybadpassword1!"));
        
        //Parse response
        httpContCommits.onload = function() {
            console.log(httpContCommits.responseText);
            if (this.status == 200) {
                var commsByContr = JSON.parse(httpContCommits.responseText);
                for (let i = 0; i < commsByContr.length; i++) {
                    let commit = commsByContr[i];
                    let user = commit.author.login;
                    if ("nithinsaurus" == user) {
                        scope.setState({ nithinCommits: String(commit.total)});
                    } else if ("sunnykharel" == user) {
                        scope.setState({ sunnyCommits: String(commit.total)});
                    } else if ("askarpoudyal" == user) {
                        scope.setState({ askarCommits: String(commit.total)});
                    } else if ("tanay-bidnurkar" == user) {
                        scope.setState({ tanayCommits: String(commit.total)});
                    } else if ("grewalparm" == user) {
                        scope.setState({ parmCommits: String(commit.total)});
                    }
                }
            } else {
                console.log("ERROR: failed to fetch commits by contributor");
            }
        
        }
        httpContCommits.send()

        //Getting issues by contributor and total issues
        var httpIssues = new XMLHttpRequest();
        var urlIssues = "https://api.github.com/repos/sunnykharel/SoccerBase/issues";
        httpIssues.open("GET",urlIssues, true);
        httpIssues.setRequestHeader("Authorization", "Basic " + btoa("tempforproj:Verybadpassword1!"));
        httpIssues.onload = function() {
          console.log(httpIssues.responseText);
          if (this.status == 200){
            var issues = JSON.parse(httpIssues.responseText);
            let parm = 0;
            let sunny = 0;
            let tanay = 0;
            let nithin = 0;
            let askar = 0;
            for (let i = 0; i < issues.length; i++) {
                var issue = issues[i];
                if ("grewalparm" == issue.user.login) {
                    parm++;
                } else if ("sunnykharel" == issue.user.login) {
                    sunny++;
                } else if ("tanay-bidnurkar" == issue.user.login) {
                    tanay++;
                } else if ("askarpoudyal" == issue.user.login) {
                    askar++;
                } else if ("nithinsaurus" == issue.user.login) {
                    nithin++;
                }
            }
            scope.setState({
              totalIssues: issues.length,
              parmIssues: parm,
              askarIssues: askar,
              nithinIssues: nithin,
              sunnyIssues: sunny,
              tanayIssues: tanay
            });
          }
          else {
            console.warn("Let's assume this works");
          }
        }
        httpIssues.send();
        
        scope.setState({
          totalUnitTests: 25,
          nithinUnitTests: 6,
          askarUnitTests: 4,
          sunnyUnitTests: 6,
          parmUnitTests: 5,
          tanayUnitTests: 4
        });         
    }

    render () {
        //team member meta data
        var users = [
            {
                name: "Parm",
                ghUsername: "grewalparm",
                img: Parm,
                commits: this.state.parmCommits,
                issues: this.state.parmIssues,
                tests: this.state.parmUnitTests,
                bio: "Software Engineering Senior, likes playing, recording, and coding music. Focused on frontend."
            },
            {
                name: "Tanay",
                ghUsername: "tanay-bidnurkar",
                img: Tanay,
                commits: this.state.tanayCommits,
                issues: this.state.tanayIssues,
                tests: this.state.tanayUnitTests,
                bio: "Hometown: Coppell TX, Junior, Software Engineering, likes playing ultimate frisbee and watching football. worked mainly on backend."
            },
            {
                name: "Askar",
                ghUsername: "askarpoudyal",
                img: Askar,
                commits: this.state.askarCommits,
                issues: this.state.askarIssues,
                tests: this.state.askarUnitTests,
                bio: "Senior, Software Engineer, enjoys sports and video games. Focused on the frontend."
            },
            {
                name: "Sunny",
                ghUsername: "sunnykharel",
                img: Sunny,
                commits: this.state.sunnyCommits,
                issues: this.state.sunnyIssues,
                tests: this.state.sunnyUnitTests,
                bio: "Junior Software engineering, enjoys to basketball and bike on free time. Was Fullstack and helped mainly wi    th backend"
            },
            {
                name: "Nithin",
                ghUsername: "nithinsaurus",
                img: Nithin,
                commits: this.state.nithinCommits,
                issues: this.state.nithinIssues,
                tests: this.state.nithinUnitTests,
                bio: "Hometown: Coppell, TX, Junior, Software Engineering, enjoys ESports and working out. Focused on specific API issues and news attribute."
            }
        ];
    
        return(
            <div className="clwrapper">
                <CardList users={users}/>
            </div>
        );
    }
}
 
export default About;
