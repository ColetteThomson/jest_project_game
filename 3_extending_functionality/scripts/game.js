let game = {
    currentGame: [],
    playerMoves: [],
    score: 0,
    choices: ["button1", "button2", "button3", "button4"]
};
// add newGame function and set game score to zero to allow newGame test to pass
function newGame() {
    //to clear currentGame and playerMoves arrays and so resets everything
    game.currentGame = [];
    game.playerMoves = [];
    game.score = 0;
    showScore();
}

// showScore will reset score to zero on the DOM
function showScore() {
    document.getElementById("score").innerText = game.score;
}

// remember to add new functions in here
module.exports = { game, newGame, showScore };

// addTurn will add a turn to our current empty sequence