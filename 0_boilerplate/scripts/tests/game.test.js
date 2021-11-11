//standard text 
const { beforeAll } = require("jest-circus");

//first entry...
 beforeAll(() => {
     //load Node standard fs library
     let fs = require("fs");
     //load index.html into Jest's mock DOM to set up our DOM before all other tests are run
     let fileContents = fs.readFileSync("index.html", "utf-8");
     //open our document, write file contents and then close document
     document.open();
     document.write(fileContents);
     document.close();
 });
 
 //1st failing test to check if score key exists.  separate into blocks using 'describe'
 describe("game object contains correct keys", () => {
    //test 1: if game object contains a key called score 
    test("score key exists", () => {
        //so expect score to be in game - is not so test will fail
         expect("score" in game).toBe(true);
     })
 }); //run: npm test  - after each 'test' block