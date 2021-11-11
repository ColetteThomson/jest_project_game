/**
 * @jest-environment jsdom
 */

 const { getSystemErrorMap } = require("util");
const { game, newGame, showScore, addTurn, lightsOn, showTurns, playerTurn } = require("../game");

 /* what if the player makes a wrong move?  can actually use Jest to  check if an alert has been called.
To do this, we use something called a spy - which will wait and only report when it sees  
some interesting activity. first argument to spyOn is the window and  the second is the name of the method, 
in this case "alert"  */
 jest.spyOn(window, "alert").mockImplementation(() => { });
 
 beforeAll(() => {
     let fs = require("fs");
     let fileContents = fs.readFileSync("index.html", "utf-8");
     document.open();
     document.write(fileContents);
     document.close();
 });
 
 describe("pre-game", () => {
     test("clicking buttons before newGame should fail", () => {
         game.lastButton = "";
         document.getElementById("button2").click();
         expect(game.lastButton).toEqual("");
     });
 });
 
 describe("game object contains correct keys", () => {
     test("score key exists", () => {
         expect("score" in game).toBe(true);
     });
     test("currentGame key exists", () => {
         expect("currentGame" in game).toBe(true);
     });
     test("playerMoves key exists", () => {
         expect("playerMoves" in game).toBe(true);
     });
     test("choices key exists", () => {
         expect("choices" in game).toBe(true);
     });
     test("choices contain correct ids", () => {
         expect(game.choices).toEqual(["button1", "button2", "button3", "button4"]);
     });
     test("turnNumber key exists", () => {
         expect("turnNumber" in game).toBe(true);
     });
 });
 
 describe("newGame works correctly", () => {
     beforeAll(() => {
         game.score = 42;
         game.playerMoves = ["button1", "button2"];
         game.currentGame = ["button1", "button2"];
         document.getElementById("score").innerText = "42";
         newGame();
     });
     test("expect data-listener to be true", () => {
         const elements = document.getElementsByClassName("circle");
         for (let element of elements) {
             expect(element.getAttribute("data-listener")).toEqual("true");
         }
     });
     test("should set game score to zero", () => {
         expect(game.score).toEqual(0);
     });
     test("should display 0 for the element with id of score", () => {
         expect(document.getElementById("score").innerText).toEqual(0);
     });
     test("should clear the player moves array", () => {
         expect(game.playerMoves.length).toBe(0);
     });
     test("should add one move to the computer's game array", () => {
         expect(game.currentGame.length).toBe(1);
     });
 });
 
 describe("gameplay works correctly", () => {
     beforeEach(() => {
         game.score = 0;
         game.currentGame = [];
         game.playerMoves = [];
         addTurn();
     });
     afterEach(() => {
         game.score = 0;
         game.currentGame = [];
         game.playerMoves = [];
     });
     test("addTurn adds a new turn to the game", () => {
         addTurn();
         expect(game.currentGame.length).toBe(2);
     });
     test("should add correct class to light up the buttons", () => {
         let button = document.getElementById(game.currentGame[0]);
         lightsOn(game.currentGame[0]);
         expect(button.classList).toContain("light");
     });
     test("should toggle turnInProgress to true", () => {
         showTurns();
         expect(game.turnInProgress).toBe(true);
     });
     test("showTurns should update game.turnNumber", () => {
         game.turnNumber = 42;
         showTurns();
         expect(game.turnNumber).toBe(0);
     });
     /* in the beforeEach  function for our gameplay, we're adding one turn.
    so we're going to take that turn and  we're going to push it into the playerMoves array  
    before calling playerTurn. That way we know that  we have a correct answer because the playerTurn  
    and the computersTurn match each other.  */
    // test will fail because playerTurn is not yet defined
     test("should increment the score if the turn is correct", () => {
         game.playerMoves.push(game.currentGame[0]);
         playerTurn();
         // expect score to have increased
         expect(game.score).toBe(1);
     });
     // test will fail because alert was never called, i.e. number of calls is zero
     test("should call an alert if the move is wrong", () => {
         game.playerMoves.push("wrong");
         playerTurn();
         expect(window.alert).toBeCalledWith("Wrong move!");
     });
     test("clicking during computer sequence should fail", () => {
         showTurns();
         game.lastButton = "";
         document.getElementById("button2").click();
         expect(game.lastButton).toEqual("");
     });
 });