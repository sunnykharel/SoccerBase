import { NavLink , Route, Switch, BrowserRouter, useHistory, useLocation} from 'react-router-dom';
import {Link, useParams} from 'react-router-dom';
import { withRouter } from "react-router";
import React, { useState, useEffect ,Component} from 'react';
import Posts from './Posts';
import Pagination from './Pagination';
import axios from 'axios';
import LeagueInstance from '../LeagueInstance';
import ModelPagesComponent from './ModelPagesComponent';
import ToggleButton from '@material-ui/lab/ToggleButton';
import FilterListIcon from '@material-ui/icons/FilterList';

import '../../css/SearchBar.css';
import createSearchUrl from './createSearchUrl';

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
    const [sortBy, setSortBy] = useState(null);
    const [sortOrder, setSortOrder] = useState(null);

    //3. State data for search display
    const [filterSelected, setFilterSelected] = useState(false);

    let history = useHistory();

    function checkForSubmit(event) {
        let searchUrl = createSearchUrl(props.model, searchInput, regionFilter, subRegionFilter,
            popFilter, areaFilter, sortBy, sortOrder);
        if (event.key === 'Enter') {
            
            var route;
            if (props.isSearch) {
                route = history.replace;
            } else {
                route = history.push;
            }
            history.push({
                pathname: searchUrl,
                state:  {   
                    model:props.model,
                    search: searchUrl.slice(8)
                }
            });
        }
    }

    //Get User Inputs onChange
    function getUserInput(e) {
        setSearchInput(e.target.value);
    }

    function getSortBy(e) {
        setSortBy(e.target.value);
    }

    function getSortOrder(e) {
        setSortOrder(e.target.value);
    }

    useEffect(() => { 
        console.log("sortby set to" + sortBy); 
        console.log("sortOrder set to" + sortOrder);
    }, [sortBy, sortOrder]);

    function getRegionFilter(e) {
        setRegionFilter(e.target.value);
    }

    return (
        <div className="SearchDiv">
            <input 
                className="searchBar" 
                placeholder="Search for your favorites - Press the Enter Key on your KeyBoard to Search" 
                onKeyPress={checkForSubmit}
                onChange={getUserInput}
            />
            
            {(filterSelected && props.isCountry) && 
            <select className="selector" onChange={getRegionFilter}>
                <option>Filter By Region:</option>
                <option value="africa">Africa</option>
                <option value="americas">Americas</option>
                <option value="asia">Asia</option>
                <option value="europe">Europe</option>
                <option value="oceania">Oceania</option>
            </select>}
            
            {filterSelected && <select className="selector" onChange={getSortBy}>
                <option>Sort By:</option>
                <option value="name">Name</option>
                { !props.isCountry && <option value="country">Country</option>}
            </select>}

            {filterSelected && <select className="selector" onChange={getSortOrder}>
                <option>Sort Order:</option>
                <option value="Ascending">Ascending</option>
                <option value="Descending">Descending</option>
            </select>}
            


            <ToggleButton
                selected={filterSelected}
                onChange={() => {
                    setFilterSelected(!filterSelected);
                }}
            >
                <FilterListIcon/>
            </ToggleButton>
        </div>
    );
}

export default SearchBar;
