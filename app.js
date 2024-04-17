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

function main() {
  const categorySelect = document.getElementById("category-select");
  const leftSelect = document.getElementById("left-select");
  const rightSelect = document.getElementById("right-select");

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

  //handle right select
  removeAllChild(rightSelect);
  options.forEach((item) => {
    addOption(rightSelect, { value: item, text: units[item] });
  });

  rightSelect.getElementsByTagName("option")[1].selected = "selected";
}
