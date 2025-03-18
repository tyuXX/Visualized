Algorithms.push({
    // Modified for translations:
    name: translator.translateToActive("binaryTreeTraversal_name") || "Binary Tree Traversals",
    id: "binaryTreeTraversal",
    description: translator.translateToActive("binaryTreeTraversal_description") || "Demonstrates in-order, pre-order, and post-order traversals of a binary tree.",
    detailedExplanation: translator.translateToActive("binaryTreeTraversal_detailedExplanation") || `
<h3>Binary Tree Traversals</h3>
<p>Binary tree traversal is the process of visiting each node in a binary tree exactly once in a specific order.</p>

<h4>Types of Traversals</h4>
<ul>
<li><strong>In-order (LNR):</strong> Left subtree, Node, Right subtree</li>
<li><strong>Pre-order (NLR):</strong> Node, Left subtree, Right subtree</li>
<li><strong>Post-order (LRN):</strong> Left subtree, Right subtree, Node</li>
</ul>

<h4>Common Applications</h4>
<ul>
<li>In-order: Get sorted elements from BST</li>
<li>Pre-order: Copy/serialize tree structure</li>
<li>Post-order: Delete nodes/cleanup memory</li>
</ul>

<h4>Time Complexity</h4>
<ul>
<li>Time Complexity: O(n) for all traversals</li>
<li>Space Complexity: O(h) where h is height</li>
</ul>
    `,
    parameters: [
        {
            name: "Tree Size",
            id: "treeSize",
            type: "number",
            default: 7,
            min: 3,
            max: 15
        },
        {
            name: "Traversal Type",
            id: "traversalType",
            type: "select",
            default: "inorder",
            options: [
                { value: "inorder", label: "In-order" },
                { value: "preorder", label: "Pre-order" },
                { value: "postorder", label: "Post-order" }
            ]
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
        const treeSize = params.treeSize || 7;
        const traversalType = params.traversalType || 'inorder';
        const speed = parseInt(params.speed);
        
        // Create a binary tree node
        class TreeNode {
            constructor(value) {
                this.value = value;
                this.left = null;
                this.right = null;
                this.x = 0;
                this.y = 0;
            }
        }
        
        // Create a balanced binary tree
        function createBalancedTree(values, start, end) {
            if (start > end) return null;
            
            const mid = Math.floor((start + end) / 2);
            const node = new TreeNode(values[mid]);
            
            node.left = createBalancedTree(values, start, mid - 1);
            node.right = createBalancedTree(values, mid + 1, end);
            
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
        
        // Create SVG element
        const width = 600;
        const height = 400;
        container.innerHTML = `
            <svg width="${width}" height="${height}" style="background-color: white;">
                <g id="edges"></g>
                <g id="nodes"></g>
            </svg>
            <div id="traversal-order" style="margin-top: 20px; font-family: monospace;"></div>
        `;
        
        const svg = container.querySelector('svg');
        const edgesGroup = svg.querySelector('#edges');
        const nodesGroup = svg.querySelector('#nodes');
        const traversalOrder = container.querySelector('#traversal-order');
        
        // Create tree
        const values = Array.from({length: treeSize}, (_, i) => i + 1);
        const root = createBalancedTree(values, 0, values.length - 1);
        calculatePositions(root, 0, 0, width);
        
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
                edgesGroup.appendChild(line);
            }
            
            drawEdges(node.left);
            drawEdges(node.right);
        }
        
        // Draw nodes
        function drawNodes(node) {
            if (!node) return;
            
            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', node.x);
            circle.setAttribute('cy', node.y);
            circle.setAttribute('r', '20');
            circle.setAttribute('fill', '#2196F3');
            circle.setAttribute('id', `node-${node.value}`);
            nodesGroup.appendChild(circle);
            
            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', node.x);
            text.setAttribute('y', node.y);
            text.setAttribute('text-anchor', 'middle');
            text.setAttribute('dominant-baseline', 'middle');
            text.setAttribute('fill', 'white');
            text.textContent = node.value;
            nodesGroup.appendChild(text);
            
            drawNodes(node.left);
            drawNodes(node.right);
        }
        
        // Draw initial tree
        drawEdges(root);
        drawNodes(root);
        
        // Highlight node
        async function highlightNode(value, color) {
            const node = document.getElementById(`node-${value}`);
            node.setAttribute('fill', color);
            await new Promise(resolve => setTimeout(resolve, speed));
        }
        
        // Traversal functions
        async function inorderTraversal(node) {
            if (!node || signal.aborted) return;
            
            await inorderTraversal(node.left);
            await highlightNode(node.value, '#4CAF50');
            traversalOrder.textContent += ` ${node.value}`;
            await inorderTraversal(node.right);
        }
        
        async function preorderTraversal(node) {
            if (!node || signal.aborted) return;
            
            await highlightNode(node.value, '#4CAF50');
            traversalOrder.textContent += ` ${node.value}`;
            await preorderTraversal(node.left);
            await preorderTraversal(node.right);
        }
        
        async function postorderTraversal(node) {
            if (!node || signal.aborted) return;
            
            await postorderTraversal(node.left);
            await postorderTraversal(node.right);
            await highlightNode(node.value, '#4CAF50');
            traversalOrder.textContent += ` ${node.value}`;
        }
        
        // Start traversal
        traversalOrder.textContent = "Traversal Order:";
        explanation.textContent = `Performing ${traversalType} traversal...`;
        
        if (traversalType === 'inorder') {
            await inorderTraversal(root);
        } else if (traversalType === 'preorder') {
            await preorderTraversal(root);
        } else {
            await postorderTraversal(root);
        }
        
        explanation.textContent = `${traversalType} traversal completed!`;
    }
});
