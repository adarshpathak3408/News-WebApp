const API_Key = "d7390e8a21a44fcb91d67a5dd92d9960";
const url = "https://newsapi.org/v2/everything?q=";


// this will reload the page 
function reload() {
    window.location.reload();
}

// when the page will load then the API would work
window.addEventListener("load", () => fetchNews("World"));

const loadingScreen = document.getElementById("loading-screen");

// Display loading screen
loadingScreen.style.display = "flex";


async function fetchNews(query) {

    try {

        const response = await fetch(`${url}${query}&apiKey=${API_Key}`);

        const store = await response.json();

        const sortedArticles = store.articles.sort(
            (newest, oldest) => new Date(oldest.publishedAt) - new Date(newest.publishedAt)
        );

        mixData(sortedArticles);

    }

    catch (error) {
        console.error("Error fetching data:", error);
    }

    finally {

        loadingScreen.style.display = "none";
    }

}

// here we are using data and making it clone and by using innerHTML we are saving the clone
function mixData(articles) {

    const cardsContainer = document.querySelector('#cards-container');
    const cardTemplate = document.querySelector('#card-template');

    // this will sort the items as per the date (latest news to oldest news)
    articles.sort((latest, oldest) => new Date(oldest.publishedAt) - new Date(latest.publishedAt));

    cardsContainer.innerHTML = "";

    articles.forEach((article) => {

        if (!article.urlToImage) return;

        // this is responsible to make clone of cards which is stored in <template> in HTML 
        const cardContentClone = cardTemplate.content.cloneNode(true);

        // this function is called here to add different data in the (cardsContainer)
        insertCardData(cardContentClone, article);

        // it is used to add the clones in the (#cards-container) in HTML file
        cardsContainer.appendChild(cardContentClone);

    });
}

// here the data is fetched by API in clones
function insertCardData(cardContentClone, article) {

    const newsImg = cardContentClone.querySelector('#news-pic');
    const newsTitle = cardContentClone.querySelector('#news-title');
    const newsSource = cardContentClone.querySelector('#news-source');
    const newsDetails = cardContentClone.querySelector('#news-details');

    // this will fetch the "image" of the news from API
    newsImg.src = article.urlToImage;

    // this will fetch the "title" of the news from API
    newsTitle.innerHTML = article.title;

    // this will fetch the "details" of the news from API
    newsDetails.innerHTML = article.description;


    // this will fetch the "actual published date" of the news from API
    const date = new Date(article.publishedAt).toLocaleString("en-Us", {
        timeZone: "Asia/Jakarta"
    });

    // this will fetch the "source" of the news from API
    newsSource.innerHTML = `${article.source.name} 🔹 ${date}`


    cardContentClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}

let selectedNavItem = null;

function onNavItemClick(id) {
    fetchNews(id);

    const navItem = document.getElementById(id);

    // if selectedNavItem is null then remove active class
    selectedNavItem?.classList.remove("active");

    // value of navItem is stored in selectedNavItem
    selectedNavItem = navItem;

    // now when the selectedNavItem is not null because there is a value present so now add the active class
    selectedNavItem.classList.add("active");

    window.scrollTo({ top: 0, behavior: "smooth" });
}


const searchButton = document.querySelector('#search-btn');

const searchText = document.querySelector('#search-input');

const clearSearchButton = document.querySelector("#clear-search");



searchButton.addEventListener("click", () => {

    // this will fetch the value which user will write in search-box
    const input = searchText.value;

    // if user don't writes anything in input-search and clicks on search btn, nothing should change
    if (!input) return;

    // this will fetch the news according to user's input 
    fetchNews(input)


    // Scroll to the top of the page
    window.scrollTo({ top: 0, behavior: "smooth" });

    fetchNews(input);

    selectedNavItem?.classList.remove("active");

    selectedNavItem = null;

});


// here by pressing "enter" key we can search directly
searchText.addEventListener("keypress", (event) => {

    if (event.key === "Enter") {

        // this will store the value of searchText into input
        const input = searchText.value.trim();  // here .trim() will remove all blank spaces which user might have typed accidently


        // if input is true means it is present then we will pass the conditions 
        if (input) {

            // Scroll to the top of the page
            window.scrollTo({ top: 0, behavior: "smooth" });

            fetchNews(input);

            selectedNavItem?.classList.remove("active");
            selectedNavItem = null;
        }
    }
});

const darkModeToggle = document.getElementById("dark-mode-toggle");

// storing value in body
const body = document.body;

const navigation = document.querySelector('#full-nav');

const navList = document.querySelector('#nav-list')

// creating dark-mode feature 
darkModeToggle.addEventListener("click", () => {

    body.classList.toggle("dark-mode");
    navigation.classList.toggle("dark-mode");
    navList.classList.toggle("dark-mode-text");

});


const searchInput = document.querySelector('#search-input');

const clearSearchIcon = document.querySelector('#clear-search');

const searchBtton = document.querySelector('#search-btn');


searchInput.addEventListener("input", () => {
    clearSearchIcon.style.display = searchInput.value ? "block" : "none";
});

clearSearchIcon.addEventListener("click", () => {
    searchInput.value = "";
    clearSearchIcon.style.display = "none";
    searchInput.focus();
});


const scrollToTopButton = document.getElementById("scroll-to-top");

scrollToTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});