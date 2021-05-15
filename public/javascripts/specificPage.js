console.log("Specific Page F12 Console.")

let movieData = document.getElementById('movieDataID');
let parsedData = JSON.parse(movieData.innerText);

//for (let element in parsedData)
//{
//console.log(parsedData[element]);
//}

let entity = [];

function getEntity() {
    for (let element in parsedData) {
        entity.push(parsedData[element].entity)
    }

   // console.log(entity);


    let string = "";
    for (let index = 0; index < entity.length; index++) {
        string += " " + entity[index] + "\n";
    }

    document.getElementById('entity').innerText = string;
}

getEntity();

let movieYear = [];

function getYear() {
    for (let element in parsedData) {
        movieYear.push(parsedData[element].year)
    }

     console.log(movieYear);

     let string = "";
     for (let index = 0; index < movieYear.length; index++) {
          string +=  movieYear[index] + "\n";
      }
     document.getElementById('year').innerText = string;
}

    getYear();

    let winner = [];

    function getWinner() {
        for (let element in parsedData) {
            winner.push(parsedData[element].winner)
        }

        // console.log(winner);

        let string = "";
        for (let index = 0; index < movieYear.length; index++) {
            string +=  winner[index] + "\n";

        }


        document.getElementById('winner').innerText = string;
    }

    getWinner();

    let tempCategory = [];

    function getCategory() {
        for (let element in parsedData) {
            tempCategory.push(parsedData[element].category)
        }
        let category = [...new Set(tempCategory)]

        console.log(category);
    }

    getCategory();



//let movieDataJSONParsed = JSON.parse(document.getElementById('movieDataID').innerText);
//console.log(movieDataJSONParsed);

//function displayData() {
//    for (let i in movieDataJSONParsed) {
//        let row =`<tr>
//            <td>${movieDataJSONParsed[i].entity}</td>
//           <td>${movieDataJSONParsed[i].movieYear}</td>
//            <td>${movieDataJSONParsed[i].winner}</td>
//         </tr>`

//        let table = $('#table-body')
//       table.append(row);

//    }
//}
//displayData();
