import { NavLink , Route, Switch, BrowserRouter} from 'react-router-dom'
import {Link, useParams} from 'react-router-dom'

import React, { useState, useEffect ,Component} from 'react';
import Posts from './components/Posts';
import Pagination from './components/Pagination';
import axios from 'axios';
// import './App.css';

function League() {
    let {id} = useParams();
    this.props.hideComponents();
    return(
        <h1>{id}</h1>
    );
}

class Leagues extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isHidden: true
        }
    }

    hideComponents(){
        this.setState({isHidden: false});
    }

    render() {
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


        if (this.state.isHidden == false) { 
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
                        <Route path={this.props.match.url + "/:id"}>
                            <League hideComponents = {this.hideComponents}/>
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
            return (<h1>Stookymoombajambopoo</h1>);
        }
    }
}


export default Leagues;
