import {Coordinates} from "../class/coordinates";


export interface IObstacle {
  getObstaclePosition(): Coordinates;
}

export abstract class AObstacle implements IObstacle {
  protected x: number;
  protected y: number;

  protected constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

    abstract getObstaclePosition(): Coordinates;
}