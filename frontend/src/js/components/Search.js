import { NavLink , Route, Switch, BrowserRouter, useHistory, useLocation} from 'react-router-dom'
import {Link, useParams} from 'react-router-dom'
import { withRouter } from "react-router";
import React, { useState, useEffect ,Component} from 'react';
import axios from 'axios';
import ModelPagesComponent from './ModelPagesComponent';
import LeagueInstance from './../LeagueInstance';
import TeamsInstance from './../TeamsInstance';
import CountryInstance from './../CountryInstance';
import Pagination from './Pagination.js';
import PaginationB from './PaginationB'

import SearchBar from './SearchBar';

function Search(props) {

    let { id } = useParams();
    const [isHidden, setIsHidden] = useState(false);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(12);
    
    const [isSearch, setIsSearch] = useState(true);

    useEffect((res) => {
        const fetchPosts = async () => {
            setLoading(true);
            res = await axios.get('https://still-waters-10895.herokuapp.com/'
                + props.history.location.state.search);
            if (props.history.location.state.model === "league") {
                setPosts(res.data.leagues_list);
            } else if (props.history.location.state.model === "team") {
                setPosts(res.data.teams_list);
            } else {
                setPosts(res.data.countries_list);
            }
            setLoading(false);
        };
        
        fetchPosts();
    }, []);
        
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
    const listante = posts.slice(0, posts.length);
    
    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    let history = useHistory();

    if (isHidden == false) {
        if ( posts[0]!=null){
        return (
            <div>
                {/*<div className="searchBar">
                    <SearchBar isSearch={isSearch}/>
                </div>*/}
                <div style={{paddingTop : "10px",  paddingBottom : "600px"}}>
                
                    <h1>Leagues</h1>
                    <ModelPagesComponent modelInstances = {currentPosts.map( 
                        function(post){
                            if (props.history.location.state.model === "league") {
                                return {
                                    modelPageLink : "/Leagues/" + post.league_id + "_" + post.name,
                                    modelImage: post.logo  ,
                                modelName: post.name ,
                                modelName1: "Country: " + post.country ,
                                modelName2: "Num Teams: " + post.num_teams ,
                                modelLink1:"/",
                                modelLink2:"/" 
                                }
                            } else if (props.history.location.state.model === "team") {
                                return {
                                    modelPageLink : "/Teams/" + post.team_id + "_" + post.team_name,
                                    modelImage: post.team_logo  ,
                                        modelName: post.team_name ,
                                        modelName1: "League: " + post.league_name ,
                                        modelName2: "Country: " + post.country ,
                                        modelLink1:"/",
                                        modelLink2:"/" 
                                }

                            } else {
                                return {
                                    modelPageLink : "/Countries/"+ post.name,
                                    modelImage: post.flag ,
                                    modelName: post.name ,
                                    modelName1: "Capital: " + post.capital ,
                                    modelName2: "Num Leagues: " + post.num_leagues,
                                    modelLink1:"/",
                                    modelLink2:"/" 
                                }
                            }
                        }
                    )}/>

                    <Switch>
                        <Route path={props.match.url + "/:id"}>
                            {(props.history.location.state.model === "league") && 
                            <LeagueInstance 
                                isHidden={isHidden} 
                                setIsHidden={setIsHidden} 
                            />}
                            {(props.history.location.state.model === "team") &&
                            <TeamsInstance
                                isHidden={isHidden}
                                setIsHidden={setIsHidden}
                            />}
                            {(props.history.location.state.model === "country") &&
                            <CountryInstance
                                isHidden={isHidden}
                                setIsHidden={setIsHidden}
                            />}
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
        }else{
            return (
                <h5> Loading ... </h5>
            );
        }
    } else {
        return (
            <div style={{paddingTop : "10px",  paddingBottom : "600px"}}>
                
                <Switch>
                    <Route path={props.match.url + "/:id"}>
                        {(props.history.location.state.model === "league") && 
                        <LeagueInstance 
                            isHidden={isHidden} 
                            setIsHidden={setIsHidden} 
                        />}
                        {(props.history.location.state.model === "team") &&
                        <TeamsInstance
                            isHidden={isHidden}
                            setIsHidden={setIsHidden}
                        />}
                        {(props.history.location.state.model === "country") &&
                        <CountryInstance
                            isHidden={isHidden}
                            setIsHidden={setIsHidden}
                        />}
                    </Route>
                </Switch>
            </div>
        );
    }
}
export default Search;
