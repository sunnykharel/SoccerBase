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

import './../css/SearchBar.css'

//creates search parameter string
function searchInputUrl(searchInput) {
    var result = "";
    if (searchInput) {
        result += "search_parameters=" + searchInput;
    }
    return result;
}

//creates region filter string
function regionFilterUrl(regionFilter) {
    var result ="";
    if (regionFilter) {
        result += "region=" + regionFilter;
    }
    return result;
}

//creates sub regiion filter string
function subRegionFilterUrl(subRegionFilter) {
    var result = "";
    if (subRegionFilter) {
        result += "subregion=" + subRegionFilter;
    }
    return result;
}

//CreateSearchURL
function createSearchURL(model, searchInput, regionFilter, subRegionFilter, popFilter, areaFilter) {
    var result = "" + model + "?" + searchInputUrl(searchInput) + "&"
        + regionFilterUrl(regionFilter) + "&" + subRegionFilterUrl(subRegionFilter)
        + "&";
    
    return "/search/" + result;
}

//SearchBar Componenent
function SearchBar(props) {
    //Query data:
    //1. User search keywords/input text
    const [searchInput, setSearchInput] = useState(null);
    
    //2. Filters
    const [regionFilter, setRegionFilter] = useState(null);
    const [subRegionFilter, setSubRegionFilter] = useState(null);
    const [popFilter, setPopFilter] = useState(null);
    const [areaFilter, setAreaFilter] = useState(null);

    //3. State data for search display
    const [filterSelected, setFilterSelected] = useState(false);

    let history = useHistory();
    
    function checkForSubmit(event) {
        if (event.key === 'Enter') {
            history.push({
                pathname: createSearchURL("league", searchInput, regionFilter, subRegionFilter),
                state: {isWorking: "itis!!"}
            });
        }
    }

    function getUserInput(e) {
        setSearchInput(e.target.value);
    }


    return (
        <div className="SearchDiv">
            <input 
                className="searchBar" 
                placeholder="Search for your favorites" 
                onKeyPress={checkForSubmit}
                onChange={getUserInput}
            />
            <ToggleButton
                selected={filterSelected}
                onChange={() => {
                    setFilterSelected(!filterSelected);
                }}
            >
                <FilterListIcon/>
            </ToggleButton>
            {filterSelected && <select className="selector">
                <option>Filter By Region:</option>
                <option>Asia</option>
            </select>}
            {filterSelected && <select className="selector">
                <option>Filter By Population:</option>
                <option>{"< 10,0000"}</option>
                <option>{"10,000 to 100,000"}</option>
                <option>{"100,000 to 1,000,000"}</option>
                <option>{"> 1,000,000"}</option>
            </select>}
        </div>
    );
}

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
