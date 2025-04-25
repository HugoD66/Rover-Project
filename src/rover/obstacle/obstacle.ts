import { IObstacle } from "./obstacle.interface"; // Importation correcte de IObstacle
import { Coordinates } from "../coordinate/coordinates";

export class Obstacle implements IObstacle {
  protected x: number;
  protected y: number;

  public constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public getObstaclePosition(): Coordinates {
    return new Coordinates(this.x, this.y);
  }

  public isObstacleOnNextPosition(x: number, y: number): boolean {
    return this.x === x && this.y === y;
  }
}
