export class Coordinates {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public toString(): string {
    return `(${this.x}, ${this.y})`;
  }
}