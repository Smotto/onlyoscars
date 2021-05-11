const searchWrapper = document.querySelector(".search-input");
const yearInput = searchWrapper.querySelector("#searchbar-id");
const suggestionBox = searchWrapper.querySelector(".autocomplete-box");

/* Auto completing, Finding, Selecting Year */
function searchYearAutoComplete() {
    //TODO: Check AWAIT ASYNC problem?
    let movieDataJSONParsed = JSON.parse(document.getElementById('moviedataJSON').innerText);
    let tempYearArr = [];

    for (let element in movieDataJSONParsed) {
        tempYearArr.push(movieDataJSONParsed[element].year)
    }

    let tempUniqueArr = [...new Set(tempYearArr)];

    let uniqueYearArr = tempUniqueArr.map(String);


    document.getElementById('searchbar-id').addEventListener('input', (event) => {
        let resultsArr = [];

        /* Setting the selection to the click */
        if (event.target.value) {
            resultsArr = uniqueYearArr.filter(year => year.includes(event.target.value));
            resultsArr = resultsArr.map(year => '<li>' + year + '</li>')
            searchWrapper.classList.add("active");
            showSuggestionBox(resultsArr)
            let contentList = suggestionBox.querySelectorAll("li");
            for (let index = 0; index < contentList.length; index++) {
                contentList[index].setAttribute("onclick", "select(this)");
            }
        } else {
            searchWrapper.classList.remove("active");
        }

    });
}

/* DO NOT DELETE, for searchYearAutoComplete function */
function select(element) {
    let selectedUserInput = element.textContent;
    yearInput.value = selectedUserInput;
    searchWrapper.classList.remove("active");
}

function showSuggestionBox(resultsArr) {
    const html = !resultsArr.length ? '' : resultsArr.join('');
    suggestionBox.innerHTML = html;
}

function categoryDropdown() {
    let categoryNames = JSON.parse(document.getElementById('moviedataJSON').innerText);

    let tempCategoryArray = [];
    for (let element in categoryNames) {
        tempCategoryArray.push(categoryNames[element].category)
    }

    let UniqueCategoryArr = [...new Set(tempCategoryArray)];
    UniqueCategoryArr.splice(0, 0, "None");

    let string = "";
    for (let index = 0; index < UniqueCategoryArr.length; index++) {
        string += '<option value="' + UniqueCategoryArr[index] + '">' + UniqueCategoryArr[index] + "</option>";
    }
    document.getElementById('category').innerHTML = string;
}

searchYearAutoComplete();
categoryDropdown();

/* Function to check value of toggle switch */
function isWinnertoggle() {
    let isWinner=document.getElementById("first_toggle").checked;
    let none=document.getElementById("second_toggle").checked;
    let notWinner=document.getElementById("third_toggle").checked;

    if(isWinner === true) {
        return true;
    }
    else if(notWinner === true) {
        return false;
    }
    else if(none === true) {
        return null;
    }
}

document.getElementById("SearchButton").onclick = function () {
    let categorySelectionID = document.getElementById("category");
    let chosenCategory = categorySelectionID.options[categorySelectionID.selectedIndex].text;
    // TODO: Query and Params Fix, Do ALL Case Scenarios
    /* Case Scenarios */
    //Search
    if(yearInput.value === "" && chosenCategory === "None" && isWinnertoggle() == true) {
        window.location.href = window.location;
    }
    if(yearInput.value === "" && chosenCategory === "None" && isWinnertoggle() == null) {
        window.location.href = window.location;
    }
    if(yearInput.value === "" && chosenCategory === "None" && isWinnertoggle() == false) {
        window.location.href = window.location;
    }

    //Search with year, category, and winner
    if(yearInput.value !== "" && chosenCategory !== "None" && isWinnertoggle() === true ) {
        window.location.href = window.location + "api/?year=" + yearInput.value + "/category/" + chosenCategory + "&winner=true";
    }
    //Search with year and category
    if(yearInput.value !== "" && chosenCategory !== "None" && isWinnertoggle() === null) {
        window.location.href = window.location + "api/?year=" + yearInput.value + "/category/" + chosenCategory;
    }
    //Search with year, category, and not winner
    if(yearInput.value !== "" && chosenCategory !== "None" && isWinnertoggle() === false) {
        window.location.href = window.location + "api/?year=" + yearInput.value + "/category/" + chosenCategory + "&winner=false";
    }
    //Search with category and winner
    if(yearInput.value === "" && chosenCategory !== "None" && isWinnertoggle() === true) {
        window.location.href = window.location + "api/category/" + chosenCategory + "&winner=true";
    }
    //Search with category
    if(yearInput.value === "" && chosenCategory !== "None" && isWinnertoggle() === null) {
        window.location.href = window.location + "api/category/" + chosenCategory;
    }
    //Search with category and not winner
    if(yearInput.value === "" && chosenCategory !== "None" && isWinnertoggle() === false) {
        window.location.href = window.location + "api/category/" + chosenCategory + "&winner=false";
    }
    //Search with year and winner
    if(yearInput.value !== "" && chosenCategory === "None" && isWinnertoggle() === true) {
        window.location.href = window.location + "api/?year" + yearInput.value + "&winner=true";
    }
    //Search with year
    if(yearInput.value !== "" && chosenCategory === "None" && isWinnertoggle() === null) {
        window.location.href = window.location + "api/?year" + yearInput.value;
    }
    //Search with year and not winner
    if(yearInput.value !== "" && chosenCategory === "None" && isWinnertoggle() === false) {
        window.location.href = window.location + "api/?year" + yearInput.value + "&winner=false";
    }
    // window.location.href = (window.location + "api/category/" + chosenCategory);
}