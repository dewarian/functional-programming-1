require("dotenv").config()

const api = require("./oba-api.js")
const chalk = require("chalk")
const express = require("express")
const app = express()
const port = 3000
const helpers = require ("./helpers.js")

const obaApi = new api({
  	url: "https://zoeken.oba.nl/api/v1/",
  	key: process.env.PUBLIC
})

// Search for method, params and than optional where you wanna find something
// returns first 20 items
// obaApi.get(endpoint, params, filterKey)
// possible endpoints: search (needs "q" parameter) | details (needs a "frabl" parameter) | availability (needs a "frabl" parameter) | holdings/root | index/x (where x = facet type (like "book" ))
// possible parameters: q, librarian, refine, sort etc. check oba api documentation for all
// possible filterKey: any higher order key in response object, like title returns only title objects instead of full data object

const search = async (q, facet) => {
  	return await obaApi.get("search", {
  	  	q,
		librarian: true,
		refine: true,
		facet
  	})  
}

(async () => {
	try {
		const { data: searchData } = await search("harry potter", ["type(book)", "auteur(J.K. Rowling)"])

		if (searchData) {
			const results = helpers.getResultsFromSearchData(searchData)
			const transformedResults = helpers.getTransformedResultFromResults(results)
			console.log(transformedResults)
			// const parsedData = JSON.parse(searchData)
			// const results = parsedData.aquabrowser 
			// && parsedData.aquabrowser.results 
			// && parsedData.aquabrowser.results.result
			// || []
			// console.log(parsedData)
			// results.map(result => {
			// 	getDetailForResult(result)
			// 	getAvailabilityForResult(result)
			// })
			app.get("/", (req, res) => res.json(searchData))
			app.listen(port, () => console.log(chalk.green(`Listening on port ${port}`)))
		}
	} catch (error) {
		throw new Error(error)
	}
})()

// obaApi.get("search", {
//   	q: "harry potter",
//   	librarian: true,
//   	refine: true,
//   	facet: ["type(book)", "auteur(J.K. Rowling)"]
//   	// count: 20,
// 	// rctx:
// }).then(response => {

	// response.map(result => {
		
	// 	return 
	// })
	// map over resultaten na 20 resultaten nieuwe request naar pagina nummer + 1

	// let publicers = getPublicers(response)
	// let authors = getAuthors(response)
	// let dataStore = storeSomeFields(response)

  	// response ends up here
//   	console.log(response)

//   	// Make server with the response on the port
//   	app.get("/", (req, res) => res.json(response))
//   	app.listen(port, () => console.log(chalk.green(`Listening on port ${port}`)))
// })

// function getPublicers(data){
// 	let publicers = data.map(publicer => publicer.publicers)
// 	console.log()
// }






// old code 
// possible to map over results for frablId

// const queryString = require("query-string")
// const parser = require("xml2json")
// const axios = require("axios")


// class OBA {
//   	constructor(options) {
//   	  	this.publicKey = options.public
//   	  	this.secretKey = options.secret
//   	}

//   	get(endpoint, params) {

//   	  	const baseUrl = "http://obaliquid.staging.aquabrowser.nl/api/v1/"
//   	  	const path = endpoint + "/"

//   	  	return new Promise((resolve, reject) => {
//   	  	  	const sortedQuery = queryString.stringify(params)
//   	  	  	axios.get(baseUrl + path + "/?authorization=" + this.publicKey + "&" + sortedQuery)
//   	  	    	.then(res => res.data)
//   	  	    	.then(xml => parser.toJson(xml))
//   	  	    	.then(res => resolve(res))
//   	  	    	.catch(err => reject(err))
//   	  	});
//   	}
// }

// const client = new OBA({
//     public: process.env.public,
//     secret: process.env.secret
// })


// const search = async (q, sort, librarian) => {
//   	return await client.get("search", {
//   	  	q,
//   	  	sort,
//   	  	librarian
//   	})  
// }

// const detail = async (frabl, librarian) => {
// 	return await client.get("details", {
// 		  frabl,
// 		  librarian
// 	})  
// }

// const availability = async (frabl) => {
// 	return await client.get("availability", {
// 		  frabl
// 	})  
// }

// const getDetailForResult = async (result) => {
// 	const resultId = result.frabl
// 	const frablId = resultId.$t
// 	const detailsData = await detail(frablId, true)

// 	if(detailsData) {
// 		console.log("Details", JSON.parse(detailsData))
// 	}
// }


// const getAvailabilityForResult = async (result) => {
// 	const resultId = result.frabl
// 	const frablId = resultId.$t
// 	const availabilityData = await availability(frablId)

// 	if(availabilityData) {
// 		console.log("Availability", JSON.parse(availabilityData))
// 	}
// }


