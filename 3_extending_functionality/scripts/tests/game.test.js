/**
 * @jest-environment jsdom
 */

// remember to import functions from game.js in here
 const { game, newGame, showScore } = require("../game");


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
 //newGame object should reset score to zero, clear playerMoves array and currentGame array
 describe("newGame works correctly", () => {
    //using beforeAll here, becuase we want to set up the game state with some fake values to see
    // - if newGame function resets them.  42 is an example value 
    beforeAll(() => {
         game.score = 42;
         // fake data added to playerMoves and currentGame to check that newGame clears it
         game.playerMoves = ["button1", "button2"];
         game.currentGame = ["button1", "button2"];
         document.getElementById("score").innerText = "42";
         newGame();
     });
     // this test will fail because newGame function not written yet
     test("should set game score to zero", () => {
         expect(game.score).toEqual(0);
     });
     test("should display 0 for the element with id of score", () => {
         expect(document.getElementById("score").innerText).toEqual(0);
     });
     // use .length to check value is 0
     test("should clear the player moves array", () => {
         expect(game.playerMoves.length).toBe(0);
     });
     test("should clear the computer sequence array", () => {
         expect(game.currentGame.length).toBe(0);
     });
 });