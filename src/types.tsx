import L, { LatLng } from "leaflet";

export class Route {
  private source: number;
  private destination: number;
  private weight: number;
  private twoWay: boolean;
  private static twoWayColor = "#68b723";
  private static oneWayColor = "#f37329";
  private static partOfPathColor = "#3689e6";

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
  }

  public getSource(): number {
    return this.source;
  }

  public isTwoWay(): boolean {
    return this.twoWay;
  }

  public isPartOfPath(routesTuple: [number, number][]) {
    return routesTuple.some((tuple) => this.isEqualTuple(tuple));
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

  public isEqual(r: Route): boolean {
    return (
      this.source === r.getSource() && this.destination === r.getDestination()
    );
  }

  public isEqualTuple(tuple: [number, number]) {
    const mockRoute = new Route(tuple[0], tuple[1], 0);
    if (!this.isTwoWay()) {
      return this.isEqual(mockRoute);
    } else {
      return this.isEqualSD(mockRoute);
    }
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

  public getColor(pathRoutesTuple: [number, number][]) {
    if (this.isPartOfPath(pathRoutesTuple)) {
      return this.getPartOfPathColor();
    }

    if (this.isTwoWay()) {
      return this.getTwoWayColor();
    }

    return this.getOneWayColor();
  }

  public getOneWayColor() {
    return Route.oneWayColor;
  }

  public getTwoWayColor() {
    return Route.twoWayColor;
  }

  public getPartOfPathColor() {
    return Route.partOfPathColor;
  }
}

export type Node = {
  name: string;
  latitude: number;
  longitude: number;
};

export class LocationMarker extends LatLng {
  private name: string;

  private static regularIcon = new L.Icon({
    iconUrl: "/marker/regularIcon.svg",
    iconSize: [32, 40],
  });

  private static sourceIcon = new L.Icon({
    iconUrl: "/marker/sourceIcon.svg",
    iconSize: [32, 40],
  });

  private static destinationIcon = new L.Icon({
    iconUrl: "/marker/destinationIcon.svg",
    iconSize: [32, 40],
  });

  constructor(pos: LatLng, name: string) {
    super(pos.lat, pos.lng);
    this.name = name;
  }

  public getName() {
    return this.name;
  }

  public setName(name: string) {
    this.name = name;
  }

  public getSourceIcon(): L.Icon {
    return LocationMarker.sourceIcon;
  }

  public getDestinationIcon(): L.Icon {
    return LocationMarker.destinationIcon;
  }

  public getRegularIcon(): L.Icon {
    return LocationMarker.regularIcon;
  }
}
