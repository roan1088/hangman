// Alphabets
var alpahbetList = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

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

// Function to start the round by enabling all buttons
function startRound() {
    $(".alphabet-button").attr("disabled", false);
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

startRound();