if(process.env.NODE_ENV !== "production") {
	require("dotenv").load()
}

const queryString = require("query-string")
const parser = require("xml2json")
const axios = require("axios")


class OBA {
  	constructor(options) {
  	  	this.publicKey = options.public
  	  	this.secretKey = options.secret
  	}

  	get(endpoint, params) {

  	  	const baseUrl = "http://obaliquid.staging.aquabrowser.nl/api/v1/"
  	  	const path = endpoint + "/"

  	  	return new Promise((resolve, reject) => {
  	  	  	const sortedQuery = queryString.stringify(params)
  	  	  	axios.get(baseUrl + path + "/?authorization=" + this.publicKey + "&" + sortedQuery)
  	  	    	.then(res => res.data)
  	  	    	.then(xml => parser.toJson(xml))
  	  	    	.then(res => resolve(res))
  	  	    	.catch(err => reject(err))
  	  	});
  	}
}

const client = new OBA({
    public: process.env.public,
    secret: process.env.secret
})


const search = async (q, sort, librarian) => {
  	return await client.get("search", {
  	  	q,
  	  	sort,
  	  	librarian
  	})  
}

const detail = async (frabl, librarian) => {
	return await client.get("details", {
		  frabl,
		  librarian
	})  
}

(async () => {
	try {
		const searchData = await search("weer", "title", true)
		
		if (searchData) {
			const parsedData = JSON.parse(searchData)
			const results = parsedData.aquabrowser 
			&& parsedData.aquabrowser.results 
			&& parsedData.aquabrowser.results.result
			|| []
			// console.log(parsedData)
			results.map(async result => {
				const resultId = result.frabl
				const frablId = resultId.$t
				const detailsData = await detail(frablId, true)

				if(detailsData) {
					console.log(JSON.parse(detailsData))
				}
			})
			// console.log(results)
		}
	} catch (error) {
		throw new (error)
	}
})()