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

    //3. State data for search display
    const [filterSelected, setFilterSelected] = useState(false);

    let history = useHistory();

    function checkForSubmit(event) {
        let searchUrl = createSearchUrl("league", searchInput, regionFilter, subRegionFilter);
        if (event.key === 'Enter') {
            history.push({
                pathname: searchUrl,
                state:  {   isWorking: "itis!!",
                            search: searchUrl.slice(8)
                        }
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

export default SearchBar;
