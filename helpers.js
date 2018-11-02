// Shout out naar Maikel voor het helpen
const getResultsFromSearchData = (searchData) => {
    return searchData.aquabrowser 
        && searchData.aquabrowser.results 
        && searchData.aquabrowser.results[0]
        && searchData.aquabrowser.results[0].result
        || []
}

const getAuthorFromResult = (result) => {
    return result.authors
        && result.authors[0]
        && result.authors[0]["main-author"]
        && result.authors[0]["main-author"][0]
        && result.authors[0]["main-author"][0]._
        || undefined
}

const getPublisherFromResult = (result) => {
    return result.publication
        && result.publication[0]
        && result.publication[0].publishers
        && result.publication[0].publishers[0]
        && result.publication[0].publishers[0].publisher
        && result.publication[0].publishers[0].publisher[0]
        && result.publication[0].publishers[0].publisher[0]._
        || undefined
}

const getPublicationYearFromResult = (result) => {
    return result.publication
        && result.publication[0]
        && result.publication[0].year
        && result.publication[0].year[0]
        && result.publication[0].year[0]._
        || undefined
}

const getLanguageFromResult = (result) => {
    return result.languages
        && result.languages[0]
        && result.languages[0].language
        && result.languages[0].language[0]
        && result.languages[0].language[0]._
        || undefined
}

const getTransformedResultFromResults = (results) => {
    return results 
        ? results.map(result => {
            return {
                author: getAuthorFromResult(result),
                publisher: getPublisherFromResult(result),
                publicationYear: getPublicationYearFromResult(result),
                language: getLanguageFromResult(result)
            }
        }) 
        : []
}


module.exports = {getResultsFromSearchData, getTransformedResultFromResults}


