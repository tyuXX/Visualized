Algorithms.push({
    name: translator.translateToActive("selectionSort_name") || "Selection Sort",
    id: "selectionSort",
    description: translator.translateToActive("selectionSort_description") || "A simple sorting algorithm that repeatedly finds the minimum element from the unsorted portion.",
    detailedExplanation: translator.translateToActive("selectionSort_detailedExplanation"),
    parameters: [
        {
            name: "Array Size",
            id: "arraySize",
            type: "number",
            default: 20,
            min: 5,
            max: 50
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
                { value: "0", label: "Fastest" }
            ]
        }
    ],
    func: async (signal, params) => {
        const container = document.getElementById('visualisationDiv');
        const explanation = document.getElementById('explanation');
        const detailedExplanation = document.getElementById('detailedExplanation');
        
        // Set detailed explanation
        detailedExplanation.innerHTML = Algorithms.find(a => a.id === 'selectionSort').detailedExplanation;
        
        // Use parameters or defaults
        const arraySize = params.arraySize || 20;
        const speed = parseInt(params.speed);
        
        // Create array of random numbers
        const array = Array.from({ length: arraySize }, () => Math.floor(Math.random() * 100));
        const maxVal = Math.max(...array);
        
        // Create visualization container
        container.innerHTML = `
            <div class="array-container" style="display: flex; align-items: flex-end; height: 300px; gap: 2px;">
                ${array.map((val, idx) => `
                    <div 
                        id="bar-${idx}"
                        style="
                            flex: 1;
                            height: ${(val / maxVal) * 100}%;
                            background-color: #2196F3;
                            transition: height 0.3s ease;
                        "
                    ></div>
                `).join('')}
            </div>
        `;
        
        // Get bar elements
        const bars = array.map((_, idx) => document.getElementById(`bar-${idx}`));
        
        // Async update function
        const asyncUpdate = (delay) => {
            return new Promise(resolve => {
                if (speed === 0) {
                    requestAnimationFrame(resolve);
                } else {
                    setTimeout(resolve, delay);
                }
            });
        };
        
        // Helper function to update bar heights
        const updateBar = (idx, height) => {
            array[idx] = height;
            bars[idx].style.height = `${(height / maxVal) * 100}%`;
        };
        
        // Selection Sort
        async function selectionSort() {
            for (let i = 0; i < array.length - 1; i++) {
                if (signal.aborted) return;
                
                // Mark current position
                bars[i].style.backgroundColor = '#F44336';
                
                let minIdx = i;
                
                // Find minimum element
                for (let j = i + 1; j < array.length; j++) {
                    if (signal.aborted) return;
                    
                    // Highlight current comparison
                    bars[j].style.backgroundColor = '#FF9800';
                    await asyncUpdate(speed);
                    
                    if (array[j] < array[minIdx]) {
                        // Reset previous minimum
                        if (minIdx !== i) {
                            bars[minIdx].style.backgroundColor = '#2196F3';
                        }
                        minIdx = j;
                        bars[minIdx].style.backgroundColor = '#4CAF50';
                    } else {
                        bars[j].style.backgroundColor = '#2196F3';
                    }
                }
                
                // Swap elements if needed
                if (minIdx !== i) {
                    // Perform swap
                    const temp = array[i];
                    updateBar(i, array[minIdx]);
                    updateBar(minIdx, temp);
                    
                    await asyncUpdate(speed);
                }
                
                // Mark sorted position
                bars[i].style.backgroundColor = '#4CAF50';
            }
            
            // Mark last element as sorted
            bars[array.length - 1].style.backgroundColor = '#4CAF50';
        }
        
        explanation.innerHTML = 'Selection Sort: Finding minimum element and placing it in sorted position';
        
        // Start Selection Sort
        await selectionSort();
        
        // Update explanation
        explanation.innerHTML = 'Array sorted successfully!';
    }
});
