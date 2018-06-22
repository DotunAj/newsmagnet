'use strict';

var NewsAPI = require('newsapi');
var newsapi = new NewsAPI('644635e038854371952a2aeaf41c4b1d');

if (navigator.serviceWorker) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('sw.js').catch(function (err) {
            console.log(err);
        });
    });
}

newsapi.v2.topHeadlines({
    sources: 'bbc-news,the-verge',
    q: 'bitcoin',
    category: 'business',
    language: 'en',
    country: 'us'
}).then(function (response) {
    console.log(response);
    /*
      {
        status: "ok",
        articles: [...]
      }
    */
});
//# sourceMappingURL=main.js.map
