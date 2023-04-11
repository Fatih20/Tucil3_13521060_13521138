export class Route {
  private source: number;
  private destination: number;
  private weight: number;
  private isTwoWay: boolean;

  constructor(
    source: number,
    destination: number,
    weight: number,
    isTwoWay: boolean = false
  ) {
    this.source = source;
    this.destination = destination;
    this.weight = weight;
    this.isTwoWay = isTwoWay;
  }

  public getSource(): number {
    return this.source;
  }

  public getTwoWay(): boolean {
    return this.isTwoWay;
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
    this.isTwoWay = true;
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
}
