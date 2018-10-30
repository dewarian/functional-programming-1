# OBA


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