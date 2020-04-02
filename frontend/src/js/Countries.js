import { NavLink , Route, Switch, BrowserRouter} from 'react-router-dom'
import {Link, useParams} from 'react-router-dom'
import { withRouter } from "react-router";
import React, { useState, useEffect ,Component} from 'react';
import Posts from './components/Posts';
import Pagination from './components/Pagination';
import axios from 'axios';
import CountryInstance from './CountryInstance'
// import './App.css';


function Countries({match}) {
        const [isHidden, setIsHidden] = useState(false);
        const [posts, setPosts] = useState([]);
        const [loading, setLoading] = useState(false);
        const [currentPage, setCurrentPage] = useState(1);
        const [postsPerPage] = useState(10);
        useEffect((res) => {
            const fetchPosts = async () => {
              setLoading(true);
              res = await axios.get('https://still-waters-10895.herokuapp.com/getallcountries');
              setPosts(res.data.countries_list);
              console.log(res.data.countries_list)
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
        if (isHidden == false) {
            return (
                <div style={{backgroundColor : "#BA55D3", paddingTop : "10px",  paddingBottom : "600px"}}>
                   <h1>Countries</h1>
                    <ul className='list-group mb-4'id = "PostList">
                        {currentPosts.map(post => {
                            return(
                            <li key={post.id} className='list-group-item'>
                                <Link to={"/Countries/" + post.name}>{post.name}</Link>
                                <img src = {post.flag}/>
                                <h1>  {post.population} </h1>
                            </li>);
                        })}
                    </ul>

                    <Switch>
                        <Route path={match.url + "/:id"}>
                            <CountryInstance isHidden={isHidden} setIsHidden={setIsHidden} />
                        </Route>
                    </Switch>

                    <Pagination
                        postsPerPage={postsPerPage}
                        totalPosts={posts.length}
                        paginate={paginate}
                    />
              </div>
            
            );
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