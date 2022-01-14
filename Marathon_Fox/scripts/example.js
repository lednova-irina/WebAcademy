/**
 * получение массива цифр из числа(промокода) для дальнейших вычислений(без преобразования числа или цифр в строку)
 *  */
function getPromoCodeArr(promoCode) {
  // валидация промокода: является ли он числом и состоит ли он из 8 цифр
  if (typeof promoCode === "number" && 9999999 < promoCode < 100000000) {
    let arr = [];
    function toArr(num, n) {
      let result = num % 10;
      let nextNum = Math.floor(num / 10);
      arr.push(result);

      if (n > 1) {
        toArr(nextNum, n - 1);
      }
    }
    toArr(promoCode, 8);
    return arr.reverse();
  } else {
    console.log("Промокод не корректен");
  }
}

/**
 * проверка чисел на нечетность
 */
function isOdd(num) {
  return num % 2 !== 0;
}

/**
 * проверка чисел на четность
 */
function isEven(num) {
  return !isOdd(num);
}

/**
 * реализация пункта 1 и 2: определение дисконта 1000 грн и 2000 грн
 */
function getDiscount1000And2000(code) {
  let firstArr = [];
  let secondArr = [];
  let determinerFound = false;

  for (i = 0; i < code.length - 1; i++) {
    if (isOdd(code[i]) && isOdd(code[i + 1])) {
      if (firstArr.length === 0) {
        firstArr.push(code[i]);
        firstArr.push(code[i + 1]);
        i++;
      } else if (
        secondArr.length === 0 &&
        isOdd(code[i]) &&
        isOdd(code[i + 1]) &&
        determinerFound
      ) {
        secondArr.push(code[i]);
        secondArr.push(code[i + 1]);
        break;
      }
    } else if (isEven(code[i]) && !determinerFound && firstArr.length > 0) {
      determinerFound = true;
    }
  }

  if (firstArr.length > 0 && secondArr.length > 0) {
    if (firstArr[0] < firstArr[1] && secondArr[0] < secondArr[1]) {
      return 2000;
    }
    return 1000;
  } else {
    return 0;
  }
}

/**
 * реализация пункта 3: определение дисконта 100 грн
 */
function getDiscount100(code) {
  let evenSum = 0;
  let oddSum = 0;
  for (i = 0; i < code.length; i++) {
    if (isEven(code[i])) {
      evenSum += code[i];
    } else {
      oddSum += code[i];
    }
  }

  if (evenSum > oddSum) {
    return 100;
  } else {
    return 0;
  }
}

function calculateDiscount(num) {
  const promoCodeArr = getPromoCodeArr(num);
  let discount = getDiscount1000And2000(promoCodeArr);
  if (!discount) {
    discount = getDiscount100(promoCodeArr);
  }
  return discount;
}

const discount = calculateDiscount(00000000);

// testCase {
//   case discount1000: 98736451
//
//   case discount2000: 35805722
//
//   case discount100:22221111 43658721
//
//   case discount0: 00000000
// }

console.log(discount);
