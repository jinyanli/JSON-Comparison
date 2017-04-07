module.exports ={
    compareObj:compareObj,
    compareArray:compareArray,
};

function compareObj(arg1, arg2){
  if(typeof arg1!="object"){
    console.log("arg1 is not obj in compareObj()");
    return false
  }
  if(typeof arg2!="object"){
    console.log("arg2 is not obj compareObj()");
    return false
  }

  var obj1=arg1;
  var obj2=arg2;
  var obj1KeyArray=[];
  var obj2KeyArray=[];

  for(var key in obj1) {
        obj1KeyArray.push(key);
  }

  for(var key in obj2) {
         obj2KeyArray.push(key);
  }

  //compare number of keys
  if(obj1KeyArray.length!=obj2KeyArray.length){
    return false;
  }

  obj1KeyArray.sort();
  obj2KeyArray.sort();

  //compare keys' names of both obj
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
          //compare array element
          if (compareArray(obj1[obj1KeyArray[i]],obj2[obj2KeyArray[i]])===false){
            return false;
          }
        }else if(typeof obj1[obj1KeyArray[i]]==='object'){
          //compare obj element
          if (compareObj(obj1[obj1KeyArray[i]],obj2[obj2KeyArray[i]])===false){
            return false;
          }
        }else{
          //compare primitive type values
          if(obj1[obj1KeyArray[i]]!=obj2[obj2KeyArray[i]]){
            return false;
          }
        }
  }
  return true;
}


function compareArray (arr1, arr2){
  if(!Array.isArray(arr1)){
    console.log("arr1 is not obj in compareArray()");
    return false
  }
  if(!Array.isArray(arr2)){
    console.log("arr2 is not obj compareArray()");
    return false
  }

  arr1.sort();
  arr2.sort();

  if(arr1.length!=arr2.length){
    return false;
  }

  for(var i=0; i<arr1.length;i++){
    //compare element's type
    if(typeof arr1[i]!=typeof arr2[i]){
      return false;
    }
    //compare array element
    if(Array.isArray(arr1[i])){
      if (compareArray(arr1[i],arr2[i])===false){
        return false;
      }
    }else if(typeof arr1[i]==='object'){
      if (compareObj(arr1[i],arr2[i])===false){
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
