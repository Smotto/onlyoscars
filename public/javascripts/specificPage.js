console.log("Specific Page F12 Console.")

let movieData = document.getElementById('movieDataID');
if(movieData.innerText < 3) {
    window.alert("No Results, redirecting to homepage");
    window.history.back();
}
else {
    let parsedData = JSON.parse(movieData.innerText);
    for (let element in parsedData) {

        function getEntity() {
            let entity = [];
            for (let element in parsedData) {
                entity.push(parsedData[element].entity)
            }
            return entity;
        }

        function getYear() {
            let movieYear = [];
            for (let element in parsedData) {
                movieYear.push(parsedData[element].year)
            }
            return movieYear
        }

        function getWinner() {
            let winner = [];
            for (let element in parsedData) {
                winner.push(parsedData[element].winner)
            }
            return winner
        }

        function getCategory() {
            let tempCategory = [];
            for (let element in parsedData) {
                tempCategory.push(parsedData[element].category)
            }
            return tempCategory
        }
        function getIMDBID() {
            let tempIMDBIDList = [];
            try {
                for(let element in parsedData) {
                    tempIMDBIDList.push(parsedData[element].omdbData.imdbID)
                }
            } catch (error) {
                return
            }

            return tempIMDBIDList;
        }
    }

    function addTableData() {
        let yearData = getYear();
        let categoryData = getCategory();
        let entityData = getEntity();
        let winnerData = getWinner();
        let imdbData = getIMDBID();
        console.log(yearData)
        const table = document.querySelector('#movieDataTable');

        let findingsLength = yearData.length;
        let string = "";

        // for(let )
        let link = "https://www.imdb.com/title/"
        for (let index = 0; index < findingsLength; index++) {
                if (imdbData === undefined || imdbData[index] === undefined) {
                    string = "<tr> <td>" + yearData[index] + "</td> <td>" + categoryData[index] +
                        "</td> <td>" + entityData[index] + "</td> <td>" + winnerData[index]
                        + "</td> <td>" + "No IMDB Link" + "</td> </tr>";
                    table.innerHTML += string;
                    continue;
                }

            string = "<tr> <td>" + yearData[index] + "</td> <td>" + categoryData[index] +
                "</td> <td>" + entityData[index] + "</td> <td>" + winnerData[index] +
                "</td> <td>" + "<a target=" + "blank" + " rel=" + "noopener noreferrer" + " href=" + link + imdbData[index] + ">" + 'IMDB Link' + "</a> </td> </tr>";
            table.innerHTML += string;
        }
    }
    addTableData();

}
