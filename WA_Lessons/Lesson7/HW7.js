// task 1.3
function multipleOfK(k, n) {
  const result = [];
  for (let i = 1; i <= n; i++) {
    if (i % k === 0) {
      result.push(i);
    }
  }
  return result;
}
console.log(multipleOfK(3, 57));

//Take a Ten Minute Walk
function isValidWalk(walk) {
  const walkTime = 10;
  let horizontalPosition = 0;
  let verticalPosition = 0;
  if (walk.length !== walkTime) {
    return false;
  }
  for (let i = 0; i < walk.length; i++) {
    if (walk[i] === "w") {
      horizontalPosition--;
    }
    if (walk[i] === "e") {
      horizontalPosition++;
    }
    if (walk[i] === "s") {
      verticalPosition--;
    }
    if (walk[i] === "n") {
      verticalPosition++;
    }
  }

  return verticalPosition == 0 && horizontalPosition == 0;
}
