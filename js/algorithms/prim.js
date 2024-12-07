Algorithms.push({
    name: "Prim's Algorithm",
    id: "prim",
    description: "Finds a minimum spanning tree in a weighted, undirected graph.",
    detailedExplanation: `
<h3>Prim's Algorithm</h3>
<p>Prim's algorithm finds a minimum spanning tree in a weighted, undirected graph by growing a tree one edge at a time.</p>

<h4>Core Concept</h4>
<ul>
<li>Starts from arbitrary vertex</li>
<li>Grows tree by adding cheapest edge to unvisited vertex</li>
<li>Continues until all vertices are connected</li>
</ul>

<h4>Algorithm Steps</h4>
<ol>
<li>Start with any vertex</li>
<li>Find cheapest edge to unvisited vertex</li>
<li>Add vertex to tree</li>
<li>Update edge costs to remaining vertices</li>
<li>Repeat until all vertices included</li>
</ol>

<h4>Time Complexity</h4>
<ul>
<li>Time Complexity: O(E log V) with binary heap</li>
<li>Space Complexity: O(V)</li>
</ul>

<h4>Pros and Cons</h4>
<strong>Pros:</strong>
<ul>
<li>Finds optimal spanning tree</li>
<li>Efficient for dense graphs</li>
<li>Simple to implement</li>
</ul>

<strong>Cons:</strong>
<ul>
<li>Not suitable for disconnected graphs</li>
<li>Requires all edges to be known</li>
<li>May be slower than Kruskal's for sparse graphs</li>
</ul>
    `,
    parameters: [
        {
            name: "Grid Size",
            id: "gridSize",
            type: "number",
            default: 8,
            min: 5,
            max: 15
        },
        {
            name: "Edge Density",
            id: "density",
            type: "number",
            default: 30,
            min: 20,
            max: 80
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
        detailedExplanation.innerHTML = Algorithms.find(a => a.id === 'prim').detailedExplanation;
        
        // Use parameters or defaults
        const gridSize = params.gridSize || 8;
        const density = params.density || 30;
        const speed = parseInt(params.speed);
        
        // Create vertices
        const vertices = [];
        for (let i = 0; i < gridSize; i++) {
            const x = Math.cos(2 * Math.PI * i / gridSize) * 150 + 200;
            const y = Math.sin(2 * Math.PI * i / gridSize) * 150 + 200;
            vertices.push({ x, y, id: i });
        }
        
        // Create random edges with weights
        const edges = [];
        for (let i = 0; i < gridSize; i++) {
            for (let j = i + 1; j < gridSize; j++) {
                if (Math.random() * 100 < density) {
                    const weight = Math.floor(Math.random() * 90) + 10; // weight between 10 and 99
                    edges.push({
                        from: i,
                        to: j,
                        weight: weight
                    });
                }
            }
        }
        
        // Create SVG container
        container.innerHTML = `
            <svg width="400" height="400" style="background-color: white;">
                <g id="edges"></g>
                <g id="vertices"></g>
                <g id="labels"></g>
            </svg>
        `;
        
        const svg = container.querySelector('svg');
        const edgesGroup = svg.querySelector('#edges');
        const verticesGroup = svg.querySelector('#vertices');
        const labelsGroup = svg.querySelector('#labels');
        
        // Draw initial graph
        edges.forEach(edge => {
            const v1 = vertices[edge.from];
            const v2 = vertices[edge.to];
            
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', v1.x);
            line.setAttribute('y1', v1.y);
            line.setAttribute('x2', v2.x);
            line.setAttribute('y2', v2.y);
            line.setAttribute('stroke', '#CCCCCC');
            line.setAttribute('stroke-width', '2');
            line.id = `edge-${edge.from}-${edge.to}`;
            edgesGroup.appendChild(line);
            
            // Add weight label
            const labelX = (v1.x + v2.x) / 2;
            const labelY = (v1.y + v2.y) / 2;
            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', labelX);
            text.setAttribute('y', labelY);
            text.setAttribute('text-anchor', 'middle');
            text.setAttribute('dominant-baseline', 'middle');
            text.setAttribute('fill', '#666666');
            text.textContent = edge.weight;
            text.id = `weight-${edge.from}-${edge.to}`;
            labelsGroup.appendChild(text);
        });
        
        vertices.forEach(vertex => {
            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', vertex.x);
            circle.setAttribute('cy', vertex.y);
            circle.setAttribute('r', '15');
            circle.setAttribute('fill', '#2196F3');
            circle.id = `vertex-${vertex.id}`;
            verticesGroup.appendChild(circle);
            
            const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            label.setAttribute('x', vertex.x);
            label.setAttribute('y', vertex.y);
            label.setAttribute('text-anchor', 'middle');
            label.setAttribute('dominant-baseline', 'middle');
            label.setAttribute('fill', 'white');
            label.textContent = vertex.id;
            verticesGroup.appendChild(label);
        });
        
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
        
        // Prim's Algorithm
        async function primMST() {
            const visited = new Set();
            const mst = new Set();
            
            // Start with vertex 0
            visited.add(0);
            document.getElementById(`vertex-${0}`).setAttribute('fill', '#4CAF50');
            
            while (visited.size < vertices.length) {
                if (signal.aborted) return;
                
                let minEdge = null;
                let minWeight = Infinity;
                
                // Find minimum weight edge from visited to unvisited vertices
                edges.forEach(edge => {
                    const isFromVisited = visited.has(edge.from);
                    const isToVisited = visited.has(edge.to);
                    
                    // Edge must connect visited to unvisited vertex
                    if ((isFromVisited && !isToVisited) || (!isFromVisited && isToVisited)) {
                        const edgeElement = document.getElementById(`edge-${edge.from}-${edge.to}`);
                        edgeElement.setAttribute('stroke', '#FF9800');
                        
                        if (edge.weight < minWeight) {
                            if (minEdge) {
                                // Reset previous minimum edge
                                const prevEdge = document.getElementById(`edge-${minEdge.from}-${minEdge.to}`);
                                if (!mst.has(`${minEdge.from}-${minEdge.to}`)) {
                                    prevEdge.setAttribute('stroke', '#CCCCCC');
                                }
                            }
                            minWeight = edge.weight;
                            minEdge = edge;
                            
                            // Highlight current minimum edge
                            edgeElement.setAttribute('stroke', '#F44336');
                        }
                    }
                });
                
                await asyncUpdate(speed);
                
                if (minEdge) {
                    // Add edge to MST
                    const edgeKey = `${minEdge.from}-${minEdge.to}`;
                    mst.add(edgeKey);
                    
                    // Add unvisited vertex to visited set
                    const newVertex = visited.has(minEdge.from) ? minEdge.to : minEdge.from;
                    visited.add(newVertex);
                    
                    // Update visualization
                    const edgeElement = document.getElementById(`edge-${minEdge.from}-${minEdge.to}`);
                    edgeElement.setAttribute('stroke', '#4CAF50');
                    edgeElement.setAttribute('stroke-width', '3');
                    
                    const vertexElement = document.getElementById(`vertex-${newVertex}`);
                    vertexElement.setAttribute('fill', '#4CAF50');
                    
                    await asyncUpdate(speed);
                } else {
                    // No valid edge found - graph might be disconnected
                    break;
                }
            }
            
            return visited.size === vertices.length;
        }
        
        explanation.innerHTML = 'Prim\'s Algorithm: Finding minimum spanning tree';
        
        // Start Prim's algorithm
        const success = await primMST();
        
        // Update explanation
        explanation.innerHTML = success 
            ? 'Minimum spanning tree found successfully!' 
            : 'Could not find spanning tree - graph might be disconnected.';
    }
});
