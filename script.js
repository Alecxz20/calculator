// DOM elements
let result = document.querySelector(".result__number");
const smallResult = document.querySelector(".result__small");
let finished = false;

const clear = document.querySelector(".clear");
const erase = document.querySelector(".delete");

const equal = document.getElementById("=");

const buttons = document.querySelectorAll(".btn");

// Useful functions
function isANumber(item) {
  let result;
  (item.charCodeAt() >= 48 && item.charCodeAt() <= 57) ||
  item.charCodeAt() == 46
    ? (result = true)
    : (result = false);
  return result;
}

function isAnOperator(item) {
  let result;
  item.charCodeAt() == 42 ||
  item.charCodeAt() == 43 ||
  item.charCodeAt() == 45 ||
  item.charCodeAt() == 47
    ? (result = true)
    : (result = false);
  return result;
}

function addNumberToResult(item) {
  if (result.textContent == "0") {
    result.textContent = item;
  } else if (result.textContent != "0") {
    result.textContent += item;
  }
}

function usingOperator(item) {
  if (result.textContent != "0") {
    smallResult.textContent = result.textContent + " " + item;
    smallResult.classList.remove("hidden");
    clearResult();
  }
}

function clearResult() {
  result.textContent = 0;
}
function clearBoth() {
  clearResult();
  smallResult.textContent = 0;
  smallResult.classList.add("hidden");
}

function deleting() {
  if (result.textContent.length == 1) {
    clearResult();
  } else if (result.textContent > 1) {
    result.textContent = result.textContent.substring(
      0,
      result.textContent.length - 1
    );
  }
}

function calculating(symbol, numberA, numberB) {
  if (symbol == "*") {
    return numberA * numberB;
  } else if (symbol == "+") {
    return numberA + numberB;
  } else if (symbol == "-") {
    return numberA - numberB;
  } else if (symbol == "/") {
    return numberA / numberB;
  }
}

function strToNumber(number) {
  if (number.includes(".")) {
    return parseFloat(number);
  } else {
    return parseInt(number);
  }
}

function doMath() {
  if (smallResult.textContent != 0) {
    str = smallResult.textContent;
    str2 = result.textContent;
    const [numberUp, operand] = str.split(" ");
    let numberA, numberB;

    numberA = strToNumber(numberUp);
    numberB = strToNumber(str2);

    const final = calculating(operand, numberA, numberB);
    smallResult.textContent += " " + str2;
    result.textContent = final;

    finished = true;
  }
}

// Key listener
window.addEventListener("keypress", function (item) {
  if (finished) {
    clearBoth();
    finished = false;
  }
  if (isANumber(item.key)) {
    addNumberToResult(item.key);
  } else if (isAnOperator(item.key)) {
    usingOperator(item.key);
  }
});

// BTN touch
buttons.forEach((item) => {
  item.addEventListener("click", (item) => {
    if (finished) {
      clearBoth();
      finished = false;
    }
    if (isANumber(item.currentTarget.textContent)) {
      addNumberToResult(item.currentTarget.textContent);
    } else if (isAnOperator(item.currentTarget.id)) {
      usingOperator(item.currentTarget.id);
    }
  });
});

clear.addEventListener("click", clearBoth);
erase.addEventListener("click", deleting);
equal.addEventListener("click", doMath);
