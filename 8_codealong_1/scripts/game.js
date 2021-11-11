let game = {
    currentGame: [],
    playerMoves: [],
    score: 0,
    turnNumber: 0,
    choices: ["button1", "button2", "button3", "button4"]
};

function newGame() {
    game.currentGame = [];
    game.playerMoves = [];
    game.score = 0;

    for (let circle of document.getElementsByClassName("circle")) {
        if (circle.getAttribute("data-listener") !== "true") {
            circle.addEventListener("click", (e) => {
                let move = e.target.getAttribute("id");
                game.playerMoves.push(move);
                lightsOn(move);
                playerTurn();
            });
            circle.setAttribute("data-listener", "true");
        }
    }
    showScore();
    addTurn();
}

function addTurn() {
    game.playerMoves = [];
    game.currentGame.push(game.choices[(Math.floor(Math.random() * 4))]);
    showTurns();
}

function showTurns() {
    game.turnNumber = 0;
    let turns = setInterval(function () {
        lightsOn(game.currentGame[game.turnNumber]);
        game.turnNumber++;
        if (game.turnNumber >= game.currentGame.length) {
            clearInterval(turns);
        }
    }, 800);
}

function lightsOn(circ) {
    document.getElementById(circ).classList.add("light");
    setTimeout(function () {
        document.getElementById(circ).classList.remove("light");
    }, 400);
}

/* playerTurn function should check if the player's move matches the move in the computer sequence. 
And if so,  then we want to keep running through the computer sequence and checking that with the 
player's turn.   If we've got to the end of the computer sequence, then we want to add another turn, 
increment  the score, and start the whole thing again.  If the move is wrong, we'll need to  display 
an alert to warn the user.*/
function playerTurn() {
    let i = game.playerMoves.length - 1;
    /* get the index  of the last element from our playerMoves array - because what we're going to do 
    is compare that  with the same index in the current game array, if our player gets the answers  
    correct then these two should match. This is convenient because it means that we can  just compare 
    elements at the same index number.   */
    if (game.currentGame[i] === game.playerMoves[i]) {
       /* if the length of  our current game array is equal to the length of our player moves, then we 
       must be at the end of  the sequence. And the player got them all correct. */ 
        if (game.currentGame.length === game.playerMoves.length) {
            /*  increment  the score and to add a new turn */
            game.score++;
            showScore();
            addTurn();
        }
    } else {
        // ties in with test 'should call an alert if the move is wrong'
        alert("Wrong move!");
        newGame();
    }
}

function showScore() {
    document.getElementById("score").innerText = game.score;
}

module.exports = { game, newGame, showScore, addTurn, lightsOn, showTurns, playerTurn };