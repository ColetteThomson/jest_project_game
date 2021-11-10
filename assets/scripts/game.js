/**
 * @jest-environment jsdom
 */

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
 })