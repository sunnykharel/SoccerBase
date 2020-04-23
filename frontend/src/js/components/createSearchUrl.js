

//creates search parameter string
function searchInputUrl(searchInput) {
    var result = "";
    if (searchInput) {
        result += "search_parameters=" + searchInput;
    }
    return result;
}

//creates region filter string
function regionFilterUrl(regionFilter) {
    var result ="";
    if (regionFilter) {
        result += "region=" + regionFilter;
    }
    return result;
}

//creates sub regiion filter string
function subRegionFilterUrl(subRegionFilter) {
    var result = "";
    if (subRegionFilter) {
        result += "subregion=" + subRegionFilter;
    }
    return result;
}

//CreateSearchURL
function createSearchUrl(model, searchInput, regionFilter, subRegionFilter, popFilter, areaFilter) {
    var result = "" + model + "?" + searchInputUrl(searchInput) + "&"
        + regionFilterUrl(regionFilter) + "&" + subRegionFilterUrl(subRegionFilter)
        + "&";
    
    return "/search/" + result;
}

export default createSearchUrl; 
