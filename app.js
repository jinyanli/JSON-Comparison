var fs=require("fs");
var JSONComparsion=require("./JSON-Comparison.js");
var obj1 = JSON.parse(fs.readFileSync("object1.json"));
var obj2 = JSON.parse(fs.readFileSync("object2.json"));

console.log(JSONComparsion.compareObj(obj1,obj2));
