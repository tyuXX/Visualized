Algorithms.push({
  name: translator.translateToActive("quickSort_name") || "Quick Sort",
  id: "quickSort",
  description: translator.translateToActive("quickSort_description") || "An efficient, in-place sorting algorithm that uses divide and conquer strategy.",
  detailedExplanation: translator.translateToActive("quickSort_detailedExplanation") || `
<h3>Quick Sort Algorithm Explained</h3>
<p>Quick Sort is a highly efficient, divide-and-conquer sorting algorithm that works by selecting a 'pivot' element and partitioning the array around it.</p>

<h4>Core Concept</h4>
<ul>
<li>Choose a pivot element from the array</li>
<li>Partition the array around the pivot</li>
<li>Recursively sort the sub-arrays</li>
</ul>

<h4>Algorithm Steps</h4>
<ol>
<li>Select a pivot (usually the last or first element)</li>
<li>Place the pivot in its correct position</li>
<li>Move smaller elements to the left of the pivot</li>
<li>Move larger elements to the right of the pivot</li>
<li>Recursively apply the same process to sub-arrays</li>
</ol>

<h4>Time Complexity</h4>
<ul>
<li>Worst Case: O(n²) - when the pivot is always the smallest or largest element</li>
<li>Average Case: O(n log n)</li>
<li>Best Case: O(n log n)</li>
</ul>

<h4>Pros and Cons</h4>
<strong>Pros:</strong>
<ul>
<li>Very efficient for large-scale sorting</li>
<li>In-place sorting algorithm</li>
<li>Good cache performance</li>
</ul>

<strong>Cons:</strong>
<ul>
<li>Not stable sorting algorithm</li>
<li>Worst-case time complexity can be poor</li>
<li>Recursive implementation can be complex</li>
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
      (a) => a.id === "quickSort"
    ).detailedExplanation;

    // Use parameters or defaults
    const arraySize = params.arraySize || 20;
    const speed = parseInt(params.speed);

    // Generate random array
    const arr = Array.from({ length: arraySize }, () =>
      Math.floor(Math.random() * 100)
    );

    // Create visualization container
    container.innerHTML = `
            <div class="array-container" id="sortContainer">
                ${arr
                  .map(
                    (val, index) =>
                      `<div class="array-bar" style="height:${
                        val * 3
                      }px" data-value="${val}"></div>`
                  )
                  .join("")}
            </div>
        `;

    explanation.innerHTML = `Quick Sort: Partitioning and sorting the array`;

    const bars = document.querySelectorAll(".array-bar");

    // Async update function with guaranteed screen refresh
    const asyncUpdate = (delay) => {
      return new Promise((resolve) => {
        if (speed === 0) {
          requestAnimationFrame(resolve);
        } else {
          setTimeout(resolve, delay);
        }
      });
    };

    // Quick Sort implementation with visualization
    async function quickSortVisualize(low, high) {
      if (low < high) {
        // Partition the array
        let pivotIndex = await partition(low, high);

        // Recursively sort left and right sub-arrays
        await quickSortVisualize(low, pivotIndex - 1);
        await quickSortVisualize(pivotIndex + 1, high);
      }
    }

    async function partition(low, high) {
      // Choose the rightmost element as pivot
      const pivot = arr[high];
      let i = low - 1;

      for (let j = low; j < high; j++) {
        if (signal.aborted) break;

        // Highlight comparing bars
        bars[j].classList.add("comparing");
        bars[high].classList.add("swapping");

        await asyncUpdate(speed / 2);

        if (arr[j] < pivot) {
          i++;

          // Swap elements
          [arr[i], arr[j]] = [arr[j], arr[i]];

          // Update bar heights
          bars[i].style.height = `${arr[i] * 3}px`;
          bars[j].style.height = `${arr[j] * 3}px`;
        }

        bars[j].classList.remove("comparing");
      }

      // Place pivot in correct position
      [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];

      // Update bar heights
      bars[i + 1].style.height = `${arr[i + 1] * 3}px`;
      bars[high].style.height = `${arr[high] * 3}px`;

      bars[high].classList.remove("swapping");

      return i + 1;
    }

    // Start Quick Sort
    await quickSortVisualize(0, arr.length - 1);

    // Mark as sorted
    bars.forEach((bar) => bar.classList.add("sorted"));
    explanation.innerHTML = `Quick Sort Complete! Array is now sorted.`;
  },
});
