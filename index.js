// pull in word/letter constructors, words array, and inquirer
var Word = require("./word.js");
var wordList = require("./words.js");
var inquirer = require("inquirer");

var guessesLeft = 0;
var startingGuesses = 15;

var previousWord = "";
var wordOne = "";
var alreadyGuessed = [];


function selectWord () {
    // randomly select word
    var randomNumber = Math.floor(Math.random() * (wordList.length - 1));
    if (wordList[randomNumber] !== previousWord) {
        var randomWord = wordList[randomNumber];
        previousWord = randomWord;

        // store it in a word constructor
        wordOne = new Word(randomWord);
    } else {
        selectWord();
    }
}


// starts game
function startGame () {
    // reset guesses
    guessesLeft = startingGuesses;

    // reset already guesses letters array
    alreadyGuessed = [];

    // choose a new word
    selectWord();

    // show word for first time
    console.log('The theme is "Harry Potter."');
    console.log("Your word is: \n")
    console.log(wordOne.returnWord());

    // start guessing
    guessLetters();
}


// end game prompt - play again or not?
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
                // if already guessed, let them enter another letter
                if (alreadyGuessed.indexOf(value) > -1) {
                    return "You've already guessed that letter - try another one."
                } else if (value.match(regex) && value.length === 1) {
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

        // add to array of guessed letters
        alreadyGuessed.push(userGuess);
        // guess the letter against the chosen word
        wordOne.guessLetter(userGuess);

        // display guessed letters
        console.log("Letters Guessed: " + alreadyGuessed.join(" "));

        // display updated word
        console.log("\n" + wordOne.returnWord());

        // either you win, you guess again, or you're out of guesses
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