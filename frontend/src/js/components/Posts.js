import React ,{ Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {Link} from 'react-router-dom'

import PostPage from '../PostPage'
import { Redirect } from 'react-router-dom';

var check = false;



const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 140,
    },
  });

const Posts = ({ posts, loading }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }

//   const classes = useStyles();
  
    function newPost(aPost){
        var a = aPost.title;
        const c = b ;
        // thePost = aPost;
    // alert(a);
        //console.log(<PostPage thepost = {aPost}/>);
        
        var b = document.getElementById("PostList");
        b.parentElement.innerHTML = a;
        
    }


    

return (

    

    <ul className='list-group mb-4'id = "PostList">
    {posts.map(post => (
    
    <li key={post.id} className='list-group-item'>
        {/* <Route path = {"/" + post.title} component={PostPage} /> */}
        {/* <a href  = '#' onClick={() => newPost(post)}> {post.title} </a> */}
        {/* <h1> {post.title}</h1> */}
        <Link to={"/Leagues/" + post.title} onClick={() => <PostPage thepost = {post} />}> {post.title} </Link>
        
        
    </li>
    ))}
    </ul>



  );

 
};

export default Posts;
