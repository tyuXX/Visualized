const Algorithms = [
    {
        name: "Bubble Sort",
        id: "bubbleSort",
        description: "A simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.",
        detailedExplanation: `
<h3>Bubble Sort Algorithm Explained</h3>
<p>Bubble Sort is one of the simplest sorting algorithms, often used for educational purposes. Here's how it works:</p>

<h4>Core Concept</h4>
<ul>
    <li>Repeatedly steps through the list</li>
    <li>Compares adjacent elements</li>
    <li>Swaps them if they are in the wrong order</li>
</ul>

<h4>Algorithm Steps</h4>
<ol>
    <li>Start with an unsorted array</li>
    <li>Compare the first two elements</li>
    <li>If the first element is larger, swap them</li>
    <li>Move to the next pair of adjacent elements</li>
    <li>Repeat until the end of the array is reached</li>
    <li>After the first pass, the largest element "bubbles up" to the last position</li>
    <li>Repeat the process for the remaining unsorted portion</li>
</ol>

<h4>Time Complexity</h4>
<ul>
    <li>Worst Case: O(n²)</li>
    <li>Best Case: O(n) - when the array is already sorted</li>
    <li>Average Case: O(n²)</li>
</ul>

<h4>Pros and Cons</h4>
<strong>Pros:</strong>
<ul>
    <li>Simple to understand and implement</li>
    <li>Works well for small datasets</li>
    <li>In-place sorting (doesn't require extra space)</li>
</ul>

<strong>Cons:</strong>
<ul>
    <li>Very inefficient for large datasets</li>
    <li>High time complexity</li>
    <li>Many unnecessary swaps</li>
</ul>
        `,
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
            detailedExplanation.innerHTML = Algorithms.find(a => a.id === 'bubbleSort').detailedExplanation;
            
            // Use parameters or defaults
            const arraySize = params.arraySize || 20;
            const speed = parseInt(params.speed);
            
            // Generate random array
            const arr = Array.from({length: arraySize}, () => Math.floor(Math.random() * 100));
            
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
            
            // Async update function with guaranteed screen refresh
            const asyncUpdate = (delay) => {
                return new Promise(resolve => {
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
                    bars[j].classList.add('comparing');
                    bars[j+1].classList.add('comparing');
                    
                    // Conditional delay based on speed
                    await asyncUpdate(speed / 2);
                    
                    if (arr[j] > arr[j + 1]) {
                        // Swap elements
                        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                        
                        // Update bar heights
                        bars[j].style.height = `${arr[j] * 3}px`;
                        bars[j+1].style.height = `${arr[j + 1] * 3}px`;
                        
                        bars[j].classList.add('swapping');
                        bars[j+1].classList.add('swapping');
                        
                        // Conditional delay based on speed
                        await asyncUpdate(speed);
                        
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
        detailedExplanation: `
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
                max: 50
            },
            {
                name: "Max Value",
                id: "maxValue",
                type: "number",
                default: 100,
                min: 10,
                max: 1000
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
            detailedExplanation.innerHTML = Algorithms.find(a => a.id === 'binarySearch').detailedExplanation;
            
            // Use parameters or defaults
            const arraySize = params.arraySize || 20;
            const maxValue = params.maxValue || 100;
            const speed = parseInt(params.speed);
            
            // Generate sorted array
            const arr = Array.from({length: arraySize}, (_, i) => (i + 1) * (maxValue / arraySize)).sort((a, b) => a - b);
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
            
            // Async update function with guaranteed screen refresh
            const asyncUpdate = (delay) => {
                return new Promise(resolve => {
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
                    bar.classList.remove('comparing', 'swapping');
                    if (index >= left && index <= right) {
                        bar.classList.add('comparing');
                    }
                });
                
                bars[mid].classList.add('swapping');
                
                // Conditional delay based on speed
                await asyncUpdate(speed);
                
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
    },
    {
        name: "Quick Sort",
        id: "quickSort",
        description: "An efficient, in-place sorting algorithm that uses divide and conquer strategy.",
        detailedExplanation: `
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
            detailedExplanation.innerHTML = Algorithms.find(a => a.id === 'quickSort').detailedExplanation;
            
            // Use parameters or defaults
            const arraySize = params.arraySize || 20;
            const speed = parseInt(params.speed);
            
            // Generate random array
            const arr = Array.from({length: arraySize}, () => Math.floor(Math.random() * 100));
            
            // Create visualization container
            container.innerHTML = `
                <div class="array-container" id="sortContainer">
                    ${arr.map((val, index) => 
                        `<div class="array-bar" style="height:${val * 3}px" data-value="${val}"></div>`
                    ).join('')}
                </div>
            `;
            
            explanation.innerHTML = `Quick Sort: Partitioning and sorting the array`;
            
            const bars = document.querySelectorAll('.array-bar');
            
            // Async update function with guaranteed screen refresh
            const asyncUpdate = (delay) => {
                return new Promise(resolve => {
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
                    bars[j].classList.add('comparing');
                    bars[high].classList.add('swapping');
                    
                    await asyncUpdate(speed / 2);
                    
                    if (arr[j] < pivot) {
                        i++;
                        
                        // Swap elements
                        [arr[i], arr[j]] = [arr[j], arr[i]];
                        
                        // Update bar heights
                        bars[i].style.height = `${arr[i] * 3}px`;
                        bars[j].style.height = `${arr[j] * 3}px`;
                    }
                    
                    bars[j].classList.remove('comparing');
                }
                
                // Place pivot in correct position
                [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
                
                // Update bar heights
                bars[i + 1].style.height = `${arr[i + 1] * 3}px`;
                bars[high].style.height = `${arr[high] * 3}px`;
                
                bars[high].classList.remove('swapping');
                
                return i + 1;
            }
            
            // Start Quick Sort
            await quickSortVisualize(0, arr.length - 1);
            
            // Mark as sorted
            bars.forEach(bar => bar.classList.add('sorted'));
            explanation.innerHTML = `Quick Sort Complete! Array is now sorted.`;
        }
    },
    {
        name: "Merge Sort",
        id: "mergeSort",
        description: "A divide and conquer algorithm that breaks down an array into smaller subarrays, sorts them, and then merges them back together.",
        detailedExplanation: `
<h3>Merge Sort Algorithm Explained</h3>
<p>Merge Sort is a stable, efficient sorting algorithm that follows the divide-and-conquer approach.</p>

<h4>Core Concept</h4>
<ul>
    <li>Divide the unsorted list into n sublists</li>
    <li>Repeatedly merge sublists to produce new sorted sublists</li>
    <li>Continue until there is only one sublist remaining</li>
</ul>

<h4>Algorithm Steps</h4>
<ol>
    <li>Divide the unsorted array into two halves</li>
    <li>Recursively sort both halves</li>
    <li>Merge the two sorted halves</li>
    <li>Compare elements from both halves</li>
    <li>Place elements in the correct order</li>
</ol>

<h4>Time Complexity</h4>
<ul>
    <li>Worst Case: O(n log n)</li>
    <li>Best Case: O(n log n)</li>
    <li>Average Case: O(n log n)</li>
</ul>

<h4>Pros and Cons</h4>
<strong>Pros:</strong>
<ul>
    <li>Stable sorting algorithm</li>
    <li>Guaranteed O(n log n) time complexity</li>
    <li>Works well for linked lists</li>
</ul>

<strong>Cons:</strong>
<ul>
    <li>Requires additional space O(n)</li>
    <li>Slower for small datasets</li>
    <li>Not in-place sorting</li>
</ul>
        `,
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
            detailedExplanation.innerHTML = Algorithms.find(a => a.id === 'mergeSort').detailedExplanation;
            
            // Use parameters or defaults
            const arraySize = params.arraySize || 20;
            const speed = parseInt(params.speed);
            
            // Generate random array
            const arr = Array.from({length: arraySize}, () => Math.floor(Math.random() * 100));
            
            // Create visualization container
            container.innerHTML = `
                <div class="array-container" id="sortContainer">
                    ${arr.map((val, index) => 
                        `<div class="array-bar" style="height:${val * 3}px" data-value="${val}"></div>`
                    ).join('')}
                </div>
            `;
            
            explanation.innerHTML = `Merge Sort: Dividing and merging the array`;
            
            const bars = document.querySelectorAll('.array-bar');
            
            // Async update function with guaranteed screen refresh
            const asyncUpdate = (delay) => {
                return new Promise(resolve => {
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
                
                let i = 0, j = 0, k = start;
                
                while (i < leftArr.length && j < rightArr.length) {
                    if (signal.aborted) break;
                    
                    // Highlight comparing bars
                    bars[start + i].classList.add('comparing');
                    bars[mid + 1 + j].classList.add('comparing');
                    
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
                    
                    bars[start + i - 1].classList.remove('comparing');
                    bars[mid + 1 + j - 1].classList.remove('comparing');
                    
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
            bars.forEach(bar => bar.classList.add('sorted'));
            explanation.innerHTML = `Merge Sort Complete! Array is now sorted.`;
        }
    }
];