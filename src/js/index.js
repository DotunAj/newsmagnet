const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('644635e038854371952a2aeaf41c4b1d');

if(navigator.serviceWorker){
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
        .catch((err) => {
            console.log(err);
        })
    })
}

newsapi.v2.topHeadlines({
    country: 'ng',
    language: 'en',
  }).then(response => {
    console.log(response);
    /*
      {
        status: "ok",
        articles: [...]
      }
    */
  });