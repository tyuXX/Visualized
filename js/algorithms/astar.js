Algorithms.push({
    // Modified for translations:
    name: translator.translateToActive("astar_name") || "A* Search",
    id: "astar",
    description: translator.translateToActive("astar_description") || "An informed search algorithm that finds the shortest path between nodes using heuristics.",
    detailedExplanation: translator.translateToActive("astar_detailedExplanation") || `
<h3>A* (A-Star) Pathfinding Algorithm</h3>
<p>A* is an informed search algorithm that combines Dijkstra's algorithm with heuristic search to find the shortest path efficiently.</p>

<h4>Core Concept</h4>
<ul>
<li>Uses both actual distance from start (g-score) and estimated distance to goal (h-score)</li>
<li>f(n) = g(n) + h(n) where f is total cost, g is distance from start, h is estimated distance to goal</li>
<li>Guarantees shortest path when using an admissible heuristic</li>
</ul>

<h4>Algorithm Steps</h4>
<ol>
<li>Start with initial node in open set</li>
<li>Select node with lowest f-score from open set</li>
<li>If goal reached, reconstruct path</li>
<li>Explore neighbors, update scores</li>
<li>Repeat until goal found or no path exists</li>
</ol>

<h4>Time Complexity</h4>
<ul>
<li>Time Complexity: O(b^d) where b is branching factor and d is depth</li>
<li>Space Complexity: O(b^d) to store nodes</li>
</ul>

<h4>Pros and Cons</h4>
<strong>Pros:</strong>
<ul>
<li>Guarantees shortest path</li>
<li>More efficient than Dijkstra's algorithm</li>
<li>Widely used in pathfinding</li>
</ul>

<strong>Cons:</strong>
<ul>
<li>Memory intensive for large spaces</li>
<li>May be slower than simpler algorithms for small spaces</li>
<li>Effectiveness depends on heuristic quality</li>
</ul>
`,
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
        detailedExplanation.innerHTML = Algorithms.find(a => a.id === 'astar').detailedExplanation;
        
        // Use parameters or defaults
        const gridSize = params.gridSize || 10;
        const speed = parseInt(params.speed);
        
        // Create grid
        const grid = Array.from({ length: gridSize }, () => 
            Array.from({ length: gridSize }, () => ({
                f: Infinity,
                g: Infinity,
                h: Infinity,
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
        
        // Manhattan distance heuristic
        const heuristic = (x1, y1, x2, y2) => {
            return Math.abs(x1 - x2) + Math.abs(y1 - y2);
        };
        
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
        
        // Initialize start node
        grid[start.x][start.y].g = 0;
        grid[start.x][start.y].h = heuristic(start.x, start.y, end.x, end.y);
        grid[start.x][start.y].f = grid[start.x][start.y].g + grid[start.x][start.y].h;
        
        // Priority queue for open set
        const openSet = [{
            x: start.x,
            y: start.y,
            f: grid[start.x][start.y].f
        }];
        
        // Possible moves (up, right, down, left)
        const moves = [
            { dx: -1, dy: 0 },
            { dx: 0, dy: 1 },
            { dx: 1, dy: 0 },
            { dx: 0, dy: -1 }
        ];
        
        // A* algorithm
        async function astarSearch() {
            while (openSet.length > 0) {
                if (signal.aborted) return false;
                
                // Get node with lowest f score
                openSet.sort((a, b) => a.f - b.f);
                const current = openSet.shift();
                
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
                    
                    // Calculate new scores
                    const tentativeG = grid[current.x][current.y].g + 1;
                    
                    if (tentativeG < grid[newX][newY].g) {
                        // This path is better
                        grid[newX][newY].parent = { x: current.x, y: current.y };
                        grid[newX][newY].g = tentativeG;
                        grid[newX][newY].h = heuristic(newX, newY, end.x, end.y);
                        grid[newX][newY].f = grid[newX][newY].g + grid[newX][newY].h;
                        
                        // Add to open set if not already there
                        if (!openSet.some(node => node.x === newX && node.y === newY)) {
                            openSet.push({ x: newX, y: newY, f: grid[newX][newY].f });
                            
                            // Visualize open set
                            const neighborCell = document.getElementById(`cell-${newX}-${newY}`);
                            neighborCell.style.backgroundColor = '#81D4FA';
                            await asyncUpdate(speed / 2);
                        }
                    }
                }
            }
            
            return false;
        }
        
        explanation.innerHTML = 'A* Search: Finding optimal path through the grid';
        
        // Start A* search
        const pathFound = await astarSearch();
        
        // Update explanation
        explanation.innerHTML = pathFound 
            ? 'Path found successfully!' 
            : 'No path could be found.';
    }
});
