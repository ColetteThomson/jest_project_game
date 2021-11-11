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
    // ties into test 'expect data listener to be true'
    for (let circle of document.getElementsByClassName("circle")) {
        if (circle.getAttribute("data-listener") !== "true") {
            circle.addEventListener("click", (e) => {
                // 'id' refers to button ids (is dependent on which circle)
                let move = e.target.getAttribute("id");
                // to call lightsOn with 'move' to illuminate the correct circle
                lightsOn(move);
                // push that 'move' into game.playerMoves and then call playerTurn function (not written yet)
                game.playerMoves.push(move);
                playerTurn();
            });
            //set data-listener to true (so can then test and they will)
            circle.setAttribute("data-listener", "true");
        }
    }
    showScore();
    addTurn();
}

/* Note:  if you want to confirm that an  event listener has been attached to the DOM,  
then you need to use something like  global state or an attribute to do it.  */


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
    document.getElementById(circ).classList.add(circ + "light");
    setTimeout(function () {
        document.getElementById(circ).classList.remove(circ + "light");
    }, 400);
}

function showScore() {
    document.getElementById("score").innerText = game.score;
}

module.exports = { game, newGame, showScore, addTurn, lightsOn, showTurns };