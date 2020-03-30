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
                    </div>
                    <img className="cardImage" src={Parm} />
                </li>
            </ul>
        );
    }
}

class CardList extends Component {
    
    render() {
        return(
            <div className="cardDiv">
                {this.props.names.map((name) => {
                    return (
                        <Card name={name}  />
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

    render () {
        return(
            <div className="clwrapper">
                <CardList
                    names={["Parm","Tanay", "Askar", "Sunny", "Nithin"]}
                    ghUsernames={["grewalparm","askarpoudyal","tanay-bidnurkar","sunnykharel","nithinsaurus"]}
                />
            </div>
        );
    }
}
 
export default About;
