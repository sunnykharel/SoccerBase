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
import PaginationLogic from './PaginationLogic';
import PaginationB from './components/PaginationB'
import SearchBar from './components/SearchBar';

function Leagues({match}) {
        const [isHidden, setIsHidden] = useState(false);
        const [posts, setPosts] = useState([]);
        const [loading, setLoading] = useState(false);
        const [currentPage, setCurrentPage] = useState(1);
        const [postsPerPage] = useState(12);
        
        const [isSearch, setIsSearch] = useState(false);
        const [isCountry, setIsCountry] = useState(false);
        const [isTeam, setIsTeam] = useState(false);
        const [isLeague, setIsLeague] = useState(true);

        useEffect((res) => {
            const fetchPosts = async () => {
              setLoading(true);
              res = await axios.get('https://still-waters-10895.herokuapp.com/getallleagues');
              setPosts(res.data.leagues_list);              
              setLoading(false);
        };
        
            fetchPosts();
          }, []);

           // Get current posts
        const indexOfLastPost = currentPage * postsPerPage;
        const indexOfFirstPost = indexOfLastPost - postsPerPage;
        const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
        const listante = posts.slice(0, posts.length);
         // Change page
        const paginate = pageNumber => setCurrentPage(pageNumber);
        if (isHidden == false) {
            if ( posts[0]!=null){
            return (

                <div>
                    <div className="searchBar">
                        <SearchBar 
                            isSearch={isSearch} 
                            isCountry={isCountry} 
                            isTeam={isTeam}
                            isLeague={isLeague}
                            model="league"
                        />
                    </div>
                    <div className="text-center" style={{paddingTop : "10px",  paddingBottom : "10px"}}>
                        <h1>Leagues</h1>

                        <Switch>
                            <Route path={match.url + "/:id"}>
                                <LeagueInstance isHidden={isHidden} setIsHidden={setIsHidden} />
                            </Route>
                        </Switch>
                                <PaginationB
                                postsPerPage={postsPerPage}
                                totalPosts={posts.length}
                                posts = {posts}
                                type = {"league"}
                                onChangePage={paginate}
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
                <div style={{paddingTop : "10px",  paddingBottom : "20px"}}>
                    
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
