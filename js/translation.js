import { Translator, Language, setActiveLanguage } from "https://tyuxx.github.io/tyuLIB/lib/ddcTranslate/translator.js";

var translator = new Translator([
    new Language("English", "en-us", {
        "toggleTheme": "Toggle Dark Mode",
        "start": "Start",
        "stop": "Stop",
        "refreshAlgorithms": "Refresh Algorithms",
        // Keys for script.js
        "selectAlgorithmInfo": "Select an algorithm to begin",
        "selectAlgorithmFirst": "Please select an algorithm first!",
        "noneOption": "None",
        // Algorithm translations for English
        "selectionSort_name": "Selection Sort",
        "selectionSort_description": "A simple sorting algorithm that repeatedly finds the minimum element from the unsorted portion.",
        "selectionSort_detailedExplanation": `
<h3>Selection Sort Algorithm</h3>
<p>Selection Sort works by repeatedly finding the minimum element from the unsorted portion and placing it at the beginning.</p>

<h4>Core Concept</h4>
<ul>
<li>Divides array into sorted and unsorted portions</li>
<li>Repeatedly finds minimum in unsorted portion</li>
<li>Swaps minimum with first unsorted element</li>
</ul>

<h4>Algorithm Steps</h4>
<ol>
<li>Find minimum element in unsorted array</li>
<li>Swap it with first unsorted position</li>
<li>Move boundary of sorted portion right</li>
<li>Repeat until array is sorted</li>
</ol>

<h4>Time Complexity</h4>
<ul>
<li>Time Complexity: O(n²)</li>
<li>Space Complexity: O(1)</li>
</ul>

<h4>Pros and Cons</h4>
<strong>Pros:</strong>
<ul>
<li>Simple to understand and implement</li>
<li>Works well on small arrays</li>
<li>Minimal memory usage</li>
</ul>

<strong>Cons:</strong>
<ul>
<li>Quadratic time complexity</li>
<li>Not suitable for large datasets</li>
<li>Does not adapt to data characteristics</li>
</ul>
    `,
        "quickSort_name": "Quick Sort",
        "quickSort_description": "An efficient, in-place sorting algorithm that uses divide and conquer strategy.",
        "quickSort_detailedExplanation": `
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
        "redBlackTree_name": "Red-Black Tree Operations",
        "redBlackTree_description": "Demonstrates Red-Black tree operations including insertions and color adjustments.",
        "redBlackTree_detailedExplanation": `
<h3>Red-Black Tree</h3>
<p>Red-Black trees are self-balancing binary search trees that use node coloring to maintain balance.</p>

<h4>Properties</h4>
<ul>
<li>Every node is either red or black</li>
<li>Root is always black</li>
<li>No two adjacent red nodes</li>
<li>Every path from root to null has same number of black nodes</li>
</ul>

<h4>Operations</h4>
<ul>
<li>Color Flips: Change parent and children colors</li>
<li>Rotations: Similar to AVL tree rotations</li>
<li>Recoloring: Maintain red-black properties</li>
</ul>

<h4>Time Complexity</h4>
<ul>
<li>Search: O(log n)</li>
<li>Insert: O(log n)</li>
<li>Delete: O(log n)</li>
</ul>
    `,
        "prim_name": "Prim's Algorithm",
        "prim_description": "Finds a minimum spanning tree in a weighted, undirected graph.",
        "prim_detailedExplanation": `
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
        "dijkstra_name": "Dijkstra's Algorithm",
        "dijkstra_description": "A pathfinding algorithm that finds the shortest path in a graph.",
        "dijkstra_detailedExplanation": `
<h3>Dijkstra's Algorithm</h3>
<p>Dijkstra's algorithm finds the shortest path between nodes in a graph by maintaining a set of unvisited nodes and continuously updating their distances.</p>

<h4>Core Concept</h4>
<ul>
<li>Maintains a set of unvisited nodes</li>
<li>Updates distances as shorter paths are found</li>
<li>Always selects the unvisited node with smallest distance</li>
</ul>

<h4>Algorithm Steps</h4>
<ol>
<li>Mark all nodes unvisited with infinite distance</li>
<li>Set start node distance to 0</li>
<li>Select unvisited node with smallest distance</li>
<li>Update neighbors' distances if shorter path found</li>
<li>Mark current node as visited</li>
<li>Repeat until destination reached</li>
</ol>

<h4>Time Complexity</h4>
<ul>
<li>Time Complexity: O((V + E) log V) with binary heap</li>
<li>Space Complexity: O(V)</li>
</ul>

<h4>Pros and Cons</h4>
<strong>Pros:</strong>
<ul>
<li>Guarantees shortest path</li>
<li>Works with weighted edges</li>
<li>Simple to implement</li>
</ul>

<strong>Cons:</strong>
<ul>
<li>Slower than A* for pathfinding</li>
<li>Explores in all directions</li>
<li>Not suitable for negative weights</li>
</ul>
    `,
        "depthFirstSearch_name": "Depth First Search",
        "depthFirstSearch_description": "A graph traversal algorithm that explores as far as possible before backtracking.",
        "depthFirstSearch_detailedExplanation": `
<h3>Depth-First Search (DFS) Pathfinding Algorithm</h3>
<p>Depth-First Search is a fundamental graph traversal algorithm that explores as deeply as possible along each branch before backtracking.</p>

<h4>Core Concept</h4>
<ul>
<li>Start at a chosen node (root)</li>
<li>Explore as far as possible along each branch before backtracking</li>
<li>Uses a stack or recursion to keep track of nodes to visit</li>
</ul>

<h4>Algorithm Steps</h4>
<ol>
<li>Start at the initial node</li>
<li>Mark the current node as visited</li>
<li>Explore an unvisited adjacent node</li>
<li>Recursively apply the same process</li>
<li>Backtrack when no unvisited nodes remain</li>
</ol>

<h4>Time Complexity</h4>
<ul>
<li>Time Complexity: O(V + E), where V is the number of vertices and E is the number of edges</li>
<li>Space Complexity: O(V) due to the recursion stack</li>
</ul>

<h4>Pros and Cons</h4>
<strong>Pros:</strong>
<ul>
<li>Memory efficient for deep graphs</li>
<li>Can be used to detect cycles</li>
<li>Useful for topological sorting</li>
</ul>

<strong>Cons:</strong>
<ul>
<li>May get stuck in infinite loops with cyclic graphs</li>
<li>Not guaranteed to find the shortest path</li>
<li>Can be slow for wide, shallow graphs</li>
</ul>
    `,
        "bubbleSort_name": "Bubble Sort",
        "bubbleSort_description": "A simple sorting algorithm that repeatedly compares and swaps adjacent elements.",
        "bubbleSort_detailedExplanation": `
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
        "binaryTreeTraversal_name": "Binary Tree Traversals",
        "binaryTreeTraversal_description": "Demonstrates in-order, pre-order, and post-order traversals of a binary tree.",
        "binaryTreeTraversal_detailedExplanation": `
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
        "mergeSort_name": "Merge Sort",
        "mergeSort_description": "A divide and conquer algorithm that sorts by merging sorted subarrays.",
        "mergeSort_detailedExplanation": `
<h3>Merge Sort Algorithm Explained</h3>
<p>Merge Sort divides an array into subarrays, sorts them, and then merges the sorted subarrays into one sorted array.</p>
<!-- ...existing detailed explanation... -->
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
        "binarySearch_name": "Binary Search",
        "binarySearch_description": "Efficiently searches a sorted array by repeatedly dividing the search interval.",
        "binarySearch_detailedExplanation": `
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
        "avlTree_name": "AVL Tree Operations",
        "avlTree_description": "Demonstrates AVL tree operations including insertions and rotations to maintain balance.",
        "avlTree_detailedExplanation": `
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
        "astar_name": "A* Search",
        "astar_description": "An informed search algorithm that uses heuristics to find the shortest path.",
        "astar_detailedExplanation": `
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
`
    }, false),
    new Language("Türkçe", "tr-tr", {
        "toggleTheme": "Karanlık Modu Aç/Kapat",
        "start": "Başlat",
        "stop": "Durdur",
        "refreshAlgorithms": "Algoritmaları Yeniden Yükle",
        // Keys for script.js
        "selectAlgorithmInfo": "Başlamak için bir algoritma seçin",
        "selectAlgorithmFirst": "Lütfen önce bir algoritma seçin!",
        "noneOption": "Hiçbiri",
        // Algorithm translations for Türkçe
        "selectionSort_name": "Seçim Sıralaması",
        "selectionSort_description": "Sıralanmamış bölümden sürekli en küçük elemanı bularak çalışan basit bir sıralama algoritması.",
        "selectionSort_detailedExplanation": "Seçim Sıralaması için detaylı yer tutucu.",
        "quickSort_name": "Hızlı Sıralama",
        "quickSort_description": "Böl ve yönet stratejisini kullanan, yerinde çalışan verimli bir sıralama algoritması.",
        "quickSort_detailedExplanation": "Hızlı Sıralama için detaylı yer tutucu.",
        "redBlackTree_name": "Kırmızı-Siyah Ağaç İşlemleri",
        "redBlackTree_description": "Kırmızı-Siyah ağaç işlemlerini, ekleme ve renk ayarlamalarıyla dengede tutmayı gösterir.",
        "redBlackTree_detailedExplanation": "Kırmızı-Siyah Ağaç İşlemleri için detaylı yer tutucu.",
        "prim_name": "Prim Algoritması",
        "prim_description": "Yönsüz, ağırlıklı bir grafikte minimum kapsayan ağacı bulur.",
        "prim_detailedExplanation": "Prim Algoritması için detaylı yer tutucu.",
        "dijkstra_name": "Dijkstra Algoritması",
        "dijkstra_description": "Grafikteki en kısa yolu bulmak için kullanılan bir yol bulma algoritmasıdır.",
        "dijkstra_detailedExplanation": "Dijkstra Algoritması için detaylı yer tutucu.",
        "depthFirstSearch_name": "Derinlik Öncelikli Arama",
        "depthFirstSearch_description": "Grafı mümkün olduğunca derinlemesine keşfeden ve sonra geri dönen bir algoritmadır.",
        "depthFirstSearch_detailedExplanation": "Derinlik Öncelikli Arama için detaylı yer tutucu.",
        "bubbleSort_name": "Kabarcık Sıralaması",
        "bubbleSort_description": "Bitişik elemanları karşılaştırıp, yanlış sıradaysa yer değiştiren basit bir sıralama algoritmasıdır.",
        "bubbleSort_detailedExplanation": "Kabarcık Sıralaması için detaylı yer tutucu.",
        "binaryTreeTraversal_name": "İkili Ağaç Dolaşımı",
        "binaryTreeTraversal_description": "Bir ikili ağacı, sırasıyla (in-order), öncelikli (pre-order) ve sonrasında (post-order) dolaşır.",
        "binaryTreeTraversal_detailedExplanation": "İkili Ağaç Dolaşımı için detaylı yer tutucu.",
        "mergeSort_name": "Birleştirme Sıralaması",
        "mergeSort_description": "Diziyi alt parçalara bölüp, sıraladıktan sonra birleştiren böl-ve-yönet algoritmasıdır.",
        "mergeSort_detailedExplanation": "Birleştirme Sıralaması için detaylı yer tutucu.",
        "binarySearch_name": "İkili Arama",
        "binarySearch_description": "Sıralı dizide hedef değeri bulmak için arama aralığını bölerek çalışan verimli bir algoritmadır.",
        "binarySearch_detailedExplanation": "İkili Arama için detaylı yer tutucu.",
        "avlTree_name": "AVL Ağaç İşlemleri",
        "avlTree_description": "AVL ağaçlarında ekleme ve rotasyon işlemleriyle denge sağlanmasını gösterir.",
        "avlTree_detailedExplanation": "AVL Ağaç İşlemleri için detaylı yer tutucu.",
        "astar_name": "A* Arama",
        "astar_description": "Heuristik kullanarak en kısa yolu bulan bilgilendirici bir yol bulma algoritmasıdır.",
        "astar_detailedExplanation": "A* Arama için detaylı yer tutucu."
    }, false),
]);

let languageSelect = document.getElementById("lSelect");
for (const lang of translator.langlist) {
    let option = document.createElement("option");
    option.value = lang.id;
    option.innerText = lang.name;
    languageSelect.appendChild(option);
}
languageSelect.addEventListener("change", () => {
    setActiveLanguage(languageSelect.value);
    translator.translatePageToActive();
    loadAlgorithms();
    reloadAlgorithms();
    console.log("Language changed to " + languageSelect.value);
});

window.translator = translator;