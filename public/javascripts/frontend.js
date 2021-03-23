console.log('This line should be in the console of the V8 Chrome Web Engine. Hint: Hit F12');

let rawJSONData = document.getElementById("rawJSON-id");
console.log(rawJSONData.innerText);
rawJSONData.innerText = "This should be changed now."

/* Search Bar */
document.getElementById("searchbar-id").addEventListener("search", function()
{
    // TODO: Do some guessing for the user based on input chars
});

/* Search BUTTON */
document.getElementById("search-button").addEventListener("click", function()
{
    document.getElementById("searchtext").innerText =
        document.getElementById("searchbar-id").value;
});
