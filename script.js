const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');


let apiQuotes = [];

// show loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// hide loading
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true
}

// show new quote
function newQuote(){
    loading();
    // pick a random quote from apiQuote array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
   //check if author field is blank replace with uknown
    if(! quote.author){
        authorText.textContent = 'Uknown';
    }else{
        authorText.textContent = quote.author;
    }
    
    // check quote length to determine the styling
    if(quote.text.length > 120){
        quoteText.classList.add('long-quote');
    }else{
        quoteText.classList.remove('long-quote');
    }
// set quote, hide loader
    quoteText.textContent = quote.text;

    complete();
}

// Get quote from API
async function GetQuotes(){
    loading();

    const ApiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';

    try{
     const response = await fetch(ApiUrl);
     apiQuotes = await response.json();
     newQuote();
    }catch(error){
        // catch error here
    }
}

// twwt a quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank')
}

// event listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);
// on load
GetQuotes();
