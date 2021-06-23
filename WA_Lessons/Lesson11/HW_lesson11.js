//Lazily executing a function

var make_lazy = function (action, ...args) {
  return function () {
    return action(...args);
  };
};

//Basic JS - Calculating averages
var Calculator = {
  average: function (...args) {
    let sum = 0;

    if (args.length === 0) {
      return 0;
    }
    for (let arg of args) {
      sum += arg;
    }
    return sum / args.length;
  },
};

//Gradually Adding Parameters
function add(...args) {
  let result = 0;
  let i = 1;
  for (let arg of args) {
    result += arg * i;
    i++;
  }
  return result;
}
