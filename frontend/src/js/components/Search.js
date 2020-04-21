import React, { Component } from 'react'


function Search(props) {
    
    useEffect((res) => {
        const fetchPosts = async () => {
            setLoading(true);
            res = await axios.get('https://still-waters-10895.herokuapp.com/getallleagues');
            console.log(res.data);
            setPosts(res.data.leagues_list);
            console.log(listante)
            setLoading(false);
        };
    return (
        <h1> SEARCH RESULTS BABY </h1>
    );

}
export default Search;
