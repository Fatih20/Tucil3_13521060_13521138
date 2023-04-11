import { PriorityQueue } from '@datastructures-js/priority-queue';
import {
    Coordinate,
    MapNode,
    AdjacentNode,
    TreeNode,
    compareTreeNode
} from "./mapnode"

export interface GraphSearching {
    /**
     * Graph searching for start-end path with UCS Algorithm
     * @param startNode starting node
     * @param destNode destination node
     * @returns List of nodes showing path from starting node to destination node
     */
    UCS(startNode: number, destNode: number): MapNode[];

    /**
     * Graph searching for start-end path with A* Algorithm
     * @param startNode starting node
     * @param destNode destination node
     * @returns List of nodes showing path from starting node to destination node
     */
    AStar(startNode: number, destNode: number): MapNode[];
}

export class AdjacencyList implements GraphSearching {
    private list: [node: MapNode, neighbors: AdjacentNode[]][];

    constructor(nodes: [string, number, number][], graph: number[][]) {
        const nNodes = nodes.length;
        this.list = new Array<[MapNode, AdjacentNode[]]>(nNodes);
        for (let i = 0; i < nNodes; i++) {
            /* insert node information */
            let node = nodes[i];
            let elmt = this.list[i]
            elmt[0] = new MapNode(node[0], node[1], node[2]);

            elmt[i] = new Array<AdjacentNode>();
            /* insert neighboring nodes */
            for(let j = 0; j < nNodes; j++) {
                let weight = graph[i][j];
                if(!isNaN(weight)) {
                    let newNeighbor = new AdjacentNode(j, weight);
                    this.addNeighbor(i, newNeighbor);
                }
            }
        }
    }

    /**
     * Get the modifiable list of neighboring nodes of an element in adjacency list
     * @param i index of node in adjacency list to get the neighbors of
     * @returns modifiable list of neighboring nodes of i-th node
     */
    public neighbors(i: number): AdjacentNode[] {
        return this.list[i][1];
    }

    /**
     * Add an adjacent node into list of neighboring nodes of an element in adjacency list
     * @param i index of node in adjacency list to add the neighboring node
     * @param neighbor the adjacent node to be added as neighbor
     */
    public addNeighbor(i: number, neighbor: AdjacentNode) {
        this.list[i][1].push(neighbor);
    }

    /**
     * Get the list of neighboring nodes of an element in adjacency list
     * @param i index of node in adjacency list to get the neighbors of
     * @returns (unmodifiable) list of neighboring nodes of i-th node
     */
    public getNeighbors(i: number): readonly AdjacentNode[] {
        return this.list[i][1];
    }

    /**
     * Add a new node into the adjacency list
     * @param newNode the new node to be added into the adjacency list
     */
    public addNode(newNode: MapNode) {
        this.list.push([newNode.clone(), new Array<AdjacentNode>]);
    }

    UCS(startNode: number, destNode: number): MapNode[] {
        const searchTree: TreeNode = new TreeNode(startNode); // create search tree root
        var queue: PriorityQueue<TreeNode> = new PriorityQueue<TreeNode>(compareTreeNode, [searchTree]); // initialize search queue, start with root
        
        var isVisited: boolean[] = new Array<boolean>(this.list.length);
        isVisited.map(() => false); // initialize values with false (not visited)

        let currentNode: TreeNode;
        do {
            currentNode = queue.dequeue();

            if(!isVisited[currentNode.index]) {
                isVisited[currentNode.index] = true;
                (this.list[currentNode.index][1]).forEach(neighbor => {
                    let nextNode: TreeNode = new TreeNode(neighbor.index, (currentNode.totalWeight + neighbor.weight), currentNode);
                    queue.enqueue(nextNode);
                });
            }
        } while (!queue.isEmpty && currentNode.index != destNode);

        if(currentNode.index == destNode) {
            let path = new Array<MapNode>();
            do {
                path.push(this.list[currentNode.index][0].clone());
            } while(!currentNode.isRoot);
            return path;
        }
        else {
            throw "No path found :(";
        }
    }

    AStar(startNode: number, destNode: number): MapNode[] {
        /* Pre-process heuristic values (straight line distance of nodes to destNode) */
        var SLD: number[] = new Array<number>(this.list.length);
        for(let i = 0; i < this.list.length; i++) {
            SLD[i] = this.list[i][0].distanceTo(this.list[destNode][0]);
        }

        /* AStar Algorithm */
        const searchTree: TreeNode = new TreeNode(startNode, SLD[startNode]); // create search tree root
        var queue: PriorityQueue<TreeNode> = new PriorityQueue<TreeNode>(compareTreeNode, [searchTree]); // initialize search queue, start with root
        
        var isVisited: boolean[] = new Array<boolean>(this.list.length);
        isVisited.map(() => false); // initialize values with false (not visited)

        let currentNode: TreeNode;
        do {
            currentNode = queue.dequeue();

            if(!isVisited[currentNode.index]) {
                isVisited[currentNode.index] = true;
                (this.list[currentNode.index][1]).forEach(neighbor => {
                    let nextNode: TreeNode = new TreeNode(neighbor.index, (currentNode.totalWeight + neighbor.weight), currentNode, SLD[neighbor.index]);
                    queue.enqueue(nextNode);
                });
            }
        } while (!queue.isEmpty && currentNode.index != destNode);

        if(currentNode.index == destNode) {
            let path = new Array<MapNode>();
            do {
                path.push(this.list[currentNode.index][0].clone());
            } while(!currentNode.isRoot);
            return path;
        }
        else {
            throw "No path found :(";
        }

    }
}
