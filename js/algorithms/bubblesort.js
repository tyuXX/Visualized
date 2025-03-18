Algorithms.push({
  name: translator.translateToActive("bubbleSort_name") || "Bubble Sort",
  id: "bubbleSort",
  description: translator.translateToActive("bubbleSort_description") || "A simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.",
  detailedExplanation: translator.translateToActive("bubbleSort_detailedExplanation"),
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
      (a) => a.id === "bubbleSort"
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

    explanation.innerHTML = `Bubble Sort: Comparing and swapping adjacent elements to sort the array.`;

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

    for (let i = 0; i < arr.length; i++) {
      if (signal.aborted) break;

      for (let j = 0; j < arr.length - i - 1; j++) {
        if (signal.aborted) break;

        // Highlight comparing bars
        bars[j].classList.add("comparing");
        bars[j + 1].classList.add("comparing");

        // Conditional delay based on speed
        await asyncUpdate(speed / 2);

        if (arr[j] > arr[j + 1]) {
          // Swap elements
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];

          // Update bar heights
          bars[j].style.height = `${arr[j] * 3}px`;
          bars[j + 1].style.height = `${arr[j + 1] * 3}px`;

          bars[j].classList.add("swapping");
          bars[j + 1].classList.add("swapping");

          // Conditional delay based on speed
          await asyncUpdate(speed);

          bars[j].classList.remove("swapping");
          bars[j + 1].classList.remove("swapping");
        }

        bars[j].classList.remove("comparing");
        bars[j + 1].classList.remove("comparing");
      }
    }

    // Mark as sorted
    bars.forEach((bar) => bar.classList.add("sorted"));
    explanation.innerHTML = `Bubble Sort Complete! Array is now sorted.`;
  },
});
