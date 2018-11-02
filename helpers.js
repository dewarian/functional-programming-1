const getResultsFromSearchData = (searchData) => {
    return searchData.aquabrowser 
    && searchData.aquabrowser.results 
    && searchData.aquabrowser.results[0]
    && searchData.aquabrowser.results[0].results
    || []
}

module.exports = {getResultsFromSearchData}
