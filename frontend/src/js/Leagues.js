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
        <h1>{id}{String(props.isHidden)}</h1>
    );
}

function Leagues({match}) {
        const [isHidden, setIsHidden] = useState(false);
        const [posts, setPosts] = useState([]);
        const [loading, setLoading] = useState(false);
        const [currentPage, setCurrentPage] = useState(1);
        const [postsPerPage] = useState(10);


        useEffect(() => {
            const fetchPosts = async () => {
              setLoading(true);
              const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
              setPosts(res.data);
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
        
            return (
                <div style={{backgroundColor : "#BA55D3", paddingTop : "10px",  paddingBottom : "600px"}}>
                   <h1>Leagues</h1>
                    <ul className='list-group mb-4'id = "PostList">
                        {currentPosts.map(post => (
                            <li key={post.id} className='list-group-item'>
                                <Link to={"/Leagues/" + post.title}>{post.title}</Link>
                            </li>
                        ))}
                    </ul>
                    <Switch>
                        <Route path={match.url + "/:id"}>
                            <League isHidden={isHidden} setIsHidden={setIsHidden}/>
                        </Route>
                    </Switch>

                    <Pagination
                        postsPerPage={postsPerPage}
                        totalPosts={posts.length}
                        paginate={paginate}
                    />
              </div>
            
            );
}


export default Leagues;
