const algSelector = document.getElementById("algorithmSelect");
const visualisationDiv = document.getElementById("visualisationDiv");
const parameterContainer = document.getElementById("parameterContainer");
const explanation = document.getElementById("explanation");
const detailedExplanation = document.getElementById("detailedExplanation");
var aborter = null;

//Algorithms
var Algorithms = [];
// Global variables to manage algorithm execution
let currentAlgorithm = null;
let algorithmController = null;

// Populate dropdown and set up initial state
document.addEventListener("DOMContentLoaded", () => {
  const select = document.getElementById("algorithmSelect");
  const startButton = document.getElementById("startButton");
  const stopButton = document.getElementById("stopButton");
  const algorithmsDiv = document.getElementById("algorithms");

  //Load algorithms from JSON file
  fetch("js/algorithms/alg.json")
    .then((response) => response.json())
    .then((data) => {
      const loadPromises = data.map(alg => {
        return new Promise((resolve, reject) => {
          const algorithm = document.createElement("script");
          algorithm.src = `./js/algorithms/${alg}`;
          algorithm.onload = resolve;
          algorithm.onerror = reject;
          algorithm.async = false;
          algorithmsDiv.appendChild(algorithm);
          console.log(`Loading algorithm: ${alg}`);
        });
      });

      // Wait for all scripts to load before calling reloadAlgorithms
      Promise.all(loadPromises)
        .then(() => {
          console.log("All algorithms loaded");
          reloadAlgorithms();
        })
        .catch(error => {
          console.error("Error loading algorithm scripts:", error);
        });
    })
    .catch((error) => {
      console.error("Error loading algorithms:", error);
    });

  // Populate dropdown
  

  // Initial parameter setup
  updateParameterInputs();

  // Add change listener to update parameters and explanations when algorithm changes
  select.addEventListener("change", (e) => {
    const selectedAlgo = Algorithms.find((a) => a.id === e.target.value);

    if (selectedAlgo) {
      explanation.textContent = selectedAlgo.description;
      detailedExplanation.innerHTML = selectedAlgo.detailedExplanation;
    } else {
      // Clear explanations when 'None' is selected using translation key
      explanation.textContent = translator.translateToActive("selectAlgorithmInfo");
      detailedExplanation.innerHTML = "";
      visualisationDiv.innerHTML = "";
      parameterContainer.innerHTML = "";
    }

    updateParameterInputs();
  });

  // Dark Mode Functionality
  const themeToggle = document.getElementById("theme-toggle");

  // Check for saved theme preference
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
  }

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    // Save theme preference
    const isDarkMode = document.body.classList.contains("dark-mode");
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  });
});


function reloadAlgorithms() {
    const select = document.getElementById("algorithmSelect");
    // Update default option with translation key
    select.innerHTML = `<option value="None">${translator.translateToActive("noneOption")}</option>`;
    Algorithms.forEach((alg) => {
        const option = document.createElement("option");
        option.value = alg.id;
        option.textContent = alg.name;
        select.appendChild(option);
      });
    // Dynamically update any new content
    translator.translatePageToActive();
}

// Dynamically generate parameter inputs based on selected algorithm
function updateParameterInputs() {
  // Clear existing parameter inputs
  parameterContainer.innerHTML = "";

  // Find the selected algorithm
  const selectedAlgo = Algorithms.find((alg) => alg.id === algSelector.value);

  // If algorithm has parameters, create inputs for them
  if (selectedAlgo && selectedAlgo.parameters) {
    selectedAlgo.parameters.forEach((param) => {
      const paramDiv = document.createElement("div");
      paramDiv.classList.add("parameter-input");

      const label = document.createElement("label");
      label.textContent = param.name;
      paramDiv.appendChild(label);

      let input;
      if (param.type === "select") {
        input = document.createElement("select");
        param.options.forEach((opt) => {
          const option = document.createElement("option");
          option.value = opt.value;
          option.textContent = opt.label;
          if (opt.value === param.default) {
            option.selected = true;
          }
          input.appendChild(option);
        });
      } else {
        input = document.createElement("input");
        input.type = param.type;
        input.value = param.default;
        input.min = param.min;
        input.max = param.max;
      }

      input.name = param.id;
      paramDiv.appendChild(input);

      parameterContainer.appendChild(paramDiv);
    });
  }
}

// Collect parameter values
function collectParameterValues() {
  const params = {};
  const inputs = parameterContainer.querySelectorAll("input, select");

  inputs.forEach((input) => {
    params[input.name] = input.value;
  });

  return params;
}

// Start algorithm visualization
async function startAlg() {
  // Check if an algorithm is selected; use translation key for alert
  if (algSelector.value === "None") {
    alert(translator.translateToActive("selectAlgorithmFirst"));
    return;
  }

  visualisationDiv.innerHTML = "";
  if (aborter) {
    aborter.abort();
  }
  aborter = new AbortController();

  // Collect parameter values
  const params = collectParameterValues();

  // Find and run the selected algorithm
  const selectedAlgo = Algorithms.find((alg) => alg.id === algSelector.value);

  if (selectedAlgo) {
    await selectedAlgo.func(aborter.signal, params).finally(() => {
      // Re-enable start, disable stop
      startButton.disabled = false;
      stopButton.disabled = true;
    });
  }
}

// Stop current algorithm
function stopAlg() {
  if (aborter) {
    aborter.abort();
  }
}
