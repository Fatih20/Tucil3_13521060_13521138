class AdjacencyList {
    private list: [node: MapNode, neighbors: AdjacentNode[]][];

    constructor() {
        this.list = new Array<[MapNode, AdjacentNode[]]>;
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
    public addNeighbors(i: number, neighbor: AdjacentNode) {
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
        this.list.push([newNode.clone, new Array<AdjacentNode>]);
    }
}
