const searchWrapper = document.querySelector(".search-input");
const inputBox = searchWrapper.querySelector("#searchbar-id");
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
    inputBox.value = selectedUserInput;
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
document.getElementById("SearchButton").onclick = function () {
    let categorySelectionID = document.getElementById("category");
    let chosenCategory = categorySelectionID.options[categorySelectionID.selectedIndex].text;

    // TODO: Query and Params Fix, Do ALL Case Scenarios
    /* Case Scenarios */
    if (chosenCategory.value === "None") {
    }
    if (inputBox.value !== "") {
        window.location.href = window.location + "api/?year=" + inputBox.value;
    }

    // window.location.href = (window.location + "api/category/" + textToBeSent);
}
