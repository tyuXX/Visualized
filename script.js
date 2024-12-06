const algSelector = document.getElementById("algorithmSelect");
const visualisationDiv = document.getElementById("visualisationDiv");
var aborter = null;

// Global variables to manage algorithm execution
let currentAlgorithm = null;
let algorithmController = null;

document.addEventListener('DOMContentLoaded', () => {
    const select = document.getElementById('algorithmSelect');
    const startButton = document.getElementById('startButton');
    const stopButton = document.getElementById('stopButton');
    
    // Populate dropdown
    Algorithms.forEach(algo => {
        const option = document.createElement('option');
        option.value = algo.id;
        option.textContent = algo.name;
        select.appendChild(option);
    });
    
    // Add event listener to update description when algorithm is selected
    select.addEventListener('change', (e) => {
        const selectedAlgo = Algorithms.find(a => a.id === e.target.value);
        document.getElementById('explanation').textContent = selectedAlgo.description;
    });
});

// Start algorithm visualization
async function startAlg(){
    const select = document.getElementById('algorithmSelect');
    const startButton = document.getElementById('startButton');
    const stopButton = document.getElementById('stopButton');
    const visualisationDiv = document.getElementById('visualisationDiv');
    
    // Clear previous visualization
    visualisationDiv.innerHTML = '';
    
    // Find selected algorithm
    currentAlgorithm = Algorithms.find(a => a.id === select.value);
    
    if (currentAlgorithm) {
        // Create abort controller to stop algorithm
        algorithmController = new AbortController();
        
        // Disable start, enable stop
        startButton.disabled = true;
        stopButton.disabled = false;
        
        // Run algorithm
        await currentAlgorithm.func(algorithmController.signal)
            .finally(() => {
                // Re-enable start, disable stop
                startButton.disabled = false;
                stopButton.disabled = true;
            });
    }
}

// Stop current algorithm
function stopAlg() {
    if (algorithmController) {
        algorithmController.abort();
    }
}