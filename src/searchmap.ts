class AdjacencyList {
    private list: [node: MapNode, neighbors: AdjacentNode[]][];

    constructor() {
        this.list = new Array<[MapNode, AdjacentNode[]]>;
    }

    public neighbors(i: number): AdjacentNode[] {
        return this.list[i][1];
    }

    public addNeighbors(i: number, neighbor: AdjacentNode) {
        this.list[i][1].push(neighbor);
    }

    public getNeighbors(i: number): readonly AdjacentNode[] {
        return this.list[i][1];
    }

    public addNode(newNode: MapNode) {
        this.list.push([newNode.clone, new Array<AdjacentNode>]);
    }
}
