console.log("Specific Page F12 Console.")

let movieData = document.getElementById('movieDataID');
let parsedData = JSON.parse(movieData.innerText);
for (let element in parsedData)
{
    console.log(parsedData[element]);
}

// TODO: Filter out the data
// reGEX },
// ^_^ Line above separates the movie objects visually, not literally though.
// Further filter out the data {",:
// Replace the pug variable with your new filtered data :)

// Step 1: Target the data
// Step 2: Do stuff with the data
// Step 3: Replace the data
// Step 4: Profit

//TODO: Make the div in style.css nice.
// You can probably make it a nice box for each, or something.