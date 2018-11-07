// Shout out naar Folkert, Dennis en Daniël van de Velde
require("dotenv").config()


const chalk = require("chalk")
const express = require("express")
const app = express()
const port = 3000
const helpers = require("./helpers/helpers.js")
const obaWrapper = require("node-oba-api-wrapper")

const obaApi = new obaWrapper({
	public: process.env.PUBLIC,
    secret: process.env.SECRET
})


const search = async (q, facet) => {
  	return await obaApi.get("search", {
  	  	q,
		librarian: true,
		refine: true,
		facet,
		count: 20,
		filter: (result) => {
			const publicationYear = helpers.getPublicationYearFromResult(result)
			const currentYear = new Date().getFullYear()

			return publicationYear >= currentYear - 5
		}
  	})  
}

// Datastructuur omvormen in een platte vorm. 
// Data structuur is plat

// van books naar objects op basis van jaartallen
// map over jaartallen, om achter de count te komen.
// 

// Shout out naar Maikel
(async () => {
	try {
		const results = await search("language:dut", "type(book)")
		// ("harry potter", ["type(book)", "auteur(J.K. Rowling)"])
		// meerdere facetten toevoegen thanks to Jessie

		if (results) {
			const transformedResults = helpers.getTransformedResultFromResults(results)
			const authors = transformedResults.map(result => result.author)
			const transformedAuthors = authors.map(helpers.getNameAndGender)

			const filterTransformedAuthors = transformedAuthors.filter(transformedAuthor => {
				return transformedAuthor.name && transformedAuthor.gender
			})
			console.log(filterTransformedAuthors)
			// console.log(transformedAuthors)
			const sortedTranformedResults = helpers.yearOfPublicationSorted(transformedResults)
			console.log(sortedTranformedResults)
			
			const dataWrapper = {
				"results": sortedTranformedResults
			}

			app.get("/", (req, res) => res.json(dataWrapper))
			app.listen(port, () => console.log(chalk.green(`Listening on port ${port}`)))
		}
	} catch (error) {
		throw new Error(error)
	}
})()

