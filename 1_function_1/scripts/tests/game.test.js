/**
 * @jest-environment jsdom
 */

 const { game } = require("../game");


 beforeAll(() => {
     let fs = require("fs");
     let fileContents = fs.readFileSync("index.html", "utf-8");
     document.open();
     document.write(fileContents);
     document.close();
 });
 
 // note each of below tests should be run individually
 describe("game object contains correct keys", () => {
     // test to see if eg: score exists...
     // must also ensure eg: score etc exists in game.js
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
     // choices are taken from game object.  using toEqual as we expect array to have values of button1, 2 etc
     test("choices contain correct ids", () => {
         expect(game.choices).toEqual(["button1", "button2", "button3", "button4"]);
     });
 });
 