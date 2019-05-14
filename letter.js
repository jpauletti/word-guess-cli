var Letter = function (newLetter) {

    this.char = newLetter;
    // if a space, always show it
    if (newLetter === " ") {
        this.isGuessed = true;
    } else {
        this.isGuessed = false;
    }

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