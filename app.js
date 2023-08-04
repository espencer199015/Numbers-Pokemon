// Function to fetch a fact about a specific number
function fetchNumberFact(number) {
return fetch(`http://numbersapi.com/${number}?json`)
    .then(response => response.json())
    .then(data => data.text)
    .catch(error => console.error('Error:', error));
}

// Function to display the facts on the page
function displayFacts(facts) {
const factList = document.getElementById('fact-list');
facts.forEach(fact => {
    const listItem = document.createElement('li');
    listItem.textContent = fact;
    factList.appendChild(listItem);
});
}

// Function to get multiple facts about your favorite number
function getMultipleNumberFacts() {
const favoriteNumber = 7;
const numberOfFacts = 4;

const fetchPromises = [];
for (let i = 0; i < numberOfFacts; i++) {
    fetchPromises.push(fetchNumberFact(favoriteNumber));
}

Promise.all(fetchPromises)
    .then(facts => displayFacts(facts))
    .catch(error => console.error('Error:', error));
}

// Call the function to get and display multiple facts about your favorite number
getMultipleNumberFacts();

// Function to fetch a single card from a newly shuffled deck
function fetchSingleCard() {
return fetch('https://deckofcardsapi.com/api/deck/new/draw/?count=1')
    .then(response => response.json())
    .then(data => data.cards[0])
    .catch(error => console.error('Error:', error));
}

// Fetch a single card and log its value and suit
fetchSingleCard()
.then(card => {
    console.log(`${card.value} of ${card.suit}`);
})
.catch(error => console.error('Error:', error));

// Function to fetch two cards from the same deck
function fetchTwoCards() {
return fetch('https://deckofcardsapi.com/api/deck/new/draw/?count=2')
    .then(response => response.json())
    .then(data => data.cards)
    .catch(error => console.error('Error:', error));
}

// Fetch two cards and log their values and suits
fetchTwoCards()
.then(cards => {
    cards.forEach(card => {
    console.log(`${card.value} of ${card.suit}`);
    });
})
.catch(error => console.error('Error:', error));
