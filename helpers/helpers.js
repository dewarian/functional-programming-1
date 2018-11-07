// Shout out naar Maikel voor het helpen

const _range = require ("lodash.range")
const fs = require("fs")

const getAuthorFromResult = (result) => {
    return result.authors
        && result.authors["main-author"]
        && result.authors["main-author"].$t
        || undefined
}

const getPublisherFromResult = (result) => {
    return result.publication
        && result.publication.publishers
        && result.publication.publishers.publisher
        && result.publication.publishers.publisher.$t
        || undefined
}

const getPublicationYearFromResult = (result) => {
    return result.publication
        && result.publication.year
        && result.publication.year.$t
        && Number(result.publication.year.$t)
        || undefined
}

const getLanguageFromResult = (result) => {
    return result.languages
        && result.languages.language
        && result.languages.language.$t
        || undefined
}

const yearOfPublicationSorted = (books) => {
    const currentYear = new Date().getFullYear(books)    
    const yearsOfPublication = _range(currentYear - 5, currentYear + 1)

    return yearsOfPublication.map (year => ({
        [year]: books 
        ? books.filter(book => book.publicationYear === year)
        : null
    }))
}

// Shout out naar Wouter 
const getFilterdGender = {};

const getGenderFromName = (firstname) => {
	if (Object.keys(getFilterdGender ).length <= 0) {
		Object.assign(getFilterdGender , JSON.parse(fs.readFileSync(__dirname + "/../names.json", "utf8")));
	}
	const man = getFilterdGender .mannen.find(name => name === firstname);
	const vrouw = getFilterdGender .vrouwen.find(name => name === firstname);
	if (!(man || vrouw) || man && vrouw) return null;
	return (man && "Man") || (vrouw && "Vrouw");
}

const getNameAndGender = (author) => {
    const authorFirstNameLastName = author.split(', ')
    let firstName = authorFirstNameLastName[1]
    const firstDot = firstName && firstName.indexOf(".")
    const hasDots = firstDot !== -1
    const transformedFirstName = getTransformedFirstName()
    const nameToUse = hasDots ? transformedFirstName : firstName
    return {
    	name: nameToUse,
        gender: getGenderFromName(nameToUse),
    }
}

const getTransformedFirstName = (hasDots, firstName, firstDot) => {
    const removeStartIndex = hasDots ? firstDot - 1 : undefined
    const endIndex = firstName && firstName.length
    const tokensToRemove = firstName && removeStartIndex !== undefined && firstName.slice(removeStartIndex, endIndex)
    const transformedFirstName = tokensToRemove && firstName.replace(tokensToRemove, '').trim()
    return transformedFirstName
}

const getTransformedResultFromResults = (results) => {
    return results 
        ? results.map(result => ({
            author: getAuthorFromResult(result),
            publisher: getPublisherFromResult(result),
            publicationYear: getPublicationYearFromResult(result),
            language: getLanguageFromResult(result)
        })) 
        : []
}


module.exports = {
    getTransformedResultFromResults, 
    getPublicationYearFromResult, 
    yearOfPublicationSorted, 
    getGenderFromName, 
    getAuthorFromResult,
    getNameAndGender
}


