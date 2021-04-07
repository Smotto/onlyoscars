
console.log('This line should be in the console of the V8 Chrome Web Engine. Hint: Hit F12');

let rawJSONData = document.getElementById("rawJSON-id");
//console.log(rawJSONData.innerText);
//rawJSONData.innerText = "This should be changed now."


const searchWrapper = document.querySelector(".search-input");
const inputBox = searchWrapper.querySelector("#searchbar-id");
const suggestionBox = searchWrapper.querySelector(".autocomplete-box");
async function plsWork() {
    let movnames = JSON.parse(await document.getElementById('moviedataJSON').innerText);

    var tempYearArr = []
    for(let element in movnames) {
        tempYearArr.push(movnames[element].year)
    }
    console.log(tempYearArr)
    let tempUniqueArr = [...new Set(tempYearArr)];

    let uniqueYearArr =  tempUniqueArr.map(String);
    console.log(uniqueYearArr)

    document.getElementById('searchbar-id').addEventListener('input', (e) => {
        let resultsArr = [];
        console.log(e.target.value)
        if (e.target.value) {

            resultsArr = uniqueYearArr.filter(year => year.includes(e.target.value));
            resultsArr = resultsArr.map(year => '<li>' + year + '</li>')
            console.log(resultsArr)
            searchWrapper.classList.add("active");
            showSuggestionBox(resultsArr)
            let contentList = suggestionBox.querySelectorAll("li");
            for (let i = 0; i < contentList.length; i++) {
                contentList[i].setAttribute("onclick", "select(this)");
            }
        }
        else {
            searchWrapper.classList.remove("active");
        }

    });
}
plsWork();

function select(element){
    let selectedUserInput = element.textContent;
    //console.log(selectedUserInput);
    inputBox.value = selectedUserInput;
    searchWrapper.classList.remove("active");

}


function showSuggestionBox(resultsArr) {
    const html = !resultsArr.length ? '' : resultsArr.join('');
    suggestionBox.innerHTML = html;
}

/* Search BUTTON */
document.getElementById("search-button").addEventListener("click", function()
{
    document.getElementById("searchtext").innerText =
        document.getElementById("searchbar-id").value;

    // TODO: Fetch request using get with the value inside the search bar.

});

// Example POST method implementation:
// async function postData(url = '', data = {}) {
//     // Default options are marked with *
//     const response = await fetch(url, {
//         method: 'POST', // *GET, POST, PUT, DELETE, etc.
//         mode: 'cors', // no-cors, *cors, same-origin
//         cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//         credentials: 'same-origin', // include, *same-origin, omit
//         headers: {
//             'Content-Type': 'application/json'
//             // 'Content-Type': 'application/x-www-form-urlencoded',
//         },
//         redirect: 'follow', // manual, *follow, error
//         referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
//         body: JSON.stringify(data) // body data type must match "Content-Type" header
//     });
//     return response.json(); // parses JSON response into native JavaScript objects
// }
//
// postData('https://example.com/answer', { answer: 42 })
//     .then(data => {
//         console.log(data); // JSON data parsed by `data.json()` call
//     });