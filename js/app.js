
const form = document.getElementById('search-form');
const searchFile = document.getElementById('search-keyword');
const responseContainer = document.getElementById('response-container');
let searchedForText;


form.addEventListener('submit', function(e){
    e.preventDefault();
    responseContainer.innerHTML = "";
    searchedForText = searchFile.value;
    getNews();
});

function getNews() {
    const articleRequest = new XMLHttpRequest();
    articleRequest.open("GET",
        `https://api.nytimes.com/svc/search/v2/articlesearch.json?g=${searchedForText}&api-key=1df12e38d0284275853f0f818e3aa726`);
    articleRequest.onload = addNews;
    articleRequest.onerror = handleError;
    articleRequest.send();
}
function addNews() {
    const data = JSON.parse(this.responseText);
    const article = data.response.docs;
    console.log(article);

// Iterando el objeto con datos recibidos de la API

    const allArticles = article.map((article, index) => {
        if (index <= 5) {
            const title = article.headline.main;
            const snippet = article.snippet;
            const urlNews = article.web_url;

           
// Creando los elementos DOM dinamicamente
            let titleBox = document.createElement("h2");
            let snippetBox = document.createElement("p");
            let buttomBox = document.createElement("a");

            buttomBox.setAttribute("href",
                                    urlNews);
           

            titleBox.innerText = title;
            snippetBox.innerText = snippet;
            buttomBox.innerText = "View the news";

// Agregandolos al Contenedor
            responseContainer.appendChild(titleBox);
            responseContainer.appendChild(snippetBox);
            responseContainer.appendChild(buttomBox);
        }
    });
}

function handleError(){
   console.log('hay un error');
}
handleError();

