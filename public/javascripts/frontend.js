
console.log('This line should be in the console of the V8 Chrome Web Engine. Hint: Hit F12');

let rawJSONData = document.getElementById("rawJSON-id");
//console.log(rawJSONData.innerText);
//rawJSONData.innerText = "This should be changed now."


const searchWrapper = document.querySelector(".search-input");
const inputBox = searchWrapper.querySelector("#searchbar-id");
const suggestionBox = searchWrapper.querySelector(".autocomplete-box");
async function searchYearAC() {
    let movnames = JSON.parse(await document.getElementById('moviedataJSON').innerText);

    var tempYearArr = [];

    for(let element in movnames) {
        tempYearArr.push(movnames[element].year)
    }
    //console.log(tempYearArr)
    let tempUniqueArr = [...new Set(tempYearArr)];

    let uniqueYearArr =  tempUniqueArr.map(String);
    //console.log(uniqueYearArr)

    document.getElementById('searchbar-id').addEventListener('input', (e) => {
        let resultsArr = [];
        //console.log(e.target.value)
        if (e.target.value) {

            resultsArr = uniqueYearArr.filter(year => year.includes(e.target.value));
            resultsArr = resultsArr.map(year => '<li>' + year + '</li>')
            //console.log(resultsArr)
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
searchYearAC();

function select(element) {
    let selectedUserInput = element.textContent;
    //console.log(selectedUserInput);
    inputBox.value = selectedUserInput;
    searchWrapper.classList.remove("active");

}

function showSuggestionBox(resultsArr) {
    const html = !resultsArr.length ? '' : resultsArr.join('');
    suggestionBox.innerHTML = html;
}

async function categoryDropdown() {
    let categoryNames = JSON.parse(await document.getElementById('moviedataJSON').innerText);

    var tempCategoryArray = [];
    for(let element in categoryNames) {
        tempCategoryArray.push(categoryNames[element].category)
    }
    console.log(tempCategoryArray);
    let UniqueCategoryArr = [...new Set(tempCategoryArray)];
    console.log(UniqueCategoryArr);
    let string = "";
    for(var i = 0; i < UniqueCategoryArr.length; i++) {
        string += '<option value="'+UniqueCategoryArr[i]+'">' + UniqueCategoryArr[i] +"</option>";
    }
    document.getElementById('category').innerHTML = string;
}
categoryDropdown()

document.getElementById("SearchButton").onclick = function() {
    let selectionID = document.getElementById("category");
    let chosenCategory = selectionID.options[selectionID.selectedIndex].text;
    let textToBeSent = document.getElementById("category-name").innerText = chosenCategory
    if (inputBox.value !== "") {
        textToBeSent += "/year/" + inputBox.value;
    }
    window.location.href = (window.location + "api/category/" + textToBeSent);
}
