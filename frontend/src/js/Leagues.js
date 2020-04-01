import { NavLink , Route, Switch, BrowserRouter} from 'react-router-dom'
import {Link, useParams} from 'react-router-dom'

import React, { useState, useEffect ,Component} from 'react';
import Posts from './components/Posts';
import Pagination from './components/Pagination';
import axios from 'axios';
// import './App.css';

function League(props) {
    let {id} = useParams();
    props.setIsHidden(true);
    return(
            <ul>
                <li className="card">
                    <div className="cardContent">
                        <h3 className="cardTitle">  </h3>
                        <p className="bio">
                            <br/>
                        </p>
                    </div>
                    {/*<img src= />*/}
                </li>
            </ul>
        );
}

function Leagues({match}) {
        const [isHidden, setIsHidden] = useState(false);
        const [posts, setPosts] = useState([]);
        const [loading, setLoading] = useState(false);
        const [currentPage, setCurrentPage] = useState(1);
        const [postsPerPage] = useState(10);

        const res = null;
        useEffect((res) => {
            const fetchPosts = async () => {
              setLoading(true);
              res = await axios.get('https://still-waters-10895.herokuapp.com/getallleagues');
              console.log(res.data);
              setPosts(res.data.leagues_list);
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
            return (
                <div style={{backgroundColor : "#BA55D3", paddingTop : "10px",  paddingBottom : "600px"}}>
                   <h1>Leagues</h1>
                    <ul className='list-group mb-4'id = "PostList">
                        {currentPosts.map(post => {
                            return(
                            <li key={post.id} className='list-group-item'>
                                <Link to={"/Leagues/" + post.name}>{post.name}</Link>
                                <img src = {post.logo}/>
                                <h1>  {post.country} </h1>
                            </li>);
                        })}
                    </ul>
                    <Switch>
                        <Route path={match.url + "/:id"}>
                            <League isHidden={isHidden} setIsHidden={setIsHidden} />
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
                    <h1>LESSSDFSF</h1>
                    <Switch>
                        <Route path={match.url + "/:id"}>
                            <League isHidden={isHidden} setIsHidden={setIsHidden}/>
                        </Route>
                    </Switch>
                </div>
            );
        }
}


export default Leagues;
