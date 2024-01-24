export default class Calculator {
  constructor(primaryOperand, secondaryOperand, operator) {
    this.primaryOperand = primaryOperand;
    this.secondaryOperand = secondaryOperand;
    this.operator = operator;
    this.allClear();
  }

  #operatorDict = {
    "+": (a, b) => a + b,
    "-": (a, b) => b - a,
    "*": (a, b) => a * b,
    "÷": (a, b) => b / a,
  };

  addDigit(num) {
    if (this.primaryOperand.textContent === ".")
      this.primaryOperand.textContent = "0.";
    if (this.primaryOperand.textContent === "0")
      this.primaryOperand.textContent = num;
    else {
      this.primaryOperand.textContent += num;
      this.primaryOperand.textContent = this.#formatNumber(
        this.primaryOperand.textContent
      );
    }
  }

  addOperation(operation) {
    this.secondaryOperand.textContent = this.primaryOperand.textContent;
    this.operator.textContent = operation;
    this.primaryOperand.textContent = 0;
  }

  removeDigit() {
    if (this.primaryOperand.textContent.length <= 1) {
      this.primaryOperand.textContent = "0";
      return;
    }
    if (this.#checkEdgeCase(2)) return;
    let num = this.#formatNumber(this.primaryOperand.textContent);
    this.primaryOperand.textContent = this.#formatNumber(
      num.slice(0, num.length - 1)
    );
  }

  allClear() {
    this.primaryOperand.textContent = 0;
    this.secondaryOperand.textContent = "";
    this.operator.textContent = "";
  }

  evaluate() {
    if (this.#checkEdgeCase(1)) return;
    let firstNum = this.#convertBackToNum(this.primaryOperand.textContent);
    let secondNum = this.#convertBackToNum(this.secondaryOperand.textContent);
    const result = this.#operatorDict[this.operator.textContent](
      firstNum,
      secondNum
    );
    this.allClear();
    this.primaryOperand.textContent = this.#formatNumber(result.toString());
  }

  // --- Helper function to format the number ---
  #formatNumber(num) {
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
        this.primaryOperand.textContent === "" ||
        this.primaryOperand.textContent === "0" ||
        this.secondaryOperand.textContent === ""
      )
        return true;
    }
    if (version === 2) {
      if (
        this.primaryOperand.textContent === "" ||
        this.primaryOperand.textContent === "0"
      )
        return true;
    }
  }
}
