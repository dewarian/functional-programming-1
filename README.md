# Functional Programming
## Partner: Oba 
**In this project we got to build a research case with data from the Oba. By talking to an Api and in the end making a data visualization with D3. All this while programming as functional as possible. Bye spaghetti code! 🤓**


## Table of Contents
* [How to install](#how-to-install) 
* [Visualization](#visualization) 
* [Research](#research)
* [Learning process](#learning-process)
* [Credits](#credits)
* [Resources](#resources)
* [Packages](#packages)
* [License](#license)

## How to install

Before installing make sure you have installed the latest version of node.js
Choose or make a new directory.
Load the template into your directory.
```bash
git clone https://github.com/chelseadoeleman/functional-programming.git
```

Make sure you have the latest version of npm.
Install the dependencies in [package.json](package.json)
```bash
npm install
```

### Warning, read before executing

**Before starting the server there need to be some changes made in node_modules. This is ofcourse bad practice, but because of a bug needs to be done none the less. In `oba-api` dependency that is used in the `node-oba-api-wrapper` the url needs be changed: `const baseUrl = 'http://zoeken.oba.nl/api/v1/';` to this. This can be done in `index.js` in `oba-api`.**

Start the server 
```bash
npm start
```


## Visualization

![Data visualization](./images/data.png)

End result is hosted on [github pages](https://chelseadoeleman.github.io/functional-programming/)


## Research

### Oriëntation

By talking to the Api I have looked at the different variables in the data and what could be interesting starting points. Unfortunately, the Api was quite complicated, but thanks to [Daniël van de Velde's ReadMe](https://github.com/DanielvandeVelde/functional-programming/blob/master/README.md) I was able to get a good overview of the data and then to draw up research questions. By using [Rijk's](https://github.com/rijkvanzanten/node-oba-api) package for node to use the Api, it was quite easily possible to return data from the Api.

### Research Questions

After loading some data from the Api, I used an JSON viewer extension. This made it possible to look at the data through the browser instead of using the terminal.
These are some questions I think are interesting to look further into, while looking at the dataset of the Oba.

* How has the relationship between male and female authors in terms of publication changed over the years?
    * Is there a difference between publishers in the library who publish more work by male authors than female authors?
    * Have there been publishers in the library who have started to publish more work by female authors and publishers who are still representing more male authors through the years?
    * Does the Oba have more female than male authors in their catalogue and is this because of the number of publishers in the Oba?
    * Back in time when the feminist wave came into being, were there more books published by women or more books about feminism itself?

* Are there more books published by specific publishers in certain years and how is this related to events in that period?
    * Do publishers publish more books of a certain genre and is this related to certain events?

* Have more technology books or magazines been published in the last five years and are they using more cover images for those books?
    * Are more and more cover images used over the years and is there a connection between them and the publishers?

* How many books are translated against books that are kept in the original language, is there a connection to the publishers?

* Are books by a particular author more often in a specific location than other locations and is this related to the year of publication?
    * Are these books also sorted by gender?



I would like to focus on the difference between male and female authors in publishers and how this has changed over the years. My expectations are that more male authors are still represented by publishers, but that there is an ascending trend among female authors. 

If there is more time after realising my data in a graph, in addition I also think it would be interesting to find out which publishers publish more young-adult books and whether this genre is generally written more by female authors than by male authors. But this isn't relevant for now, maybe somewhere in the future.


**Main question**

What will the difference between male and female authors look like over the past few years? 

**Hypothesis**

Over the past thirty years, the number of female authors has increased significantly among publications, although the number still does not exceed the number of male authors.

### Data

For this research I need the following data from the Api:
    * Only the data about books in the library
    * The different authors
    * The different publishers
    * The books over the past thirty years and the year of publication.

Additional sources:
    * Overview of names of all female and male authors, where the gender is also known.

This is what my [transformedResults](./index.js) looks like:
```
[ { author: 'Wieringa, Tommy',
    publisher: 'De Bezige Bij',
    publicationYear: 2014,
    language: 'dut' 
} ]
```


Thanks to [Wouter](https://github.com/maanlamp/frontend-applications) I could use another Api, that returned some popular dutch names with the belonging gender. This made it possible to loop over my results and get the author and adding the belonging gender to the author. The data was formatted as JSON, so this made it easy for me to use. 

I managed to get my data in the desired format, so that I could use it in my visualisation, which I build with D3.
It looks something like this

```
{ category: '2012',
    values:
    [ { gender: 'men', value: 5 }, { gender: 'women', value: 2 } ] },
{ category: '2013',
    values:
    [ { gender: 'men', value: 2 }, { gender: 'women', value: 2 } ] },
{ category: '2014',
    values:
    [ { gender: 'men', value: 1 }, { gender: 'women', value: 1 } ] },
{ category: '2015',
    values:
    [ { gender: 'men', value: 1 }, { gender: 'women', value: 1 } ] },

```

With [Wouter's wrapper]() it was possible to return more than 20 results in the data, which in turn could be stored in [data.json](./data.json)

### Possible visualizations

These are some sketches I made beforehand. So browsing through Observable and bl.ocks would be easier, because I would know what to look for. It also gave me an overview of what I might be able to realise in the amount of time that I had and with my Javascript skills. The first sketch required some merging of two different graphs, which would make reading the data harder than it should be and also more difficult to realise with D3. Which is a complex program in itself.

![Pie Chart and Bar Graph](./images/viz1.jpg)

![Line Graph](./images/viz2.jpg)


In the end it was suprising to see that there weren't that many female publishers before 2000, wether this is because of the other Api used to connect a gender to an author name remains possible. Especially because it could not get authors that used their initials and last name. For example Harry Potter and the Goblet of fire, was released in 2000, but the Api couldn't connect J.K rowling to the gender female... So there is definitely room for improvement there, but for now it works. And still shows some interesting results. 
Where I thought female authors wouldn't have exceeded the male authors I was wrong, because as of 2012 there were more books published by female authors than male authors. Still the most suprising results were for me the books published before 2000, because apparently there weren't that many, wether published by male or female authors.

## Learning process

I made some major steps throughout this project. 
First of all working with an Api was something I had never done before, so setting it up was enlightning and frustrating at the same time. I learned how to work with different parameters in the Api while using facets, etc. and to gather data from the Api neatly with Promises. Promises where always something I could not wrap my head around, until now. I finally get the gist of it. The hardest part for me was returning more than 20 results.

Then came along all the functions, because it is still functional programming. In the end the best way for me to code, was to directly write stept by step, what needed to happen to realise that certain part. Then to write it like spaghetti code and in the end dividing it into different functions, which I then wrote in [helpers.js](./helpers.js). From there I could call the different functions that were defined in helpers in my [index.js](./index.js) so my index.js wouldn't blow up with all the different functions.

Another thing I learned was to load data dynamically in a new JSON file, but moreover just creating new Objects with data from the Api. So that the data could be more clearly arranged and I could get a better overview. I found this the most difficult part of functional programming, but in the end I managed but with a lot of help. 
I really liked the different functions that made it possible to do all kind of things with an array, like map and filter. I still find it quite hard though to clean up the data and definitely want to keep practicing this!

Because I was so engrossed in the data and had a lot of difficulties with it, I didn't allow enough time to work and experiment with D3. It looks so cool, so I definitely want to dive deeper into D3! Also because it is quite complex en the possibilities are almost endless! There is still a lot to learn and I got the feeling that I am not at the right level now, where I should have been by the end of this course. I find this very unfortunate and a real pity.

A complete log of my learning process can be found [here!](./docs/processlog.md)

## Credits

These are the people that helped me the most while programming. Either by asking questions and/or looking at their repository's.

* [Folkert-Jan](https://github.com/FJvdPol) & Dennis
* [Daniël van de Velde](https://github.com/DanielvandeVelde)
* [Wouter](https://github.com/maanlamp)
* [Maikel](https://github.com/Maikxx)
* Tim
* [Jessie](https://github.com/jessiemasonx)
* [Linda](https://github.com/LindadeHaan)


## Resources

* [Oba Api](https://zoeken.oba.nl/api/v1/)
* Stackoverflow
* MDN web tools
* [Grouped bar chart](https://bl.ocks.org/bricedev/0d95074b6d83a77dc3ad)
* [Tooltips](http://bl.ocks.org/d3noob/a22c42db65eb00d4e369)

## Packages 

* [lodash.range]()
To get a range of publication years, where you define a start and endpoint, as an array. Alternatively you could write a loop, but this isn't functional ofcourse! 🙃


## License
This repository is licensed as [MIT](license) by [Chelsea Doeleman](https://github.com/chelseadoeleman), 2018