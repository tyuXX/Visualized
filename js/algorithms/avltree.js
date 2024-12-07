Algorithms.push({
    name: "AVL Tree Operations",
    id: "avlTree",
    description: "Demonstrates AVL tree operations including insertions and rotations to maintain balance.",
    detailedExplanation: `
<h3>AVL Tree</h3>
<p>AVL trees are self-balancing binary search trees where the heights of any two sibling subtrees differ by at most one.</p>

<h4>Key Properties</h4>
<ul>
<li>Balance Factor = Height(Left) - Height(Right)</li>
<li>All nodes must have balance factor -1, 0, or 1</li>
<li>Automatic rebalancing after insertions/deletions</li>
</ul>

<h4>Rotation Types</h4>
<ul>
<li>Left Rotation: Fix right-heavy imbalance</li>
<li>Right Rotation: Fix left-heavy imbalance</li>
<li>Left-Right Rotation: Fix left-right imbalance</li>
<li>Right-Left Rotation: Fix right-left imbalance</li>
</ul>

<h4>Time Complexity</h4>
<ul>
<li>Search: O(log n)</li>
<li>Insert: O(log n)</li>
<li>Delete: O(log n)</li>
</ul>
    `,
    parameters: [
        {
            name: "Number of Nodes",
            id: "nodeCount",
            type: "number",
            default: 8,
            min: 3,
            max: 15
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
        
        // Parameters
        const nodeCount = params.nodeCount || 8;
        const speed = parseInt(params.speed);
        
        // AVL Tree Node
        class AVLNode {
            constructor(value) {
                this.value = value;
                this.left = null;
                this.right = null;
                this.height = 1;
                this.x = 0;
                this.y = 0;
            }
        }
        
        // Get height of node
        function getNodeHeight(node) {
            return node ? node.height : 0;
        }
        
        // Get balance factor
        function getBalance(node) {
            return node ? getNodeHeight(node.left) - getNodeHeight(node.right) : 0;
        }
        
        // Update height
        function updateHeight(node) {
            if (node) {
                node.height = Math.max(getNodeHeight(node.left), getNodeHeight(node.right)) + 1;
            }
        }
        
        // Right rotation
        function rightRotate(y) {
            const x = y.left;
            const T2 = x.right;
            
            x.right = y;
            y.left = T2;
            
            updateHeight(y);
            updateHeight(x);
            
            return x;
        }
        
        // Left rotation
        function leftRotate(x) {
            const y = x.right;
            const T2 = y.left;
            
            y.left = x;
            x.right = T2;
            
            updateHeight(x);
            updateHeight(y);
            
            return y;
        }
        
        // Insert node
        async function insert(node, value) {
            if (!node) {
                return new AVLNode(value);
            }
            
            if (value < node.value) {
                node.left = await insert(node.left, value);
            } else if (value > node.value) {
                node.right = await insert(node.right, value);
            } else {
                return node;
            }
            
            updateHeight(node);
            
            const balance = getBalance(node);
            
            // Left Left Case
            if (balance > 1 && value < node.left.value) {
                explanation.textContent = "Performing Right Rotation";
                await visualizeRotation();
                return rightRotate(node);
            }
            
            // Right Right Case
            if (balance < -1 && value > node.right.value) {
                explanation.textContent = "Performing Left Rotation";
                await visualizeRotation();
                return leftRotate(node);
            }
            
            // Left Right Case
            if (balance > 1 && value > node.left.value) {
                explanation.textContent = "Performing Left-Right Rotation";
                node.left = leftRotate(node.left);
                await visualizeRotation();
                return rightRotate(node);
            }
            
            // Right Left Case
            if (balance < -1 && value < node.right.value) {
                explanation.textContent = "Performing Right-Left Rotation";
                node.right = rightRotate(node.right);
                await visualizeRotation();
                return leftRotate(node);
            }
            
            return node;
        }
        
        // Calculate node positions
        function calculatePositions(node, level, leftBound, rightBound) {
            if (!node) return;
            
            const x = (leftBound + rightBound) / 2;
            const y = level * 60 + 50;
            
            node.x = x;
            node.y = y;
            
            const gap = (rightBound - leftBound) / 2;
            calculatePositions(node.left, level + 1, leftBound, x);
            calculatePositions(node.right, level + 1, x, rightBound);
        }
        
        // Create SVG
        const width = 600;
        const height = 400;
        container.innerHTML = `
            <svg width="${width}" height="${height}" style="background-color: white;">
                <g id="edges"></g>
                <g id="nodes"></g>
            </svg>
        `;
        
        const svg = container.querySelector('svg');
        const edgesGroup = svg.querySelector('#edges');
        const nodesGroup = svg.querySelector('#nodes');
        
        // Draw edges
        function drawEdges(node) {
            if (!node) return;
            
            if (node.left) {
                const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                line.setAttribute('x1', node.x);
                line.setAttribute('y1', node.y);
                line.setAttribute('x2', node.left.x);
                line.setAttribute('y2', node.left.y);
                line.setAttribute('stroke', '#666');
                line.setAttribute('stroke-width', '2');
                line.setAttribute('id', `edge-${node.value}-${node.left.value}`);
                edgesGroup.appendChild(line);
            }
            
            if (node.right) {
                const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                line.setAttribute('x1', node.x);
                line.setAttribute('y1', node.y);
                line.setAttribute('x2', node.right.x);
                line.setAttribute('y2', node.right.y);
                line.setAttribute('stroke', '#666');
                line.setAttribute('stroke-width', '2');
                line.setAttribute('id', `edge-${node.value}-${node.right.value}`);
                edgesGroup.appendChild(line);
            }
            
            drawEdges(node.left);
            drawEdges(node.right);
        }
        
        // Draw nodes
        function drawNodes(node) {
            if (!node) return;
            
            const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            g.setAttribute('id', `node-${node.value}`);
            
            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', node.x);
            circle.setAttribute('cy', node.y);
            circle.setAttribute('r', '20');
            circle.setAttribute('fill', '#2196F3');
            
            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', node.x);
            text.setAttribute('y', node.y);
            text.setAttribute('text-anchor', 'middle');
            text.setAttribute('dominant-baseline', 'middle');
            text.setAttribute('fill', 'white');
            text.textContent = node.value;
            
            const balanceText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            balanceText.setAttribute('x', node.x);
            balanceText.setAttribute('y', node.y - 30);
            balanceText.setAttribute('text-anchor', 'middle');
            balanceText.setAttribute('fill', '#666');
            balanceText.setAttribute('font-size', '12px');
            balanceText.textContent = `h: ${getNodeHeight(node)}`;
            
            g.appendChild(circle);
            g.appendChild(text);
            g.appendChild(balanceText);
            nodesGroup.appendChild(g);
            
            drawNodes(node.left);
            drawNodes(node.right);
        }
        
        // Visualize tree
        function visualizeTree(root) {
            edgesGroup.innerHTML = '';
            nodesGroup.innerHTML = '';
            calculatePositions(root, 0, 0, width);
            drawEdges(root);
            drawNodes(root);
        }
        
        // Visualize rotation
        async function visualizeRotation() {
            await new Promise(resolve => setTimeout(resolve, speed));
        }
        
        // Build AVL tree
        let root = null;
        const values = Array.from({length: nodeCount}, (_, i) => i + 1)
            .sort(() => Math.random() - 0.5);
        
        explanation.textContent = "Building AVL Tree...";
        
        for (const value of values) {
            if (signal.aborted) break;
            
            explanation.textContent = `Inserting value: ${value}`;
            root = await insert(root, value);
            visualizeTree(root);
            await new Promise(resolve => setTimeout(resolve, speed));
        }
        
        explanation.textContent = "AVL Tree construction completed!";
    }
});
