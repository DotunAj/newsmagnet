const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('644635e038854371952a2aeaf41c4b1d');

const posts = document.querySelector('.posts');

if(navigator.serviceWorker){
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
        .catch((err) => {
            console.log(err);
        })
    })
}

function generateHtml(responses){
    return responses.articles.map(response => {
        return `
        <article>
            <div class="post">
                <div class="post-img"><img  src=${response.urlToImage} alt="No Image from source"></div>
                <div class="post-content">
                    <h3>${response.title}</h3>
                    <p class="description">${response.description}</p>
                    <div class="post-source">
                        <i class="fas fa-newspaper"></i>
                        <p>${response.source.name}</p>
                    </div>
                    <a href="${response.url}" class="readmore">Read More</a>
                </div>
            </div>
        </article>
        `
    }).join(' ');
}

newsapi.v2.topHeadlines({
    country: 'ng',
    language: 'en',
  }).then(res => {
    posts.innerHTML = generateHtml(res);
  });