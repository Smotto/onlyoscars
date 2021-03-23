console.log('This line should be in the console of the V8 Chrome Web Engine. Hint: Hit F12');

let rawJSONData = document.getElementById("rawJSON-id");
console.log(rawJSONData.innerText);
rawJSONData.innerText = "This should be changed now."

/* BUTTON */
document.getElementById("helloButton").addEventListener("click", function()
{
    document.getElementById("helloButton").innerText = "Changed text now.";
});

/* Search Bar */
document.getElementById("searchbar-id").addEventListener("search", function()
{
    document.getElementById("searchtext").innerText = "Changed text now.";
});


/* Promises */
function makeRequest(location) {
    return new Promise((resolve, reject) => {
        console.log(`Making Request to ${location}`)
        if (location === 'Google')
        {
            resolve('Google says hi')
        } else {
            reject('We can only talk to Google')
        }
    })
}

function processRequest(response) {
    return new Promise((resolve, reject) => {
        console.log('Processing Response')
        resolve(`Extra Information + ${response}`)
    })
}

// makeRequest('Facebook').then(response => {
//     console.log('Response Received.')
//     return processRequest(response)
// }).then(processedResponse => {
//     console.log(processedResponse)
// }).catch(err => {
//     console.log(err)
// })

/* Neater than above */
async function doWork() {
    try {
        const response = await makeRequest('Facebook')
        console.log('Response Received')
        const processedResponse = await processRequest(response)
        console.log(processedResponse);
    } catch (error) {
        console.log(error)
    }
}

doWork()