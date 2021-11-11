/**
 * @jest-environment jsdom
 */

 const { game, newGame, showScore, addTurn, lightsOn, showTurns } = require("../game");

 beforeAll(() => {
     let fs = require("fs");
     let fileContents = fs.readFileSync("index.html", "utf-8");
     document.open();
     document.write(fileContents);
     document.close();
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
     // test to fail because haven't attached event listeners yet
     test("expect data-listener to be true", () => {
         newGame();
         // get all elements with class of 'circle'
         const elements = document.getElementsByClassName("circle");
         // then loop through each of these elements and expect data-listener to be set to true
         for (let element of elements) {
             expect(element.getAttribute("data-listener")).toEqual("true");
         }
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
         expect(button.classList).toContain(game.currentGame[0] + "light");
     });
     test("showTurns should update game.turnNumber", () => {
         game.turnNumber = 42;
         showTurns();
         expect(game.turnNumber).toBe(0);
     });
 });

 /* let's just stop for a moment  and take stock of where we are. 
The majority of the computer-controlled  side of our game is working,  
we've built an object to start global  state and functions to start a new game,  
add random selections to the sequence  and show the sequence for us to copy.  
What we don't have is any form of user input.  In short, we can't actually play the game.
In this video, we're going to add  an event listener to each circle,  
so that we can check what the player has clicked  on. But we have an issue. There's no standard,  
cross-browser way of testing if an  event listener has been attached.  
Now this might seem like a massive oversight,  but it's true. Like so many things in JavaScript,  
we encounter it, scratch our heads and  then try to figure out a way around it. 
And that's where the data listener custom attribute in index.html comes in. 
So is currently set to 'false', will set to 'true' for testing purposes
*/ 