const Algorithms = [
    {
        name: "Bubble Sort",
        id: "bubbleSort",
        description: "A simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.",
        func: async (signal) => {
            const container = document.getElementById('visualisationDiv');
            const explanation = document.getElementById('explanation');
            
            // Generate random array
            const arr = Array.from({length: 20}, () => Math.floor(Math.random() * 100));
            
            // Create visualization container
            container.innerHTML = `
                <div class="array-container" id="sortContainer">
                    ${arr.map((val, index) => 
                        `<div class="array-bar" style="height:${val * 3}px" data-value="${val}"></div>`
                    ).join('')}
                </div>
            `;
            
            explanation.innerHTML = `Bubble Sort: Comparing and swapping adjacent elements to sort the array.`;
            
            const bars = document.querySelectorAll('.array-bar');
            
            for (let i = 0; i < arr.length; i++) {
                if (signal.aborted) break;
                
                for (let j = 0; j < arr.length - i - 1; j++) {
                    if (signal.aborted) break;
                    
                    // Highlight comparing bars
                    bars[j].classList.add('comparing');
                    bars[j+1].classList.add('comparing');
                    
                    await new Promise(resolve => setTimeout(resolve, 100));
                    
                    if (arr[j] > arr[j + 1]) {
                        // Swap elements
                        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                        
                        // Update bar heights
                        bars[j].style.height = `${arr[j] * 3}px`;
                        bars[j+1].style.height = `${arr[j + 1] * 3}px`;
                        
                        bars[j].classList.add('swapping');
                        bars[j+1].classList.add('swapping');
                        
                        await new Promise(resolve => setTimeout(resolve, 200));
                        
                        bars[j].classList.remove('swapping');
                        bars[j+1].classList.remove('swapping');
                    }
                    
                    bars[j].classList.remove('comparing');
                    bars[j+1].classList.remove('comparing');
                }
            }
            
            // Mark as sorted
            bars.forEach(bar => bar.classList.add('sorted'));
            explanation.innerHTML = `Bubble Sort Complete! Array is now sorted.`;
        }
    },
    {
        name: "Binary Search",
        id: "binarySearch",
        description: "An efficient algorithm for searching a sorted array by repeatedly dividing the search interval in half.",
        func: async (signal) => {
            const container = document.getElementById('visualisationDiv');
            const explanation = document.getElementById('explanation');
            
            // Generate sorted array
            const arr = Array.from({length: 20}, (_, i) => (i + 1) * 5).sort((a, b) => a - b);
            const target = arr[Math.floor(Math.random() * arr.length)];
            
            // Create visualization container
            container.innerHTML = `
                <div class="array-container" id="searchContainer">
                    ${arr.map((val, index) => 
                        `<div class="array-bar" style="height:${val}px" data-value="${val}"></div>`
                    ).join('')}
                </div>
            `;
            
            explanation.innerHTML = `Binary Search: Finding ${target} in a sorted array`;
            
            const bars = document.querySelectorAll('.array-bar');
            
            let left = 0;
            let right = arr.length - 1;
            
            while (left <= right) {
                if (signal.aborted) break;
                
                const mid = Math.floor((left + right) / 2);
                
                // Highlight current search range
                bars.forEach((bar, index) => {
                    bar.classList.remove('comparing', 'swapping');
                    if (index >= left && index <= right) {
                        bar.classList.add('comparing');
                    }
                });
                
                bars[mid].classList.add('swapping');
                
                await new Promise(resolve => setTimeout(resolve, 500));
                
                if (arr[mid] === target) {
                    explanation.innerHTML = `Binary Search: Found ${target} at index ${mid}!`;
                    bars[mid].classList.add('sorted');
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
        }
    }
];