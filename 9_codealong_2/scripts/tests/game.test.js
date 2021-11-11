/**
 * @jest-environment jsdom
 */

 const { game, newGame, showScore, addTurn, lightsOn, showTurns, playerTurn } = require("../game");

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
     test("lastButton key exists", () => {
         expect("lastButton" in game).toBe(true);
     });
     test("turnInProgress key exists", () => {
         expect("turnInProgress" in game).toBe(true);
     });
     test("turnInProgress key value is false", () => {
         expect("turnInProgress" in game).toBe(true);
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
     /* expecting turnInProgress to be true while the computer is showing  its turns */
     /* fails because we expected true, but what we actually  got was 'undefined'. Because showTurns
     isn't doing anything with our turnInProgress key at all */
     test("should toggle turnInProgress to true", () => {
         showTurns();
         expect(game.turnInProgress).toBe(true);
     });
     test("showTurns should update game.turnNumber", () => {
         game.turnNumber = 42;
         showTurns();
         expect(game.turnNumber).toBe(0);
     });
     test("should increment the score if the turn is correct", () => {
         game.playerMoves.push(game.currentGame[0]);
         playerTurn();
         expect(game.score).toBe(1);
     });
     /* what about if we click a button  during the computer sequence? 
Well let's add the test to see if  the last button value is being set.
Now remember that last button stores the value  of the last button was clicked. So what we're  
going to do is create a new test here to say that  clicking during the computer sequence should fail.
The first thing that I want  to do is start the computer sequence by calling the showTurns function.
Then, I'm going to reset the game.last button key  so that it should be empty. Now, when I call the  
click function on one of our buttons I'm going  to choose button 2 here, then it should not set  
a value of game.lastButton, there should be  no ID in there if my clicks are disabled.
So in other words, the contents of last  button shouldn't change after we clear it,  
if clicks are disabled. */
// test will fail because buttons are not being clicked
     test("clicking during computer sequence should fail", () => {
         showTurns();
         game.lastButton = "";
         document.getElementById("button2").click();
         expect(game.lastButton).toEqual("");
     });
 });
 

 /* NOTE:  So let's summarize, what have we learned?
Well we've looked at the  principles of software testing,  
and we've learned about test-driven development,  you've seen how to test the DOM and DOM events,  
and how to expose values from functions to make  them testable; even if they don't return a value.
Finally, you've seen how even a small project  can be made more robust with comprehensive tests,  
even if you don't choose to follow a  strict TDD process in your projects,  
it's good to be aware of it for  when you're being interviewed. 
If you go on to study Devops you'll see how  tests are a key part of it and how you can  
automate deployments, so that your projects  will only deploy if all the tests are passing.  */