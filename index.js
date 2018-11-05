// Shout out naar Folkert, Dennis en Daniël van de Velde
require("dotenv").config()


const chalk = require("chalk")
const express = require("express")
const app = express()
const port = 3000
const helpers = require("./helpers/helpers.js")
const obaWrapper = require("./helpers/obawrapper.js")

const obaApi = new obaWrapper({
	public: process.env.PUBLIC,
    secret: process.env.SECRET
})


const search = async (q, facet, page) => {
  	return await obaApi.get("search", {
  	  	q,
		librarian: true,
		refine: true,
		facet,
		page,
		count: 200
  	})  
}


(async () => {
	try {
		const results = await search("harry potter", ["type(book)", "language(dut)", "auteur(J.K. Rowling)"], 2)
		// ("harry potter", ["type(book)", "auteur(J.K. Rowling)"])
		// meerdere facetten toevoegen thanks to Jessie

		if (results) {
			const transformedResults = helpers.getTransformedResultFromResults(results)
			console.log(transformedResults)
			
			const dataWrapper = {
				"results": transformedResults
			}

			app.get("/", (req, res) => res.json(dataWrapper))
			app.listen(port, () => console.log(chalk.green(`Listening on port ${port}`)))
		}
	} catch (error) {
		throw new Error(error)
	}
})()

