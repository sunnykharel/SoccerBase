import React from 'react';
import PaginationLogic from './../PaginationLogic';
import ModelPagesComponent from './ModelPagesComponent'


class App extends React.Component {
    constructor(props) {
        super(props);

        // // an example array of 150 items to be paged
         var exampleItems = [...Array(150).keys()].map(i => ({ id: (i+1), name: 'Item ' + (i+1) }));

        this.state = {
            exampleItems: exampleItems,
            listArray: props.posts,
            type: props.type,
            pageOfItems: []
        };

      
        this.onChangePage = this.onChangePage.bind(this);
    }

    onChangePage(pageOfItems) {
        // update state with new page of items
        this.setState({ pageOfItems: pageOfItems });
    }

    render() {
        if(this.props.type == "team"){
            return (
                <div>
                    <div className="container">
                        <div className="text-center">
                            
                            <ModelPagesComponent modelInstances = {this.state.pageOfItems.map( 
                                    function(post){
                                        return {
                                            modelPageLink : "Teams/"+post.team_id+"_"+post.team_name,
                                            modelImage: post.team_logo  ,
                                            modelName: post.team_name ,
                                            modelName1: "League: " + post.league_name ,
                                            modelName2: "Country: " + post.country ,
                                            modelLink1:"/",
                                            modelLink2:"/" 
                                        }
                                    }
                                )}/>
                            <PaginationLogic items={this.state.listArray} onChangePage={this.onChangePage} />
                        </div>
                    </div>
                    <hr />
                </div>
            );
        }
        if(this.props.type == "league"){
            return (
                <div>
                    <div className="container">
                        <div className="text-center">
                            
                            <ModelPagesComponent modelInstances = {this.state.pageOfItems.map( 
                                    function(post){
                                        return {
                                            modelPageLink : "Leagues/"+post.league_id+"_"+post.name,
                                            modelImage: post.logo  ,
                                            modelName: post.name ,
                                            modelName1: "Country: " + post.country ,
                                            modelName2: "Num Teams: " + post.num_teams ,
                                            modelLink1:"/",
                                            modelLink2:"/" 
                                        }
                                    }
                                )}/>
                            <PaginationLogic items={this.state.listArray} onChangePage={this.onChangePage} />
                        </div>
                    </div>
                    <hr />
                </div>
            );
        }
        if(this.props.type == "country"){
            return (
                <div>
                    <div className="container">
                        <div className="text-center">
                           
                            <ModelPagesComponent modelInstances = {this.state.pageOfItems.map( 
                                    function(post){
                                        return {
                                            modelPageLink : ''.concat('/Countries/', post.name),
                                            modelImage: post.flag ,
                                            modelName: post.name ,
                                            modelName1: "Capital: " + post.capital ,
                                            modelName2: "Num Leagues: " + post.num_leagues,
                                            modelLink1:"/",
                                            modelLink2:"/" 
                                        }
                                    }
                                )}/>
                            <PaginationLogic items={this.state.listArray} onChangePage={this.onChangePage} />
                        </div>
                    </div>
                    <hr />
                </div>
            );
        }
       
    }
}

export default App;