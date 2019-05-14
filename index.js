// * **index.js**: The file containing the logic for the course of the game, which depends on `Word.js` and:

// * Randomly selects a word and uses the `Word` constructor to store it

// * Prompts the user for each guess and keeps track of the user's remaining guesses

// 3. `Letter.js` *should not* `require` any other files.

// 4. `Word.js` *should only* require `Letter.js`

// 5. **HINT:** Write `Letter.js` first and test it on its own before moving on, then do the same thing with `Word.js`

// 6. **HINT:** If you name your letter's display function `toString`, JavaScript will call that function automatically whenever casting that object to a string (check out this example: <https://jsbin.com/facawetume/edit?js,console>)


// pull in word (and letter) constructors
var Word = require("./word.js");
var inquirer = require("inquirer");

var guessesLeft = 10;
var wordOne = "";

function startGame () {
    guessesLeft = 10;

    // randomly select word
    var randomWord = "hello there";

    // store it in a word constructor
    wordOne = new Word(randomWord);

    // show word for first time
    console.log("Your word is: \n")
    console.log(wordOne.returnWord());

    // start guessing
    guessLetters();
}


function playAgain () {
    inquirer.prompt([
        {
            message: "Would you like to play again?",
            type: "confirm",
            name: "again"
        }
    ]).then(function(answer) {
        if (answer.again) {
            return startGame();
        } else {
            return console.log("Thanks for playing!");
        }
    });
}


// prompt user for each guess
function guessLetters () {
    inquirer.prompt([
        {
            message: "Guess a letter.",
            name: "guess",
            validate: function (value) {
                // must be a letter and only one letter
                var regex = /^[a-zA-Z]+$/;
                if (value.match(regex) && value.length === 1) {
                    return true;
                } else {
                    // error message
                    return "Please enter a letter";
                }
            },
        }
    ]).then(function (response) {
        // save guess, and run guess letter function
        var userGuess = response.guess;
        wordOne.guessLetter(userGuess);

        // display updated word
        console.log("\n" + wordOne.returnWord());

        // either you win or you guess again
        if (wordOne.returnWord().indexOf("_") === -1 && guessesLeft > 0) {
            // var divider = "============================";
            console.log("\n\n- - - - YOU WIN! - - - -");
            // ask if they want to play again
            playAgain();

        } else if (guessesLeft > 1) {
            // subtract from remaining guesses
            guessesLeft--;

            // if guessed a correct letter, say so
            if (wordOne.guessLetter(userGuess)) {
                console.log("\nCorrect!" + "  (Remaining Guesses: " + guessesLeft);
            } else {
                console.log("\nTry another letter." + "  (Remaining Guesses: " + guessesLeft);
            }

            // guess again
            guessLetters();

        } else { // out of guesses
            console.log("\nSorry, you're out of guesses!");
            // show full word
            console.log("The word was: " + wordOne.fullWord);
            // console.log(wordOne.fullWord.split("").join(" "));
            // ask if they want to play again
            playAgain();
        }
    });
}



startGame();