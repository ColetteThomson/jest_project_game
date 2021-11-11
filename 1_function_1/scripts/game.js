
// ties in with 'tests' in game.test.js
let game = {
    // currentGame and playerMoves are arrays as they would contain a number of different values
    currentGame: [],
    playerMoves: [],
    score: 0,
    // choices array contains ids of the 4 buttons. this array to be used to generate a random move selection
    // Note: when first running test from game.test.js the below choices array was empty, thus test would fail
    // - to make pass, would add button 1, 2 etc as below
    choices: ["button1", "button2", "button3", "button4"]
};

/*  need to import the addition function from calc.test.js, so test statement can run*/
module.exports = { game };