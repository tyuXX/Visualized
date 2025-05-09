Algorithms.push({
  // Modified for translations:
  name: translator.translateToActive("mergeSort_name") || "Merge Sort",
  id: "mergeSort",
  description: translator.translateToActive("mergeSort_description") || "A divide and conquer algorithm that divides an array, sorts subarrays, and merges them back together.",
  detailedExplanation: translator.translateToActive("mergeSort_detailedExplanation"),
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
      (a) => a.id === "mergeSort"
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

    explanation.innerHTML = `Merge Sort: Dividing and merging the array`;

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

    // Merge Sort implementation with visualization
    async function mergeSortVisualize(start, end) {
      if (start >= end) return;

      const mid = Math.floor((start + end) / 2);

      // Recursively sort left and right halves
      await mergeSortVisualize(start, mid);
      await mergeSortVisualize(mid + 1, end);

      // Merge the sorted halves
      await merge(start, mid, end);
    }

    async function merge(start, mid, end) {
      const leftArr = arr.slice(start, mid + 1);
      const rightArr = arr.slice(mid + 1, end + 1);

      let i = 0,
        j = 0,
        k = start;

      while (i < leftArr.length && j < rightArr.length) {
        if (signal.aborted) break;

        // Highlight comparing bars
        bars[start + i].classList.add("comparing");
        bars[mid + 1 + j].classList.add("comparing");

        await asyncUpdate(speed / 2);

        if (leftArr[i] <= rightArr[j]) {
          arr[k] = leftArr[i];
          bars[k].style.height = `${leftArr[i] * 3}px`;
          i++;
        } else {
          arr[k] = rightArr[j];
          bars[k].style.height = `${rightArr[j] * 3}px`;
          j++;
        }

        bars[start + i - 1].classList.remove("comparing");
        bars[mid + 1 + j - 1].classList.remove("comparing");

        k++;
      }

      // Handle remaining elements
      while (i < leftArr.length) {
        arr[k] = leftArr[i];
        bars[k].style.height = `${leftArr[i] * 3}px`;
        i++;
        k++;
      }

      while (j < rightArr.length) {
        arr[k] = rightArr[j];
        bars[k].style.height = `${rightArr[j] * 3}px`;
        j++;
        k++;
      }
    }

    // Start Merge Sort
    await mergeSortVisualize(0, arr.length - 1);

    // Mark as sorted
    bars.forEach((bar) => bar.classList.add("sorted"));
    explanation.innerHTML = `Merge Sort Complete! Array is now sorted.`;
  },
});
