import { NavLink , Route, Switch, BrowserRouter} from 'react-router-dom'
import {Link, useParams} from 'react-router-dom'
import { withRouter } from "react-router";
import React, { useState, useEffect ,Component} from 'react';
import Posts from './components/Posts';
import Pagination from './components/Pagination';
import axios from 'axios';
import CountryInstance from './CountryInstance'
import ModelPagesComponent from './components/ModelPagesComponent'
import SearchBar from './components/SearchBar'
import PaginationB from './components/PaginationB'


function Countries({match}) {
        var scope = this;
        const [isHidden, setIsHidden] = useState(false);
        const [posts, setPosts] = useState([]);
        const [loading, setLoading] = useState(false);
        const [currentPage, setCurrentPage] = useState(1);
        const [postsPerPage] = useState(12);
        
        const [isCountry, setIsCountry] = useState(true);
        const [isTeam, setIsTeam] = useState(false);
        const [isLeague, setIsLeague] = useState(false);

        useEffect((res) => {
            const fetchPosts = async () => {
              setLoading(true);
              res = await axios.get('https://still-waters-10895.herokuapp.com/getallcountries');
              setPosts(res.data.countries_list);
              setLoading(false);
        };
        
            fetchPosts();
          }, []);

           // Get current posts
        const indexOfLastPost = currentPage * postsPerPage;
        const indexOfFirstPost = indexOfLastPost - postsPerPage;
        const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
        // Change page
        const paginate = pageNumber => setCurrentPage(pageNumber);
        if (isHidden == false) {
            if ( posts[0]!=null){
                return (

                    <div>
                        <div>
                            <SearchBar 
                                isCountry={isCountry}
                                isTeam={isTeam}
                                isLeague={isLeague}
                                model="country"
                            />
                        </div>
                        <div className="text-center" style={{paddingTop : "10px",  paddingBottom : "10px"}}>
                            <h1>Countries</h1>
                            }
                            <Switch>
                                <Route path={match.url + "/:id"}>
                                    <CountryInstance isHidden={isHidden} setIsHidden={setIsHidden} />
                                </Route>
                            </Switch>

                            <PaginationB
                                postsPerPage={postsPerPage}
                                totalPosts={posts.length}
                                posts = {posts}
                                type = {"country"}
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
                <div style={{ paddingTop : "10px",  paddingBottom : "600px"}}>
                    
                    <Switch>
                        <Route path={match.url + "/:id"}>
                            <CountryInstance isHidden={isHidden} setIsHidden={setIsHidden}/>
                        </Route>
                    </Switch>
                </div>
            );
        }
}

export default Countries;
