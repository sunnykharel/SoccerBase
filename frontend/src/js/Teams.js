import { NavLink , Route, Switch, BrowserRouter} from 'react-router-dom'
import {Link, useParams} from 'react-router-dom'
import { withRouter } from "react-router";
import React, { useState, useEffect ,Component} from 'react';
import Posts from './components/Posts';
import Pagination from './components/Pagination';
import axios from 'axios';
import TeamsInstance from './TeamsInstance'
import ModelPagesComponent from './components/ModelPagesComponent'
// import './App.css';
import SearchBar from './components/SearchBar'

function Teams({match}) {
        const [isHidden, setIsHidden] = useState(false);
        const [posts, setPosts] = useState([]);
        const [loading, setLoading] = useState(false);
        const [currentPage, setCurrentPage] = useState(1);
        const [postsPerPage] = useState(12);
        useEffect((res) => {
            const fetchPosts = async () => {
              setLoading(true);
              res = await axios.get('https://still-waters-10895.herokuapp.com/getallteams');
              console.log(res.data);
              setPosts(res.data.teams_list);
              setLoading(false);
        };
        
            fetchPosts();
          }, []);

           // Get current posts
        const indexOfLastPost = currentPage * postsPerPage;
        const indexOfFirstPost = indexOfLastPost - postsPerPage;
        const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
        // const selectedPost = null;
        // Change page
        const paginate = pageNumber => setCurrentPage(pageNumber);
        const [isSearch, setIsSearch] = useState(false);
        const [isCountry, setIsCountry] = useState(false);
        const [isTeam, setIsTeam] = useState(true);
        const [isLeague, setIsLeague] = useState(false);

        if (isHidden == false) {
            if ( posts[0]!=null){
                return (
                    <div>
                        <div>
                            <SearchBar 
                                isSearch={isSearch}
                                isCountry={isCountry}
                                isTeam={isTeam}
                                isLeague={isLeague}
                                model="team"
                            />
                        </div>
                        <div style={{paddingTop : "10px",  paddingBottom : "600px"}}>

                            <h1>Teams</h1>
                            <ModelPagesComponent modelInstances = {currentPosts.map( 
                                function(post){
                                    return {
                                        modelPageLink : "/Teams/"+post.team_id + '_' + post.team_name,
                                        modelImage: post.team_logo  ,
                                        modelName: post.team_name ,
                                        modelName1: post.league_name ,
                                        modelName2: post.country ,
                                        modelLink1:"/",
                                        modelLink2:"/" 
                                    }
                                }
                            )}/>
                            <Switch>
                                <Route path={match.url + "/:id"}>
                                    <TeamsInstance isHidden={isHidden} setIsHidden={setIsHidden} />
                                </Route>
                            </Switch>

                            <Pagination
                                postsPerPage={postsPerPage}
                                totalPosts={posts.length}
                                paginate={paginate}
                            />
                        </div>
                    </div>
                );
            } else{
                return (
                    <h5> Loading ... </h5>
                );
            }
        }
        else {
            return (
                <div style={{paddingTop : "10px",  paddingBottom : "600px"}}>
                    
                    <Switch>
                        <Route path={match.url + "/:id"}>
                            <TeamsInstance isHidden={isHidden} setIsHidden={setIsHidden}/>
                        </Route>
                    </Switch>
                </div>
            );
        }
}


export default Teams;
