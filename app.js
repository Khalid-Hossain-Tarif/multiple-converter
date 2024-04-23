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
        formula: "multiply the length value by 1000",
        calculation(n) {
          return n * 1000;
        },
      },
      "squareKm:squareMile": {
        formula: "for an approximate result, divide the length value by 2.59",
        calculation(n) {
          return n / 2.59;
        },
      },
      "squareKm:squareYard": {
        formula: "multiply the area value by 1196000",
        calculation(n) {
          return n * 1196000;
        },
      },
      "squareKm:squareFoot": {
        formula: "multiply the length value by 10760000",
        calculation(n) {
          return n * 10760000;
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
  },

  length: {
    name: "Length",
    units: {
      kilometre: "Kilometre",
      metre: "Metre",
      centimetre: "Centimetre",
      millimetre: "Millimetre",
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
  const leftInput = document.getElementById("left-input");
  const rightInput = document.getElementById("right-input");
  const formulaText = document.getElementById("formula-text");
  const leftSelect = document.getElementById("left-select");
  const rightSelect = document.getElementById("right-select");

  const convertKeys = Object.keys(converter).sort();
  removeAllChild(categorySelect);
  convertKeys.forEach((item) => {
    addOption(categorySelect, { value: item, text: converter[item].name });
  });

  //Set default selected item
  updateCategoryChanges(categorySelect, leftSelect, rightSelect);

  const converterName = categorySelect.value;
  const variants = converter[converterName].variants;
  const variantKey = `${leftSelect.value}:${rightSelect.value}`;
  const variant = variants[variantKey];
  formulaText.innerText = variant.formula;
  leftInput.value = 1;
  rightInput.value = variant.calculation(1);

  categorySelect.addEventListener("change", function () {
    updateCategoryChanges(categorySelect, leftSelect, rightSelect);
  });

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
  });

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
}
