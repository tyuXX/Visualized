Algorithms.push({
  // Modified for translations:
  name: translator.translateToActive("binarySearch_name") || "Binary Search",
  id: "binarySearch",
  description: translator.translateToActive("binarySearch_description") || "An efficient algorithm for searching a sorted array by repeatedly dividing the search interval in half.",
  detailedExplanation: translator.translateToActive("binarySearch_detailedExplanation"),
  parameters: [
    {
      name: "Array Size",
      id: "arraySize",
      type: "number",
      default: 20,
      min: 5,
      max: 50,
    },
    {
      name: "Max Value",
      id: "maxValue",
      type: "number",
      default: 100,
      min: 10,
      max: 1000,
    },
    {
      name: "Visualization Speed",
      id: "speed",
      type: "select",
      default: "500",
      options: [
        { value: "1000", label: "Slow" },
        { value: "500", label: "Medium" },
        { value: "100", label: "Fast" },
        { value: "0", label: "Fastest" },
      ],
    },
  ],
  func: async (signal, params) => {
    const container = document.getElementById("visualisationDiv");
    const explanation = document.getElementById("explanation");
    const detailedExplanation = document.getElementById("detailedExplanation");

    // Set detailed explanation
    detailedExplanation.innerHTML = Algorithms.find(
      (a) => a.id === "binarySearch"
    ).detailedExplanation;

    // Use parameters or defaults
    const arraySize = params.arraySize || 20;
    const maxValue = params.maxValue || 100;
    const speed = parseInt(params.speed);

    // Generate sorted array
    const arr = Array.from(
      { length: arraySize },
      (_, i) => (i + 1) * (maxValue / arraySize)
    ).sort((a, b) => a - b);
    const target = arr[Math.floor(Math.random() * arr.length)];

    // Create visualization container
    container.innerHTML = `
            <div class="array-container" id="searchContainer">
                ${arr
                  .map(
                    (val, index) =>
                      `<div class="array-bar" style="height:${val}px" data-value="${val}"></div>`
                  )
                  .join("")}
            </div>
        `;

    explanation.innerHTML = `Binary Search: Finding ${target} in a sorted array`;

    const bars = document.querySelectorAll(".array-bar");

    // Async update function with guaranteed screen refresh
    const asyncUpdate = (delay) => {
      return new Promise((resolve) => {
        if (speed === 0) {
          // Use requestAnimationFrame for fastest option
          requestAnimationFrame(resolve);
        } else {
          // Use setTimeout for other speeds
          setTimeout(resolve, delay);
        }
      });
    };

    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
      if (signal.aborted) break;

      const mid = Math.floor((left + right) / 2);

      // Highlight current search range
      bars.forEach((bar, index) => {
        bar.classList.remove("comparing", "swapping");
        if (index >= left && index <= right) {
          bar.classList.add("comparing");
        }
      });

      bars[mid].classList.add("swapping");

      // Conditional delay based on speed
      await asyncUpdate(speed);

      if (arr[mid] === target) {
        explanation.innerHTML = `Binary Search: Found ${target} at index ${mid}!`;
        bars[mid].classList.add("sorted");
        break;
      }

      if (arr[mid] < target) {
        left = mid + 1;
        explanation.innerHTML = `Binary Search: Target is in the right half`;
      } else {
        right = mid - 1;
        explanation.innerHTML = `Binary Search: Target is in the left half`;
      }
    }

    if (left > right) {
      explanation.innerHTML = `Binary Search: ${target} not found in the array`;
    }
  },
});
