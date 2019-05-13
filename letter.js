// * **Letter.js**: Contains a constructor, Letter. This constructor should be able to either display an underlying character or a blank placeholder (such as an underscore), depending on whether or not the user has guessed the letter. That means the constructor should define:

// * A string value to store the underlying character for the letter

// * A boolean value that stores whether that letter has been guessed yet

// * A function that returns the underlying character if the letter has been guessed, or a placeholder (like an underscore) if the letter has not been guessed

// * A function that takes a character as an argument and checks it against the underlying character, updating the stored boolean value to true if it was guessed correctly


var Letter = function (newLetter) {

    this.char = newLetter;
    this.isGuessed = false;

    // decide whether to show letter or not - depending on if letter has been guessed
    this.returnDisplayChar = function () {
        if (this.isGuessed) {
            return this.char;
        } else {
            return "_";
        }
    };

    // check guessed letter against this letter - if the same, change isGuessed to true
    this.guess = function (guessedLetter) {
        if (guessedLetter.toLowerCase() === this.char.toLowerCase()) {
            this.isGuessed = true;
            return true;
        }
    };
};


// var one = new Letter("m");
// console.log(one.char);
// console.log(one.isGuessed);
// console.log(one.returnDisplayChar());
// console.log(one.guess("d"));
// console.log(one.isGuessed);
// console.log(one.guess("m"));
// console.log(one.isGuessed);



module.exports = Letter;