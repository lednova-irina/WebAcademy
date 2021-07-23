//Even or Odd (JavaScript)
function even_or_odd(number) {
  let result;
  if (number % 2 === 0) {
    return (result = "Even");
  }
  return (result = "Odd");
}

//Return Negative
function makeNegative(num) {
  return num <= 0 ? num : -num;

  //   if(num<=0){
  //     return num;
  //   }else{
  //     return -num;
  //   }
}

//Jenny's secret message
function greet(name) {
  if (name === "Johnny") return "Hello, my love!";
  return "Hello, " + name + "!";
}

//Opposites Attract
function lovefunc(flower1, flower2) {
  return !((flower1 % 2 && flower2 % 2) || (!(flower1 % 2) && !(flower2 % 2)));
  //   let result = true;
  // if ((flower1%2 && flower2%2) || (!(flower1%2) && !(flower2%2))){
  //   result = false;
  //   }
  //   return result;
}

//Convert boolean values to strings 'Yes' or 'No'
function boolToWord(bool) {
  return bool ? "Yes" : "No";
  //  if (bool==true){
  //    return 'Yes';
  //  }
  //   return 'No';
}

//Transportation on vacation
function rentalCarCost(d) {
  // Your solution here
  let result;
  if (d < 3) {
    result = d * 40;
  } else if (d >= 3 && d < 7) {
    result = d * 40 - 20;
  } else {
    result = d * 40 - 50;
  }
  return result;
}

//Basic Mathematical Operations
function basicOp(operation, value1, value2) {
  let result;
  if (operation == "+") {
    result = value1 + value2;
  } else if (operation == "-") {
    result = value1 - value2;
  } else if (operation == "*") {
    result = value1 * value2;
  } else {
    result = value1 / value2;
  }

  return result;
}
