// Function to fetch all the names and URLs of every Pokemon in the database
function fetchAllPokemon() {
return fetch('https://pokeapi.co/api/v2/pokemon/?limit=1000')
    .then(response => response.json())
    .then(data => data.results)
    .catch(error => console.error('Error:', error));
}

// Fetch all the Pokemon names and URLs
fetchAllPokemon()
.then(pokemonList => {
    // Once we have the data, pick three random Pokemon and make requests to their URLs
    const randomPokemon = pickRandomThree(pokemonList);
    randomPokemon.forEach(pokemon => {
    fetchPokemonData(pokemon.url);
    });
})
.catch(error => console.error('Error:', error));

// Function to pick three random Pokemon from the list
function pickRandomThree(pokemonList) {
const randomPokemon = [];
for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * pokemonList.length);
    randomPokemon.push(pokemonList[randomIndex]);
}
return randomPokemon;
}

// Function to fetch data for a specific Pokemon using its URL
function fetchPokemonData(url) {
return fetch(url)
    .then(response => response.json())
    .then(data => {
      // Extract the name and species URL
    const {name} = data;
    const speciesURL = data.species.url;
      // Make another request to the species URL to get the species data
    fetchPokemonSpeciesData(name, speciesURL);
    })
    .catch(error => console.error('Error:', error));
}

// Function to fetch species data for a specific Pokemon using its species URL
function fetchPokemonSpeciesData(name, speciesURL) {
return fetch(speciesURL)
    .then(response => response.json())
    .then(data => {
      // Find the description in English from the flavor_text_entries
    const description = data.flavor_text_entries.find(entry => entry.language.name === 'en').flavor_text;
      // Log the name of the Pokemon along with the description
    console.log(`${name}: ${description}`);
    })
    .catch(error => console.error('Error:', error));
}