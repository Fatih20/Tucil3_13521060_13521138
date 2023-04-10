import { ICompare } from '@datastructures-js/priority-queue';

/**
 * Uses Decimal Degrees (DD) format; latitude followed by longitude
 */
export class Coordinate {
    _latitude: number
    _longitude: number

    constructor(latitude: number, longitude: number) {
        this._latitude = latitude;
        this._longitude = longitude;
    }

    get latitude(): number {
        return this._latitude;
    }

    get longitude(): number {
        return this._longitude;
    }

    get coordinate(): [number, number] {
        return [this._latitude, this._longitude];
    }

    public isEqual(other: Coordinate): boolean {
        return (this._latitude == other._latitude) && (this._longitude == other._longitude);
    }

    /**
     * Calculates the distance between to geographical coordinates using 'haversine' formula,
     * returns distance in meters.
     * 
     * In practice, calculates the shortest distance over the earth’s surface
     * 
     * reference: http://www.movable-type.co.uk/scripts/latlong.html
     * @param other 
     */
    public distanceTo(other: Coordinate): number {
        let lat1 = this._latitude;
        let lat2 = other._latitude;
        let lon1 = this._longitude;
        let lon2 = other._longitude;

        const DegtoRad = Math.PI/180;

        const R = 6371e3; // earth's radius, in metres
        const φ1 = lat1 * DegtoRad; // φ, λ in radians
        const φ2 = lat2 * DegtoRad;
        const Δφ = (lat2-lat1) * DegtoRad;
        const Δλ = (lon2-lon1) * DegtoRad;

        const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                Math.cos(φ1) * Math.cos(φ2) *
                Math.sin(Δλ/2) * Math.sin(Δλ/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

        const d = R * c; // distance, in metres

        return d;
    }
}

export class MapNode {
    private _name: string;
    private readonly _coordinate: Coordinate;

    constructor(name: string, lat: number, lon: number) {
        this._name = name;
        this._coordinate = new Coordinate(lat, lon);
    }

    get name(): string {
        return this._name;
    }

    get coordinate(): readonly [number, number] {
        return this._coordinate.coordinate;
    }

    public clone(): MapNode {
        let cloned = new MapNode(this._name, this._coordinate.latitude, this._coordinate.longitude);
        return cloned;
    }

    public isSame(other: MapNode): boolean {
        return (this._name == other._name) && (this._coordinate.isEqual(other._coordinate));
    }

    static clone(mapNode: MapNode): MapNode {
        return mapNode.clone();
    }
}

export class AdjacentNode {
    private _index: number;
    private _weight: number;

    constructor(index: number, weight: number) {
        this._index = index;
        this._weight = weight;
    }

    get index(): number {
        return this._index;
    }

    get weight(): number {
        return this._weight;
    }
}

export class TreeNode {
    private _index: number;
    private _totalWeight: number;
    private _parent: TreeNode | null;
    
    constructor(index: number, totalWeight: number = 0, parent: TreeNode | null = null) {
        this._index = index;
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

    get index(): number {
        return this._index;
    }

    get parent(): TreeNode | null {
        return this._parent;
    }

    public isRoot(): boolean {
        return (this._parent == null);
    }
}

export const compareTreeNode: ICompare<TreeNode> = (a: TreeNode, b: TreeNode) => {
    // if(a.totalWeight < b.totalWeight) {
    //     return 1;
    // }
    // if(a.totalWeight > b.totalWeight) {
    //     return -1;
    // }
    return a.totalWeight < b.totalWeight ? 1 : -1;
}