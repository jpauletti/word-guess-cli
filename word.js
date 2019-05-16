// * **Word.js**: Contains a constructor, Word that depends on the Letter constructor. This is used to create an object representing the current word the user is attempting to guess. That means the constructor should define:

// * An array of `new` Letter objects representing the letters of the underlying word

// * A function that returns a string representing the word. This should call the function on each letter object (the first function defined in `Letter.js`) that displays the character or an underscore and concatenate those together.

// * A function that takes a character as an argument and calls the guess function on each letter object (the second function defined in `Letter.js`)

// pull in letter constructor
var Letter = require("./letter.js");



var Word = function (newWord) {
    this.fullWord = newWord;
    // make array of letter objects
    this.letters = [];
    for (var i = 0; i < newWord.length; i++) {
        var newLetter = new Letter(newWord[i]);
        // console.log(newLetter);
        this.letters.push(newLetter);
    }

    // return the full word to be displayed - including underlines if letter not guessed
    this.returnWord = function () {
        var fullWord = "";
        for (var i = 0; i < this.letters.length; i++) {
            fullWord += this.letters[i].returnDisplayChar() + " ";
        }

        // log/display word in console
        return fullWord;
    };

    // guesses a new letter - runs for each letter in word
    this.guessLetter = function (guessedLetter) {
        var guessedRight = false;
        for (var i = 0; i < this.letters.length; i++) {
            this.letters[i].guess(guessedLetter);
            if (this.letters[i].guess(guessedLetter)) {
                guessedRight = true;
            }
        }

        if (guessedRight) {
            return true;
        }
    };


    // this.showFullWord = function () {
    //     var fullWord = "";
    //     for (var i = 0; i < this.letters.length; i++) {
    //         fullWord += this.letters[i].char;
    //     }

    //     // log/display full word in console
    //     return fullWord;
    // }
};


// var one = new Word("testing");
// console.log(one.letters);

// one.guessLetter("t");
// one.returnWord();


module.exports = Word;