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

    // TODO: Fetch request using get with the value inside the search bar.

});

// Example POST method implementation:
async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

postData('https://example.com/answer', { answer: 42 })
    .then(data => {
        console.log(data); // JSON data parsed by `data.json()` call
    });