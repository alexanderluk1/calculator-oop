export default class Calculator {
  constructor(primaryOperandDisplay, secondaryOperandDisplay, operator) {
    this.primaryOperandDisplay = primaryOperandDisplay;
    this.secondaryOperandDisplay = secondaryOperandDisplay;
    this.operatorDisplay = operator;
    this.allClear();
  }

  // --- Getter & Setters ---
  get primaryOperand() {
    return this.primaryOperandDisplay.textContent;
  }

  set primaryOperand(value) {
    this.primaryOperandDisplay.textContent = value;
  }

  get secondaryOperand() {
    return this.secondaryOperandDisplay.textContent;
  }

  set secondaryOperand(value) {
    this.secondaryOperandDisplay.textContent = value;
  }

  get operator() {
    return this.operatorDisplay.textValue;
  }

  set operator(value) {
    this.operatorDisplay.textValue = value;
  }

  #operatorDict = {
    "+": (a, b) => a + b,
    "-": (a, b) => b - a,
    "*": (a, b) => a * b,
    "÷": (a, b) => b / a,
  };

  addDigit(num) {
    if (num === "." && this.primaryOperand.includes(".")) return;
    if (this.primaryOperand === "0") this.primaryOperand = num;
    else {
      this.primaryOperand += num.toString();
      this.primaryOperand = this.#formatNumber(this.primaryOperand);
    }
  }

  addOperation(operation) {
    this.secondaryOperand = this.primaryOperand;
    this.operator = operation;
    this.primaryOperand = 0;
  }

  removeDigit() {
    if (this.primaryOperand.length <= 1) {
      this.primaryOperand = "0";
      return;
    }
    if (this.#checkEdgeCase(2)) return;
    let num = this.#formatNumber(this.primaryOperand);
    this.primaryOperand = this.#formatNumber(num.slice(0, num.length - 1));
  }

  allClear() {
    this.primaryOperand = 0;
    this.secondaryOperand = "";
    this.operator = "";
  }

  evaluate() {
    if (this.#checkEdgeCase(1)) return;
    let firstNum = this.#convertBackToNum(this.primaryOperand);
    let secondNum = this.#convertBackToNum(this.secondaryOperand);
    const result = this.#operatorDict
      [this.operator](firstNum, secondNum)
      .toFixed(1);
    this.allClear();
    this.primaryOperand = this.#formatNumber(result.toString());
  }

  // --- Helper function to format the number ---
  #formatNumber(num) {
    if (num.includes(".")) {
      return num.toLocaleString();
    }
    return this.#convertBackToNum(num).toLocaleString();
  }

  #convertBackToNum(num) {
    return parseFloat(this.#removeComma(num));
  }

  #removeComma(num) {
    return num.replace(/,/g, "");
  }

  #checkEdgeCase(version) {
    if (version === 1) {
      if (
        this.primaryOperand === "" ||
        this.primaryOperand === "0" ||
        this.secondaryOperand === ""
      )
        return true;
    }
    if (version === 2) {
      if (this.primaryOperand === "" || this.primaryOperand === "0")
        return true;
    }
  }
}
