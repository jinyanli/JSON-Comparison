var fs=require("fs");
var obj1 = JSON.parse(fs.readFileSync("object1.jason"));
var obj2 = JSON.parse(fs.readFileSync("object2.jason"));

if(compareObj(obj1,obj2)){
  console.log("true");
}else{
  console.log("false");
}


function compareObj(arg1, arg2){
  var obj1=arg1;
  var obj2=arg2;
  var obj1KeyArray=[];
  var obj2KeyArray=[];

  //console.log("Obj1:");
  for(var key in obj1) {
        obj1KeyArray.push(key);
        //console.log("key:"+key +", value:"+obj1[key]);
  }
  //console.log("\n");
  //console.log("Obj2:");
  for(var key in obj2) {
         obj2KeyArray.push(key);
         //console.log("key:"+key +", value:"+obj2[key]);
  }
  //console.log("----------------------------------------------------");
  //compare keys length
  if(obj1KeyArray.length!=obj2KeyArray.length){
    return false;
  }

  obj1KeyArray.sort();
  obj2KeyArray.sort();
  //console.log(obj1KeyArray);
  //console.log(obj2KeyArray);

  //compare keys names
  for(var i=0; i<obj1KeyArray.length;i++){
      if(obj1KeyArray[i]!=obj2KeyArray[i]){
        return false;
      }
    }

  //compare value of each key
  for(var i=0; i<obj1KeyArray.length;i++){
        //compare type
        if(typeof obj1[obj1KeyArray[i]]!=typeof obj2[obj2KeyArray[i]]){
          return false;
        }

        if(Array.isArray(obj1[obj1KeyArray[i]])){
          //compare array
          if (compareArray(obj1[obj1KeyArray[i]],obj2[obj2KeyArray[i]])===false){
            return false;
          }
        }else if(typeof obj1[obj1KeyArray[i]]==='object'){
          //compare obj
          if (compareObj(obj1[obj1KeyArray[i]],obj2[obj2KeyArray[i]])===false){
            return false;
          }
        }else{
          //compare primitive values
          if(obj1[obj1KeyArray[i]]!=obj2[obj2KeyArray[i]]){
            return false;
          }
        }
  }
  return true;
}

//console.log(compareArray([1,2,[1,2,3,[1,2,3,4,[3,4]]]],[1,2,[1,2,3,[1,2,3,4,[3,4]]]]));
function compareArray(arr1, arr2){
  arr1.sort();
  arr2.sort();
  if(arr1.length!=arr2.length){
    //console.log("flag1");
    return false;
  }
  for(var i=0; i<arr1.length;i++){
    //compare type
    if(typeof arr1[i]!=typeof arr2[i]){
      //console.log("flag3");
      return false;
    }
    //compare if element is array
    if(Array.isArray(arr1[i])){
      //console.log("recursion");
      if (compareArray(arr1[i],arr2[i])===false){
        //console.log("flag3");
        return false;
      }
    }else if(typeof arr1[i]==='object'){
      if (compare(arr1[i],arr2[i])===false){
        //console.log("flag3");
        return false;
      }
    }else{
      if(arr1[i]!=arr2[i]){
        //console.log("flag4");
        //console.log(arr1[i]);
        //console.log(arr2[i]);
        return false;
      }
    }
  }
  return true;
}
