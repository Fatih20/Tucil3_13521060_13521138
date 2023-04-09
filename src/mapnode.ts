class MapNode {
    private _name: string;
    private _coordinate: number;

    constructor(name: string, coordinate: number = NaN) {
        this._name = name;
        this._coordinate = coordinate;
    }

    get name(): string {
        return this._name;
    }

    get coordinate(): number {
        return this._coordinate;
    }

    get clone(): MapNode {
        let cloned = new MapNode(this._name, this._coordinate);
        return cloned;
    }

    static clone(mapNode: MapNode): MapNode {
        return mapNode.clone;
    }
}

class AdjacentNode extends MapNode {
    private _weight: number;

    constructor(name: string, coordinate: number = NaN, weight: number) {
        super(name, coordinate);
        this._weight = weight;
    }

    get weight(): number {
        return this._weight;
    }
}

class TreeNode extends MapNode {
    private _totalWeight: number;
    private _parent: TreeNode | null;
    
    constructor(name: string, coordinate: number = NaN, totalWeight: number = 0, parent: TreeNode | null = null) {
        super(name, coordinate);
        this._totalWeight = totalWeight;
        this._parent = parent;
    }

    get totalWeight(): number {
        return this._totalWeight;
    }

    /* probably not needed */
    set totalWeight(totalWeight: number) {
        this._totalWeight = totalWeight;
    }

    get parent(): TreeNode | null {
        return this._parent;
    }
}