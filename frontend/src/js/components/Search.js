import { NavLink , Route, Switch, BrowserRouter, useHistory} from 'react-router-dom'
import {Link, useParams} from 'react-router-dom'
import { withRouter } from "react-router";
import React, { useState, useEffect ,Component} from 'react';
import axios from 'axios';


function Search(props) {
    
    {/*useEffect((res) => {
        const fetchPosts = async () => {
          setLoading(true);
          res = await axios.get('https://still-waters-10895.herokuapp.com/getallleagues');
          console.log(res.data);
          setPosts(res.data.leagues_list);
          console.log(listante)
          setLoading(false);
        };
        
        fetchPosts();
    }, []);*/}
    return (
        <h1> SEARCH RESULTS BABY </h1>
    );

}
export default Search;
