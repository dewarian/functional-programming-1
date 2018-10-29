if(process.env.NODE_ENV !== "production") {
    require("dotenv").load()
}

// const OBA = require("oba-api");
const queryString = require('query-string');
const parser = require('xml2json');
const axios = require('axios');

// Setup authentication to api server

class OBA {
  constructor(options) {
    this.publicKey = options.public;
    this.secretKey = options.secret;
  }

  get(endpoint, params) {

    const baseUrl = 'http://obaliquid.staging.aquabrowser.nl/api/v1/';
    const path = endpoint + '/';

    return new Promise((resolve, reject) => {
      const sortedQuery = queryString.stringify(params);
      axios.get(baseUrl + path + '/?authorization=' + this.publicKey + '&' + sortedQuery)
        .then(res => res.data)
        .then(xml => parser.toJson(xml))
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
  }
}

const client = new OBA({
    // ProQuest API Keys
    public: process.env.public,
    secret: process.env.secret
  });
// General usage:
// client.get({ENDPOINT}, {PARAMS});
// ENDPOINT = search | details | refine | schema | availability | holdings
// PARAMS = API url parameter options (see api docs for more info)

// Client returns a promise which resolves the APIs output in JSON

// Example search to the word "rijk" sorted by title:
client.get("search", {
  q: "weer",
  sort: "title"
})
  .then(res => console.log(res)) // JSON results
  .catch(err => console.log(err)) // Something went wrong in the request to the API