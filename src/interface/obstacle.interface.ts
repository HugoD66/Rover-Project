import {Obstacle} from "../class/obstacle";


export interface IObstacle {
  getObstaclePosition(): Obstacle;
}

export abstract class AObstacle implements IObstacle {
  protected x: number;
  protected y: number;

  protected constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  abstract getObstaclePosition(): Obstacle;
}