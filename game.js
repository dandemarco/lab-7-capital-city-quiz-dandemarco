let randomCountryElement = document.querySelector('#random-country')
let userAnswerElement = document.querySelector("#user-answer")
let submitButton = document.querySelector("#submit-answer")
let resultTextElement = document.querySelector('#result')

// TODO when the page loads, select an element at random from the countriesAndCodes array
// I found this solution at https://stackoverflow.com/questions/5915096/get-a-random-item-from-a-javascript-array

let randomArrayElement = countriesAndCodes[Math.floor(Math.random()*countriesAndCodes.length)]

// TODO display the country's name in the randomCountryElement 

let countryName = randomArrayElement.name

randomCountryElement.innerHTML = countryName

let countryCode = randomArrayElement["alpha-2"]
let url = `https://api.worldbank.org/v2/country/${countryCode}?format=json`

// TODO add a click event handler to the submitButton.  When the user clicks the button,
submitButton.addEventListener('click', function() {
    //  * read the text from the userAnswerElement 
    let userAnswer = userAnswerElement.value
    game(userAnswer, url) 
})

function game(userAnswer, url) {
//  * Use fetch() to make a call to the World Bank API with the two-letter country code (from countriesAndCodes, example 'CN' or 'AF')

    fetch(url).then( res => {        //'res' is a variable we made to store the json response
        return res.json()           //process response into json

    }).then( (worldBankData) => {         //put the JSON data into new variable 'worldBankData'

        //  * If the API call was successful, extract the capital city from the World Bank API response.
        for (let i = 0; i < worldBankData.length; i++) {
            let countryData = worldBankData[i]

            for (let i = 0; i < countryData.length; i++) {
                let countryStats = countryData[i]
                let name = countryStats.name
                let capitalCity = countryStats.capitalCity

                //  * Compare it to the user's answer. 
                //  * Display an appropriate message in the resultTextElement to tell the user if they are right or wrong. 

                if (userAnswer.toUpperCase() === capitalCity.toUpperCase()) {
                    resultTextElement.innerHTML = `Correct! The capital of ${name} is ${capitalCity}.`
                } else {
                    resultTextElement.innerHTML = `Wrong - the capital of ${name} is not ${userAnswer}, it's ${capitalCity}.`
                }
            }         
        }
    //  * Verify no errors were encountered in the API call. If an error occurs, display an alert message. 
    }).catch( (err) => {
        alert('ERROR!', err)
    })
}



// TODO finally, connect the play again button. Clear the user's answer, select a new random country, 
// display the country's name, handle the user's guess. 

let playAgainButton = document.querySelector("#play-again-btn")
playAgainButton.addEventListener('click', function () {
    userAnswerElement.value = ""
    resultTextElement.innerHTML = ""
    randomArrayElement = countriesAndCodes[Math.floor(Math.random()*countriesAndCodes.length)]
    countryName = randomArrayElement.name
    randomCountryElement.innerHTML = countryName 
    userAnswer = userAnswerElement.value
    countryCode = randomArrayElement["alpha-2"]
    url = `https://api.worldbank.org/v2/country/${countryCode}?format=json`
    fetch(url).then( res => {        //'res' is a variable we made to store the json response
        return res.json()           //process response into json

    }).then( (worldBankData) => {         //put the JSON data into new variable 'worldBankData'

        //  * If the API call was successful, extract the capital city from the World Bank API response.
        for (let i = 0; i < worldBankData.length; i++) {
            let countryData = worldBankData[i]

            for (let i = 0; i < countryData.length; i++) {
                let countryStats = countryData[i]
                let name = countryStats.name
                let capitalCity = countryStats.capitalCity
                return name, capitalCity
            }         
        }
    }).catch( (err) => {
        alert('ERROR!', err)
    })
})
