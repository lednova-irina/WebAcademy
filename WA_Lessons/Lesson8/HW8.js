// task 3
function getPeople1(handshake) {
    let peopleAmount = 0;
  
    for (; handshake > 0; handshake -= peopleAmount) {
      peopleAmount++;
    }
    return peopleAmount;
  }
  
  console.log(getPeople1(1)); // 1
  console.log(getPeople1(3)); // 2
  console.log(getPeople1(6)); // 3
  console.log(getPeople1(10)); // 4
  console.log(getPeople1(15)); // 5
  console.log(getPeople1(120)); // ?
  
  function getPeople2(handshake) {
    let peopleAmount = 0;
    while (handshake > 0) {
      peopleAmount++;
      handshake -= peopleAmount;
    }
    return peopleAmount;
  }
  console.log(getPeople2(1)); // 1
  console.log(getPeople2(3)); // 2
  console.log(getPeople2(6)); // 3
  console.log(getPeople2(10)); // 4
  console.log(getPeople2(15)); // 5
  console.log(getPeople2(120)); // ?