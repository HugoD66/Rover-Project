export class Map {
  private readonly maxX: number;
  private readonly maxY: number;

  constructor(maxX: number = 10, maxY: number = 10) {
    this.maxX = maxX;
    this.maxY = maxY;
  }

  // Valide et ajuste la position pour rester dans les limites de la carte
  public validatePosition(x: number, y: number): { x: number; y: number } {
    const validX = (x + this.maxX) % this.maxX;
    const validY = (y + this.maxY) % this.maxY;
    return { x: validX, y: validY };
  }
}