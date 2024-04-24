/**
 * Date: 06-03-2024
 * Author: Khalid Hossain
 * Inspired by: Stack learner
 * Description: Color picker tool with vanilla js
 */

window.onload = function () {
  main();
};

const converter = {
  area: {
    name: "Area",
    units: {
      squareKm: "Square kilometre",
      squareM: "Square metre",
      squareMile: "Square mile",
      squareYard: "Square yard",
      squareFoot: "Square foot",
    },
    variants: {
      "squareKm:squareM": {
        formula: "multiply value by 1000000",
        calculation(n) {
          return n * 1000000;
        },
      },
      "squareKm:squareMile": {
        formula: "divide the area value by 2.59",
        calculation(n) {
          return n / 2.59;
        },
      },
      "squareKm:squareYard": {
        formula: "multiply the area value by 1.196e+6",
        calculation(n) {
          return n * Number(1.196e+6);
        },
      },
      "squareKm:squareFoot": {
        formula: "for an approximate result, multiply the area value by 1.076e+7",
        calculation(n) {
          return n * Number(1.076e+7);
        },
      },
    },
  },

  mass: {
    name: "Mass",
    units: {
      tonne: "Tonne",
      kilogram: "Kilogram",
      gram: "Gram",
      milligram: "Milligram",
    },
    variants: {
      "tonne:kilogram": {
        formula: "multiply the mass value by 1000",
        calculation(n) {
          return n * 1000;
        },
      },
      "tonne:gram": {
        formula: "multiply the mass value by 1e+6",
        calculation(n) {
          return n * Number(1e+6);
        },
      },
      "tonne:milligram": {
        formula: "multiply the mass value by 1e+9",
        calculation(n) {
          return n * Number(1e+9);
        },
      },
    },
  },

  length: {
    name: "Length",
    units: {
      kilometer: "Kilometer",
      metre: "Metre",
      centimeter: "Centimeter",
      millimeter: "Millimeter",
    },
    variants: {
      "kilometer:metre": {
        formula: "multiply the length value by 1000",
        calculation(n) {
          return n * 1000;
        },
      },
      "kilometer:centimeter": {
        formula: "multiply the length value by 100000",
        calculation(n) {
          return n * 100000;
        },
      },
      "kilometer:millimeter": {
        formula: "multiply the length value by 1e+6",
        calculation(n) {
          return n * Number(1e+6);
        },
      },
    },
  },

  time: {
    name: "Time",
    units: {
      second: "Second",
      minute: "Minute",
      hour: "Hour",
      day: "Day",
    },
    variants: {
      "second:minute": {
        formula: "divide the time value by 60",
        calculation(n) {
          return n / 60;
        },
      },
      "second:hour": {
        formula: "divide the time value by 3600",
        calculation(n) {
          return n / 3600;
        },
      },
      "second:day": {
        formula: "divide the time value by 86400",
        calculation(n) {
          return n / 86400;
        },
      },
    },
  },

  // volume: {
  //   name: "Volume",
  // },
  // dataTransferRate: {
  //   name: "Data Transfer Rate",
  // },
};

let lastLeftSelectedValue = "";
let lastRightSelectedValue = "";

function main() {
  const categorySelect = document.getElementById("category-select");
  const leftSelect = document.getElementById("left-select");
  const rightSelect = document.getElementById("right-select");
  const leftInput = document.getElementById("left-input");
  const rightInput = document.getElementById("right-input");

  const convertKeys = Object.keys(converter).sort();
  removeAllChild(categorySelect);
  convertKeys.forEach((item) => {
    addOption(categorySelect, { value: item, text: converter[item].name });
  });

  //Set default selected item
  updateCategoryChanges(categorySelect, leftSelect, rightSelect);

  categorySelect.addEventListener("change", function () {
    updateCategoryChanges(categorySelect, leftSelect, rightSelect);
  });


  //Left input input value change event listener
  leftInput.addEventListener("keyup", function(event) {
    if(event.target.value && !isNaN(event.target.value)) {
      const converterName = categorySelect.value;
      const variants = converter[converterName].variants;
      const variantKey = `${leftSelect.value}:${rightSelect.value}`;
      const variant = variants[variantKey];
      leftInput.value = Number(event.target.value);
      rightInput.value = variant.calculation(Number(event.target.value));
    } else {
      rightInput.value = '';
    }
  });

  //Right input input value change event listener
  rightInput.addEventListener("keyup", function(event) {
    if(event.target.value && !isNaN(event.target.value)) {
      const converterName = categorySelect.value;
      const variants = converter[converterName].variants;
      const variantKey = `${leftSelect.value}:${rightSelect.value}`;
      const variant = variants[variantKey];
      rightInput.value = Number(event.target.value);
      leftInput.value = variant.calculation(Number(event.target.value));
    } else {
      leftInput.value = '';
    }
  });

  //Left select box option change event listener
  leftSelect.addEventListener("change", function (event) {
    if (event.target.value === rightSelect.value) {
      const options = rightSelect.getElementsByTagName("option");
      for (let i = 0; i < options.length; i++) {
        if (lastLeftSelectedValue == options[i].value) {
          options[i].selected = "selected";
          lastRightSelectedValue = options[i].value;
          break;
        }
      }
    }
    lastLeftSelectedValue = event.target.value;
    calculateValue(categorySelect, leftSelect, rightSelect);
  });

  //Right select box option change event listener
  rightSelect.addEventListener("change", function (event) {
    if (event.target.value === leftSelect.value) {
      const options = leftSelect.getElementsByTagName("option");
      for (let i = 0; i < options.length; i++) {
        if (lastRightSelectedValue === options[i].value) {
          options[i].selected = "selected";
          lastLeftSelectedValue = options[i].value;
          break;
        }
      }
    }
    lastRightSelectedValue = event.target.value;
    calculateValue(categorySelect, leftSelect, rightSelect);
  });
}

//Add item
function addOption(parent, option) {
  const opt = document.createElement("option");
  opt.setAttribute("value", option.value);
  opt.innerText = option.text;
  parent.appendChild(opt);
}

//Remove item
function removeAllChild(parent) {
  while (parent.firstChild) {
    parent.firstChild.remove();
  }
}

//Category items update
function updateCategoryChanges(categorySelect, leftSelect, rightSelect) {
  const converterName = categorySelect.value;
  const units = converter[converterName].units;
  const options = Object.keys(units);

  //handle left select
  removeAllChild(leftSelect);
  options.forEach((item) => {
    addOption(leftSelect, { value: item, text: units[item] });
  });
  lastLeftSelectedValue = leftSelect.value;

  //handle right select
  removeAllChild(rightSelect);
  options.forEach((item) => {
    addOption(rightSelect, { value: item, text: units[item] });
  });

  rightSelect.getElementsByTagName("option")[1].selected = "selected";
  lastRightSelectedValue = rightSelect.value;

  calculateValue(categorySelect, leftSelect, rightSelect);
}

//Calculate value function
function calculateValue(categorySelect, leftSelect, rightSelect) {
  const leftInput = document.getElementById("left-input");
  const rightInput = document.getElementById("right-input");
  const formulaText = document.getElementById("formula-text");

  const converterName = categorySelect.value;
  const variants = converter[converterName].variants;
  const variantKey = `${leftSelect.value}:${rightSelect.value}`;
  const variant = variants[variantKey];
  formulaText.innerText = variant.formula;
  leftInput.value = 1;
  rightInput.value = variant.calculation(1);
}
