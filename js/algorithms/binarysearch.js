Algorithms.push({
  // Modified for translations:
  name: translator.translateToActive("binarySearch_name") || "Binary Search",
  id: "binarySearch",
  description: translator.translateToActive("binarySearch_description") || "An efficient algorithm for searching a sorted array by repeatedly dividing the search interval in half.",
  detailedExplanation: translator.translateToActive("binarySearch_detailedExplanation") || `
<h3>Binary Search Algorithm Explained</h3>
<p>Binary Search is a highly efficient algorithm for finding an element in a sorted array. Here's how it works:</p>

<h4>Core Concept</h4>
<ul>
<li>Works only on sorted arrays</li>
<li>Repeatedly divides the search interval in half</li>
<li>Eliminates half of the remaining elements at each step</li>
</ul>

<h4>Algorithm Steps</h4>
<ol>
<li>Start with a sorted array</li>
<li>Find the middle element of the array</li>
<li>Compare the target value with the middle element</li>
<li>If target equals middle, search is successful</li>
<li>If target is less than middle, search the left half</li>
<li>If target is greater than middle, search the right half</li>
<li>Repeat until the target is found or search space is empty</li>
</ol>

<h4>Time Complexity</h4>
<ul>
<li>Worst Case: O(log n)</li>
<li>Best Case: O(1) - when the middle element is the target</li>
<li>Average Case: O(log n)</li>
</ul>

<h4>Pros and Cons</h4>
<strong>Pros:</strong>
<ul>
<li>Extremely fast for large sorted datasets</li>
<li>Logarithmic time complexity</li>
<li>Much more efficient than linear search</li>
</ul>

<strong>Cons:</strong>
<ul>
<li>Requires the array to be sorted first</li>
<li>Not suitable for unsorted arrays</li>
<li>Less efficient for small arrays</li>
</ul>
    `,
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
