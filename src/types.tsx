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
