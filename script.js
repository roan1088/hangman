// Alphabets
var alpahbetList = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
// List of pokemons (empty) to be filled by retrieving from API
var pokemonList = [];
// Variable for words
var wordToGuess, wordGuess;
// Variables for lives and scores
var userLives = 5, userScore;

// Build button area
// For each character in the alphabet
$.each(alpahbetList, function(index, alphabet) {
    // Create a button for that alphabet
    var buttonEl = $("<button>").text(alphabet);
    buttonEl.addClass("alphabet-button");
    buttonEl.val(alphabet);
    buttonEl.attr("disabled", true);
    $(".button-area").append(buttonEl);
});

// Function to get a random pokemon from the list
function getPokemon() {
    var rngIndex = Math.floor(Math.random() * pokemonList.length);
    return pokemonList[rngIndex].name.toUpperCase();
}

// Function to start the round
function startRound() {
    // Enable all the alphabet buttons
    $(".alphabet-button").attr("disabled", false);
    // Get a random word to be guessed
    wordToGuess = getPokemon();
    console.log(wordToGuess);
    // Create the word with blanks
    wordGuess = "";
    $.each(wordToGuess.split(""), function(index, letter) {
        if (alpahbetList.includes(letter)) {
            wordGuess += '_';
        }
        else {
            wordGuess += letter;
        }
    });
    console.log(wordGuess);
    // Update the display
    $("#category").text("Genereation One Pokemon");
    $("#word-view").text(wordGuess);
}

// When an alphabet button is clicked
$(".alphabet-button").click(function() {
    console.log($(this).val());
    // Disable the button
    $(this).attr("disabled", true);
});

// When a key is pressed
$(document).keydown(function(event) {
    // Find the button of the letter pressed
    var letterButton = $(".alphabet-button[value='" + event.key.toUpperCase() + "']")
    // console.log(letterButton);
    // Check if the button is enabled
    if (!letterButton.attr("disabled")) {
        // Trigger the click function of the button
        letterButton.click();
    }    
});

// Game flow starts here
// Request list of gen 1 pokemons
$.ajax({
    url: "https://pokeapi.co/api/v2/pokemon?limit=151",
    method: "GET"
}).then(function(response) {
    // Store the retrieved pokemons
    pokemonList = response.results;
    // console.log(pokemonList);
    startRound();
});