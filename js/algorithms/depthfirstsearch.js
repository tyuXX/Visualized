Algorithms.push({
    name: translator.translateToActive("depthFirstSearch_name") || "Depth First Search",
    id: "depthFirstSearch",
    description: translator.translateToActive("depthFirstSearch_description") || "A graph traversal algorithm that explores as far as possible along each branch before backtracking.",
    detailedExplanation: translator.translateToActive("depthFirstSearch_detailedExplanation"),
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
        detailedExplanation.innerHTML = Algorithms.find(a => a.id === 'depthFirstSearch').detailedExplanation;
        
        // Use parameters or defaults
        const gridSize = params.gridSize || 10;
        const speed = parseInt(params.speed);
        
        // Create grid
        const grid = Array.from({ length: gridSize }, () => 
            Array.from({ length: gridSize }, () => ({
                visited: false,
                isWall: Math.random() < 0.2, // 20% chance of wall
                isPath: false
            }))
        );
        
        // Set start and end points
        const start = { x: 0, y: 0 };
        const end = { x: gridSize - 1, y: gridSize - 1 };
        
        grid[start.x][start.y].visited = false;
        grid[end.x][end.y].visited = false;
        
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
        
        // Get cell elements
        const cellElements = document.querySelectorAll('.grid-cell');
        
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
        
        // DFS Pathfinding
        async function depthFirstSearchPathfinding(x, y, path = []) {
            // Check bounds and wall
            if (
                x < 0 || x >= gridSize || 
                y < 0 || y >= gridSize || 
                grid[x][y].visited || 
                grid[x][y].isWall
            ) {
                return false;
            }
            
            // Mark as visited
            grid[x][y].visited = true;
            path.push({ x, y });
            
            // Visualize current cell
            const currentCell = document.getElementById(`cell-${x}-${y}`);
            currentCell.style.backgroundColor = '#2196F3';
            await asyncUpdate(speed);
            
            // Reached end
            if (x === end.x && y === end.y) {
                // Mark path
                path.forEach(({ x, y }) => {
                    const pathCell = document.getElementById(`cell-${x}-${y}`);
                    pathCell.style.backgroundColor = '#FF9800';
                    grid[x][y].isPath = true;
                });
                return true;
            }
            
            // Possible moves (up, right, down, left)
            const moves = [
                { dx: -1, dy: 0 },
                { dx: 0, dy: 1 },
                { dx: 1, dy: 0 },
                { dx: 0, dy: -1 }
            ];
            
            // Try each move
            for (let { dx, dy } of moves) {
                if (signal.aborted) break;
                
                const newX = x + dx;
                const newY = y + dy;
                
                if (await depthFirstSearchPathfinding(newX, newY, path)) {
                    return true;
                }
            }
            
            // Backtrack
            path.pop();
            
            // Check if there are any valid moves left
            const hasValidMoves = moves.some(({ dx, dy }) => {
                const newX = x + dx;
                const newY = y + dy;
                return !(
                    newX < 0 || newX >= gridSize || 
                    newY < 0 || newY >= gridSize || 
                    grid[newX][newY].visited || 
                    grid[newX][newY].isWall
                );
            });

            if (!grid[x][y].isPath && !hasValidMoves) { // Only change color if no valid moves and not part of final path
                currentCell.style.backgroundColor = '#FFEB3B'; // Yellow for dead ends
            } else if (!grid[x][y].isPath) {
                currentCell.style.backgroundColor = '#E0E0E0'; // Reset to default if not a dead end
            }
            await asyncUpdate(speed / 2);
            
            return false;
        }
        
        explanation.innerHTML = 'Depth-First Search: Finding path through the grid';
        
        // Start DFS
        const pathFound = await depthFirstSearchPathfinding(start.x, start.y);
        
        // Update explanation
        explanation.innerHTML = pathFound 
            ? 'Path found successfully!' 
            : 'No path could be found.';
    }
});