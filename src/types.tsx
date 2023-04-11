import { LatLng } from "leaflet";

export class Route {
  private source: number;
  private destination: number;
  private weight: number;
  private twoWay: boolean;
  private partOfPath: boolean;

  constructor(
    source: number,
    destination: number,
    weight: number,
    twoWay: boolean = false
  ) {
    this.source = source;
    this.destination = destination;
    this.weight = weight;
    this.twoWay = twoWay;
    this.partOfPath = false;
  }

  public getSource(): number {
    return this.source;
  }

  public isTwoWay(): boolean {
    return this.twoWay;
  }

  public isPartOfPath() {
    return this.partOfPath;
  }

  public getDestination(): number {
    return this.destination;
  }

  public getWeight(): number {
    return this.weight;
  }

  public swapSourceAndDestination() {
    const temp = this.source;
    this.source = this.destination;
    this.destination = temp;
  }

  public makeTwoWay() {
    this.twoWay = true;
  }

  public makeNotPartOfPath() {
    this.partOfPath = false;
  }

  public makePartOfPath() {
    this.partOfPath = true;
  }

  public isEqual(r: Route): boolean {
    return (
      this.source === r.getSource() && this.destination === r.getDestination()
    );
  }

  public isEqualSD(r: Route): boolean {
    return (
      this.isEqual(r) ||
      (this.source === r.getDestination() && this.destination === r.getSource())
    );
  }

  public isContainNodeIndex(index: number) {
    return this.destination === index || this.source === index;
  }
}

export type Node = {
  name: string;
  latitude: number;
  longitude: number;
};

export class LocationMarker {
  private typeOfMarker: 0 | -1 | 1;
  private lat: number;
  private lng: number;
  private name: string;

  constructor(pos: LatLng, name: string) {
    this.typeOfMarker = 0;
    this.lat = pos.lat;
    this.lng = pos.lng;
    this.name = name;
  }

  public makeStart() {
    this.typeOfMarker = -1;
  }

  public makeEnd() {
    this.typeOfMarker = 1;
  }

  public isStart() {
    return this.typeOfMarker === -1;
  }

  public isEnd() {
    return this.typeOfMarker === 1;
  }

  public isRegular() {
    return this.typeOfMarker === 0;
  }

  public getName() {
    return this.name;
  }

  public setName(name: string) {
    this.name = name;
  }

  public getLat() {
    return this.lat;
  }

  public getLng() {
    return this.lng;
  }

  public samePosition(lm: LocationMarker) {
    return this.getLat() === lm.getLat() && this.getLng() === lm.getLng();
  }

  public distanceTo(lm: LocationMarker) {
    const lat1 = this.getLat();
    const lng1 = this.getLng();
    const lat2 = lm.getLat();
    const lng2 = lm.getLng();

    return Math.sqrt((lat1 - lat2) ** 2 + (lng1 - lng2) ** 2);
  }
}
