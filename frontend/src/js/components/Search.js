import { NavLink , Route, Switch, BrowserRouter, useHistory, useLocation} from 'react-router-dom'
import {Link, useParams} from 'react-router-dom'
import { withRouter } from "react-router";
import React, { useState, useEffect ,Component} from 'react';
import axios from 'axios';
import ModelPagesComponent from './ModelPagesComponent';
import LeagueInstance from './../LeagueInstance';
import Pagination from './Pagination.js';

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
            console.log(res.data);
            if (props.history.location.state.model === "league") {
                setPosts(res.data.leagues_list);
            } else if (props.history.location.state.model === "team") {
                setPosts(res.data.teams_list);
            } else {
                setPosts(res.data.countries_list);
            }
            console.log(listante)
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
    //console.log("\n~~~~~~~~~~~~~~~~~~~~~~~~~~~" + props.history.location.state.search);

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
                            return {
                                modelPageLink : "Leagues/"+post.league_id,
                                modelImage: post.logo  ,
                                modelName: post.name ,
                                modelName1: post.country ,
                                modelName2: post.num_teams ,
                                modelLink1:"/",
                                modelLink2:"/" 
                            }
                        }
                    )}/>

                    <Switch>
                        <Route path={props.match.url + "/:id"}>
                            <LeagueInstance isHidden={isHidden} setIsHidden={setIsHidden} />
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
                        <LeagueInstance isHidden={isHidden} setIsHidden={setIsHidden}/>
                    </Route>
                </Switch>
            </div>
        );
    }
}
export default Search;
