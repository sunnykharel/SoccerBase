import { NavLink , Route, Switch, BrowserRouter, useHistory, useLocation} from 'react-router-dom'
import {Link, useParams} from 'react-router-dom'
import { withRouter } from "react-router";
import React, { useState, useEffect ,Component} from 'react';
import Posts from './components/Posts';
import Pagination from './components/Pagination';
import axios from 'axios';
import LeagueInstance from './LeagueInstance'
import ModelPagesComponent from './components/ModelPagesComponent'
import ToggleButton from '@material-ui/lab/ToggleButton';
import FilterListIcon from '@material-ui/icons/FilterList';

import SearchBar from './components/SearchBar';

function Leagues({match}) {
        const [isHidden, setIsHidden] = useState(false);
        const [posts, setPosts] = useState([]);
        const [loading, setLoading] = useState(false);
        const [currentPage, setCurrentPage] = useState(1);
        const [postsPerPage] = useState(12);
        useEffect((res) => {
            const fetchPosts = async () => {
              setLoading(true);
              res = await axios.get('https://still-waters-10895.herokuapp.com/getallleagues');
              console.log(res.data);
              setPosts(res.data.leagues_list);
              console.log(listante)
              setLoading(false);
        };
        
            fetchPosts();
          }, []);

           // Get current posts
        const indexOfLastPost = currentPage * postsPerPage;
        const indexOfFirstPost = indexOfLastPost - postsPerPage;
        const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
        const listante = posts.slice(0, posts.length);
        // const selectedPost = null;
         // Change page
        const paginate = pageNumber => setCurrentPage(pageNumber);
        if (isHidden == false) {
            if ( posts[0]!=null){
            return (
                <div>
                    <div className="searchBar">
                        <SearchBar/>
                    </div>
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
                            <Route path={match.url + "/:id"}>
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
                        <Route path={match.url + "/:id"}>
                            <LeagueInstance isHidden={isHidden} setIsHidden={setIsHidden}/>
                        </Route>
                    </Switch>
                </div>
            );
        }
}


export default Leagues;
