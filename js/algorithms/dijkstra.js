Algorithms.push({
    name: translator.translateToActive("dijkstra_name") || "Dijkstra's Algorithm",
    id: "dijkstra",
    description: translator.translateToActive("dijkstra_description") || "A pathfinding algorithm that finds the shortest path between nodes in a graph.",
    detailedExplanation: translator.translateToActive("dijkstra_detailedExplanation"),
    parameters: [
        {
            name: "Grid Size",
            id: "gridSize",
            type: "number",
            default: 10,
            min: 5,
            max: 20
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
        detailedExplanation.innerHTML = Algorithms.find(a => a.id === 'dijkstra').detailedExplanation;
        
        // Use parameters or defaults
        const gridSize = params.gridSize || 10;
        const speed = parseInt(params.speed);
        
        // Create grid
        const grid = Array.from({ length: gridSize }, () => 
            Array.from({ length: gridSize }, () => ({
                distance: Infinity,
                visited: false,
                isWall: Math.random() < 0.2, // 20% chance of wall
                isPath: false,
                parent: null
            }))
        );
        
        // Set start and end points
        const start = { x: 0, y: 0 };
        const end = { x: gridSize - 1, y: gridSize - 1 };
        
        // Ensure start and end are not walls
        grid[start.x][start.y].isWall = false;
        grid[end.x][end.y].isWall = false;
        
        // Render grid
        container.innerHTML = `
            <div class="grid-container" style="display: grid; grid-template-columns: repeat(${gridSize}, 1fr); gap: 2px; width: 100%; max-width: 600px; margin: 0 auto;">
                ${grid.map((row, x) => 
                    row.map((cell, y) => `
                        <div 
                            id="cell-${x}-${y}" 
                            class="grid-cell ${cell.isWall ? 'wall' : ''}" 
                            style="
                                aspect-ratio: 1;
                                background-color: ${
                                    (x === start.x && y === start.y) ? '#4CAF50' : 
                                    (x === end.x && y === end.y) ? '#F44336' : 
                                    cell.isWall ? '#9E9E9E' : '#E0E0E0'
                                };
                            "
                        ></div>
                    `).join('')
                ).join('')}
            </div>
        `;
        
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
        
        // Initialize distances
        grid[start.x][start.y].distance = 0;
        
        // Priority queue for unvisited nodes
        const unvisited = [];
        for (let x = 0; x < gridSize; x++) {
            for (let y = 0; y < gridSize; y++) {
                if (!grid[x][y].isWall) {
                    unvisited.push({ x, y });
                }
            }
        }
        
        // Possible moves (up, right, down, left)
        const moves = [
            { dx: -1, dy: 0 },
            { dx: 0, dy: 1 },
            { dx: 1, dy: 0 },
            { dx: 0, dy: -1 }
        ];
        
        // Dijkstra's algorithm
        async function dijkstraSearch() {
            while (unvisited.length > 0) {
                if (signal.aborted) return false;
                
                // Get node with smallest distance
                unvisited.sort((a, b) => grid[a.x][a.y].distance - grid[b.x][b.y].distance);
                const current = unvisited.shift();
                
                // If current node is unreachable
                if (grid[current.x][current.y].distance === Infinity) {
                    return false;
                }
                
                // Mark as visited
                grid[current.x][current.y].visited = true;
                
                // Visualize current cell
                const currentCell = document.getElementById(`cell-${current.x}-${current.y}`);
                if (current.x !== start.x || current.y !== start.y) {
                    currentCell.style.backgroundColor = '#2196F3';
                }
                await asyncUpdate(speed);
                
                // Check if reached end
                if (current.x === end.x && current.y === end.y) {
                    // Reconstruct path
                    let pathNode = grid[end.x][end.y];
                    while (pathNode.parent) {
                        const { x, y } = pathNode.parent;
                        if (x !== start.x || y !== start.y) {
                            const pathCell = document.getElementById(`cell-${x}-${y}`);
                            pathCell.style.backgroundColor = '#FF9800';
                            grid[x][y].isPath = true;
                        }
                        pathNode = grid[x][y];
                        await asyncUpdate(speed / 2);
                    }
                    return true;
                }
                
                // Check neighbors
                for (const { dx, dy } of moves) {
                    const newX = current.x + dx;
                    const newY = current.y + dy;
                    
                    // Check bounds and walls
                    if (
                        newX < 0 || newX >= gridSize || 
                        newY < 0 || newY >= gridSize || 
                        grid[newX][newY].isWall ||
                        grid[newX][newY].visited
                    ) {
                        continue;
                    }
                    
                    // Calculate new distance
                    const newDist = grid[current.x][current.y].distance + 1;
                    
                    if (newDist < grid[newX][newY].distance) {
                        // Update distance and parent
                        grid[newX][newY].distance = newDist;
                        grid[newX][newY].parent = { x: current.x, y: current.y };
                        
                        // Visualize updated node
                        const neighborCell = document.getElementById(`cell-${newX}-${newY}`);
                        neighborCell.style.backgroundColor = '#81D4FA';
                        await asyncUpdate(speed / 2);
                    }
                }
            }
            
            return false;
        }
        
        explanation.innerHTML = 'Dijkstra\'s Algorithm: Finding shortest path through the grid';
        
        // Start Dijkstra's search
        const pathFound = await dijkstraSearch();
        
        // Update explanation
        explanation.innerHTML = pathFound 
            ? 'Path found successfully!' 
            : 'No path could be found.';
    }
});
