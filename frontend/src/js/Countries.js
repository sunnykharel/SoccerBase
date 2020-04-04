import { NavLink , Route, Switch, BrowserRouter} from 'react-router-dom'
import {Link, useParams} from 'react-router-dom'
import { withRouter } from "react-router";
import React, { useState, useEffect ,Component} from 'react';
import Posts from './components/Posts';
import Pagination from './components/Pagination';
import axios from 'axios';
import CountryInstance from './CountryInstance'
import ModelPagesComponent from './components/ModelPagesComponent'

// import './App.css';


function Countries({match}) {
        var scope = this;
        const [isHidden, setIsHidden] = useState(false);
        const [posts, setPosts] = useState(Array(2000).fill({
            name: "USA",
            flag: "https://www.kidlink.org/icons/f0-us.gif"


        }));
        const [loading, setLoading] = useState(false);
        const [currentPage, setCurrentPage] = useState(1);
        const [postsPerPage] = useState(12);
        // useEffect((res) => {
        //     const fetchPosts = async () => {
        //       setLoading(true);
        //       res = await axios.get('https://still-waters-10895.herokuapp.com/getallcountries');
        //       setPosts(res.data.countries_list);
        //       console.log(res.data.countries_list)
        //       setLoading(false);
        // };
        
        //     fetchPosts();
        //   }, []);

           // Get current posts
        const indexOfLastPost = currentPage * postsPerPage;
        const indexOfFirstPost = indexOfLastPost - postsPerPage;
        const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
        // const selectedPost = null;
        // Change page
        const paginate = pageNumber => setCurrentPage(pageNumber);
        if (isHidden == false) {
            if ( posts[0]!=null){
                console.log(posts.map( 
                    function(post){
                        return {
                            modelPageLink : "Countries/"+post.name || "",
                            modelImage: post.flag ,
                            modelName: post.name || "",
                            modelName1: "most famous team" || "",
                            modelName2: "most famous league" || "",
                            modelLink1:"/",
                            modelLink2:"/" 
                        }
                    }
                ));
                return (
                    //this needs to be fixed with accurate information
                    <ModelPagesComponent modelInstances = {posts.map( 
                        function(post){
                            return {
                                modelPageLink : "Countries/"+post.name || "",
                                modelImage: post.flag || "",
                                modelName: post.name || "",
                                modelName1: "most famous team" || "",
                                modelName2: "most famous league" || "",
                                modelLink1:"/",
                                modelLink2:"/" 
                            }
                        }
                    )}/>
                );
            }else{
                return (
                    <h5> Loading ... </h5>
                );
            }
        } else {
            return (
                <div style={{backgroundColor : "#BA55D3", paddingTop : "10px",  paddingBottom : "600px"}}>
                    
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