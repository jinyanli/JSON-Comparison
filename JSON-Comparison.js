var fs=require("fs");

var err=false;
try{
  var obj1 = JSON.parse(fs.readFileSync("object1.jason"));
}catch(e){
  console.log("Error in object1.jason\n");
  console.log(e);
  err=true;
}

try{
  var obj2 = JSON.parse(fs.readFileSync("object2.jason"));
}catch(e){
  console.log("Error in object2.jason\n");
  console.log(e);
}

if(!err){
  if(compareObj(obj1,obj2)){
    console.log("true");
  }else{
    console.log("false");
  }
}



function compareObj(arg1, arg2){
  var obj1=arg1;
  var obj2=arg2;
  var obj1KeyArray=[];
  var obj2KeyArray=[];

  //console.log("Obj1:");
  for(var key in obj1) {
        obj1KeyArray.push(key);
  }

  for(var key in obj2) {
         obj2KeyArray.push(key);
  }

  //compare keys length
  if(obj1KeyArray.length!=obj2KeyArray.length){
    return false;
  }

  obj1KeyArray.sort();
  obj2KeyArray.sort();


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


function compareArray(arr1, arr2){
  arr1.sort();
  arr2.sort();
  if(arr1.length!=arr2.length){
    return false;
  }
  for(var i=0; i<arr1.length;i++){
    //compare type
    if(typeof arr1[i]!=typeof arr2[i]){
      return false;
    }
    //compare if element is array
    if(Array.isArray(arr1[i])){
      if (compareArray(arr1[i],arr2[i])===false){
        return false;
      }
    }else if(typeof arr1[i]==='object'){
      if (compare(arr1[i],arr2[i])===false){
        return false;
      }
    }else{
      if(arr1[i]!=arr2[i]){
        return false;
      }
    }
  }
  return true;
}
