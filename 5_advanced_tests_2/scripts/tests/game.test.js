/**
 * @jest-environment jsdom
 */

 const { game, newGame, showScore, addTurn, lightsOn } = require("../game");

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
 });
 
 describe("gameplay works correctly", () => {
     // beforeEach 'section' runs before each test is run
     beforeEach(() => {
         game.score = 0;
         //currentGame and playerMoves is reset each time
         game.currentGame = [];
         game.playerMoves = [];
         // adds a new turn to our current game array (i.e. 1 element added)
         addTurn();
     });
     // score, currentGame and playerMoves are reset again after each test (because according to RITE
     //- each test must be isolated)
     afterEach(() => {
         game.score = 0;
         game.currentGame = [];
         game.playerMoves = [];
     });
     // checking to see addTurn works correctly by calling again to see there should now be 2 elements
     test("addTurn adds a new turn to the game", () => {
         addTurn();
         expect(game.currentGame.length).toBe(2);
     });
     // will be a failing test as lightsOn not yet defined
     test("should add correct class to light up the buttons", () => {
         // calling first element in array, because there will always be at least one
         let button = document.getElementById(game.currentGame[0]);
         lightsOn(game.currentGame[0]);
         expect(button.classList).toContain(game.currentGame[0] + "light");
     });
 });