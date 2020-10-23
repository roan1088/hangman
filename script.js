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
    // Reset the lives to 5
    userLives = 5;
    $("#user-lives").text(userLives);
    // Enable all the alphabet buttons
    $(".alphabet-button").attr("disabled", false);
    $(".alphabet-button").removeClass("letter-clicked");
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
    // console.log(wordGuess);
    // Update the display
    $("#category").text("Generation One Pokemon");
    $("#word-view").text(wordGuess);
    $("#result").text("");
}

// Function called when round ends
function endRound() {
    // Disable all the buttons
    $(".alphabet-button").attr("disabled", true);
    // Check if its a loss
    if (userLives === 0) {
        $("#result").text("You lost! The word was " + wordToGuess);
    }
    else {
        $("#result").text("You won!");
    }
    $("#replay-button").attr("hidden", false);
}

// When an alphabet button is clicked
$(".alphabet-button").click(function() {
    console.log($(this).val());
    // Disable the button
    $(this).attr("disabled", true);
    $(this).addClass("letter-clicked");
    // Check of the guessed letter is in the word
    var guessedLetter = $(this).val();
    // If guess is correct
    if (wordToGuess.includes(guessedLetter)) {
        // console.log("hit");
        // For each letter
        $.each(wordToGuess.split(""), function(index, letter) {
            // If the letter matches
            if (letter === guessedLetter) {
                // console.log(letter);
                /// Replace the '_' in the string to the letter
                wordGuess = wordGuess.substr(0, index) + letter + wordGuess.substr(index + 1);
            }
        });
        // console.log(wordGuess);
        // Update the display
        $("#word-view").text(wordGuess);
    }
    // If guess is wrong
    else {
        // console.log("miss");
        // Lose a life
        userLives--;
        // Update the lives
        $("#user-lives").text(userLives);
    }
    // Check if the game is done
    if ((wordGuess === wordToGuess) || (userLives === 0)) {
        endRound();
    }
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

// When go again button is clicked
$("#replay-button").click(function(event) {
    // Hide this button
    $(this).attr("hidden", true);
    // Start a new round
    startRound();
})

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