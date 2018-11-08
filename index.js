// Shout out naar Folkert, Dennis en Daniël van de Velde
require("dotenv").config()

const fs = require("fs")
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
		count: 1500,
		filter: (result) => {
			const publicationYear = helpers.getPublicationYearFromResult(result)
			const currentYear = new Date().getFullYear()

			return publicationYear >= currentYear - 30
		}
  	})  
}

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
			// console.log(filterTransformedAuthors)

			const getGenderFromYear = helpers.getPublicationYears().map(year => {
				
				const resultsByYear = transformedResults.filter(result => result.publicationYear === year) 
				const gendersAndNames =	resultsByYear
					.map(result => helpers.getNameAndGender(result.author))
					.filter(result => result.name && result.gender)
				
				const amountOfMen = gendersAndNames.filter(genderAndName => genderAndName.gender === 'Man').length
				const amountOfWomen = gendersAndNames.filter(genderAndName => genderAndName.gender === 'Vrouw').length

				return {
					category: year.toString(),
					values: [
						{
							gender: 'men',
							value: amountOfMen,
						},
						{
							gender: 'women',
							value: amountOfWomen,
						},
					]
				}
			})

			console.log(getGenderFromYear)

			// const yearGenderPair = transformedResults.map(result => ({
				
			// }))
			// console.log(transformedAuthors)
			// const sortedTranformedResults = helpers.yearOfPublicationSorted(transformedResults)
			// console.log(sortedTranformedResults)


			
			// const dataWrapper = {
			// 	"results": {}
			// }

			app.get("/", (req, res) => res.json(getGenderFromYear))
			app.listen(port, () => console.log(chalk.green(`Listening on port ${port}`)))
			fs.writeFile("data.json", JSON.stringify(getGenderFromYear), (err) => err && console.error(err))
		}
	} catch (error) {
		throw new Error(error)
	}
})()

