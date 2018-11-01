# Oba


## Proces 


### Week 1


#### Day 1 | 29 October 2018

Today started off with another kick-off by Titus and Laurens. Then ? gave us a short lecture about Oba and their house and technical rules. Followed by a lesson about higherfunctions, arrays and strings, which was very useful. Especially higherfunctions, because it allows you to write more readable code and a lot shorter. 

Then we tried to talk to the Oba API with an package from [Rijk van Zanten](https://github.com/rijkvanzanten/node-oba-api) on github, however it did not go as planned. Eventually we decided to put his code directly in to the [index.js](./index.js) file, because otherwise it did not work properly. I put the secret and public key into a .env file, because it cannot be published on github. .env is obviously stored in .gitignore. By importing .env into index.js you could access both keys. Right now I can only use different search words, which in turn will return matching results. 


#### Day 2 | 30 October 2018

Today I worked on accessing more data than just using the search endpoint in the API, like details and availability. There are more endpoints, but don't think they could provide me with more useful data for my research questions. Writing the functions to get different endpoint I spent the majority of my time on. Especially because I could no longer write spaghetti code, but had to make my code more functional. Right now it is still a bit spaghetti and I know I could write it shorter, but I also had to come up with some research questions before the end of the day. 

So after I could access a lot more of the data than yesterday, I resort to spitting through the data. The data that came back with the details endpoint was the most useful for me. 
I've come up with the following questions:

* Zit er een publicatie verschil tussen mannelijke en vrouwelijke auteurs, door de jaren heen?

* Hebben bepaalde uitgevers in specifieke jaren meer uitgegeven, dan in andere jaren?

* Zijn er meer boeken of tijdschriften over technologie uitgegeven in de afgelopen vijf jaar?

* Hoeveel boeken worden er vertaald tegenover boeken, die wel in de oorspronkelijke taal gehouden worden?

* Bevinden boeken van een specifieke auteur zich vaker op een bepaalde locatie, dan andere locaties?


#### Day 3 | 31 October 2018

Today we discussed my first question in class and as a result came up with new questions! Then we also got the chance to discuss our questions with fellow classmates which helped with to look at things from another perspective. Obviously I also realized I formed a lot of 'yes' or 'no' questions, so I had to rephrase those, to make them sound better, but also to specify those question, as they are now quite abstract. 

Then I did some more research in the data to find more deeper aspects to those question and to refine them. This part I really struggled with, because there are a lot of different variables in the dataset. Thankfully some classmates wrote some code, which made it a lot easier to browse through the data and another classmate wrote every meaning to the variables in the data. This made it all a lot clearer for me. 

Afterwards I tried to implement my code through theirs, but I'm still struggling on that part. Moreover because I'm not exactly sure if I should implement my code through theirs... This is also a side effect, because I understand a large part of their code, but not all. Then I tried to search with more search words, unfortunately it broke... It is possible to make this work, so it's something I will keep working on until it works. 

Around noon Laurens en Titus gave us lectures about how to get certain parts out of the API and how you can use promises to access information at the same time out of different endpoints. 

**Research questions**

* Hoe is de verhouding qua publicatie tussen mannelijke en vrouwelijke auteurs veranderd, door de jaren heen?
    * Zit er een verschil tussen uitgevers in de bibliotheek, die meer werk publiceren van mannelijke auteurs dan vrouwelijke?
    * Zijn er uitgevers in de bibliotheek, die meer werk zijn gaan publiceren van vrouwelijke auteurs en uitgevers die nog steeds meer mannelijke auteurs vertegenwoordigen door de jaren heen?
    * Heeft de oba meer vrouwelijke, dan mannelijke auteurs in hun catalogus en is dit in verband met het aantal uitgevers die zich binnen de Oba bevinden?
    * In de periode dat de feministsche golf op gang kwam, zijn er toen meer boeken uitgekomen, die geschreven zijn door vrouwen of meer boeken over het feminisme zelf?

* Zijn er in bepaalde jaren meer boeken uitgegeven door specifieke uitgevers en hoe is dit gerelateerd aan gebeurtenissen in die periode?
    * Geven uitgevers meer boeken uit van een bepaald genre en is dit gerelateerd aan bepaalde periodes?

* Zijn er meer boeken of tijdschriften over technologie uitgegeven in de afgelopen vijf jaar en worden er meer coverimages gebruikt?
    * Worden er steeds meer coverimages gebruikt door de jaren heen en is er een verband met de uitgevers?

* Hoeveel boeken worden er vertaald tegenover boeken, die wel in de oorspronkelijke taal gehouden worden is er een verband met de uitgevers?

* Bevinden boeken van een specifieke auteur zich vaker op een bepaalde locatie, dan andere locaties en is dit in verband met het jaar van uitgave?
    * Zijn deze boeken ook gesorteerd op geslacht?


#### Day 4 | 1 November 2018

**Roadmap**

1. Find out how facets work.
2. Sort through the data to find if all variables are accessable.
    * Make sure to only get all the books in the Api.
    * All the books need to be in dutch.
    * Find all the authors.
    * Find the different publishers.
    * Sort through all the publication years of these authors.
    * Is there a connection with events?
    * Use another Api with the most popular male and female firstnames.
3. Try to use more keySearch words, to make the results more clearer. 
4. Store results in a New Object