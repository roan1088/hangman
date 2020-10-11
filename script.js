// Alphabets
var alpahbetList = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

// Build button area
// For each character in the alphabet
$.each(alpahbetList, function(index, alphabet) {
    // Create a button for that alphabet
    var buttonEl = $("<button>");
    buttonEl.text(alphabet);
    buttonEl.addClass("alphabet-button");
    buttonEl.val(alphabet);
    $(".button-area").append(buttonEl);
});

// When an alphabet button is clicked
$(".alphabet-button").click(function() {
    console.log($(this).val());
});

// When a key is pressed
$(document).keydown(function(event) {
    console.log(event.key.toUpperCase());
});