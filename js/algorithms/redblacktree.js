Algorithms.push({
    name: translator.translateToActive("redBlackTree_name") || "Red-Black Tree Operations",
    id: "redBlackTree",
    description: translator.translateToActive("redBlackTree_description") || "Demonstrates Red-Black tree operations including insertions and color adjustments to maintain balance.",
    detailedExplanation: translator.translateToActive("redBlackTree_detailedExplanation"),
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
        
        // Red-Black Tree Node
        class RBNode {
            constructor(value) {
                this.value = value;
                this.left = null;
                this.right = null;
                this.parent = null;
                this.color = 'RED';  // New nodes are always red
                this.x = 0;
                this.y = 0;
            }
        }
        
        class RedBlackTree {
            constructor() {
                this.root = null;
                this.NIL = new RBNode(null);
                this.NIL.color = 'BLACK';
            }
            
            // Left rotation
            async leftRotate(x) {
                const y = x.right;
                x.right = y.left;
                
                if (y.left !== this.NIL) {
                    y.left.parent = x;
                }
                
                y.parent = x.parent;
                
                if (x.parent === null) {
                    this.root = y;
                } else if (x === x.parent.left) {
                    x.parent.left = y;
                } else {
                    x.parent.right = y;
                }
                
                y.left = x;
                x.parent = y;
                
                await this.visualize("Performing Left Rotation");
            }
            
            // Right rotation
            async rightRotate(y) {
                const x = y.left;
                y.left = x.right;
                
                if (x.right !== this.NIL) {
                    x.right.parent = y;
                }
                
                x.parent = y.parent;
                
                if (y.parent === null) {
                    this.root = x;
                } else if (y === y.parent.left) {
                    y.parent.left = x;
                } else {
                    y.parent.right = x;
                }
                
                x.right = y;
                y.parent = x;
                
                await this.visualize("Performing Right Rotation");
            }
            
            // Fix Red-Black tree violations after insertion
            async fixInsert(k) {
                while (k.parent && k.parent.color === 'RED') {
                    if (k.parent === k.parent.parent.left) {
                        const y = k.parent.parent.right;
                        
                        if (y && y.color === 'RED') {
                            k.parent.color = 'BLACK';
                            y.color = 'BLACK';
                            k.parent.parent.color = 'RED';
                            k = k.parent.parent;
                            await this.visualize("Color Flip");
                        } else {
                            if (k === k.parent.right) {
                                k = k.parent;
                                await this.leftRotate(k);
                            }
                            
                            k.parent.color = 'BLACK';
                            k.parent.parent.color = 'RED';
                            await this.rightRotate(k.parent.parent);
                        }
                    } else {
                        const y = k.parent.parent.left;
                        
                        if (y && y.color === 'RED') {
                            k.parent.color = 'BLACK';
                            y.color = 'BLACK';
                            k.parent.parent.color = 'RED';
                            k = k.parent.parent;
                            await this.visualize("Color Flip");
                        } else {
                            if (k === k.parent.left) {
                                k = k.parent;
                                await this.rightRotate(k);
                            }
                            
                            k.parent.color = 'BLACK';
                            k.parent.parent.color = 'RED';
                            await this.leftRotate(k.parent.parent);
                        }
                    }
                    
                    if (k === this.root) {
                        break;
                    }
                }
                
                this.root.color = 'BLACK';
                await this.visualize("Fixed Violations");
            }
            
            // Insert a new node
            async insert(value) {
                const node = new RBNode(value);
                node.left = this.NIL;
                node.right = this.NIL;
                
                let y = null;
                let x = this.root;
                
                while (x !== null && x !== this.NIL) {
                    y = x;
                    if (node.value < x.value) {
                        x = x.left;
                    } else {
                        x = x.right;
                    }
                }
                
                node.parent = y;
                
                if (y === null) {
                    this.root = node;
                } else if (node.value < y.value) {
                    y.left = node;
                } else {
                    y.right = node;
                }
                
                await this.visualize(`Inserted ${value}`);
                await this.fixInsert(node);
            }
            
            // Calculate node positions for visualization
            calculatePositions(node, level, leftBound, rightBound) {
                if (node === null || node === this.NIL) return;
                
                const x = (leftBound + rightBound) / 2;
                const y = level * 60 + 50;
                
                node.x = x;
                node.y = y;
                
                const gap = (rightBound - leftBound) / 2;
                this.calculatePositions(node.left, level + 1, leftBound, x);
                this.calculatePositions(node.right, level + 1, x, rightBound);
            }
            
            // Visualize the tree
            async visualize(message) {
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
                
                this.calculatePositions(this.root, 0, 0, width);
                
                // Draw edges
                const drawEdges = (node) => {
                    if (node === null || node === this.NIL) return;
                    
                    if (node.left !== this.NIL) {
                        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                        line.setAttribute('x1', node.x);
                        line.setAttribute('y1', node.y);
                        line.setAttribute('x2', node.left.x);
                        line.setAttribute('y2', node.left.y);
                        line.setAttribute('stroke', '#666');
                        line.setAttribute('stroke-width', '2');
                        edgesGroup.appendChild(line);
                    }
                    
                    if (node.right !== this.NIL) {
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
                };
                
                // Draw nodes
                const drawNodes = (node) => {
                    if (node === null || node === this.NIL) return;
                    
                    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                    circle.setAttribute('cx', node.x);
                    circle.setAttribute('cy', node.y);
                    circle.setAttribute('r', '20');
                    circle.setAttribute('fill', node.color === 'RED' ? '#f44336' : '#2196F3');
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
                };
                
                drawEdges(this.root);
                drawNodes(this.root);
                
                explanation.textContent = message;
                await new Promise(resolve => setTimeout(resolve, speed));
            }
        }
        
        // Create and build Red-Black tree
        const tree = new RedBlackTree();
        const values = Array.from({length: nodeCount}, (_, i) => i + 1)
            .sort(() => Math.random() - 0.5);
        
        explanation.textContent = "Building Red-Black Tree...";
        
        for (const value of values) {
            if (signal.aborted) break;
            await tree.insert(value);
        }
        
        explanation.textContent = "Red-Black Tree construction completed!";
    }
});
