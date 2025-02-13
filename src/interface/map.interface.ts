import {Coordinates} from "../class/coordinates";
import {Obstacle} from "../class/obstacle";

export interface IMap {
  validateRoverPositionOnMap(x: number, y: number): Coordinates;
}

export abstract class AMap implements IMap {
  protected readonly mapLimitX: number;
  protected readonly mapLimitY: number;
  protected  obstacle?: Obstacle | null;

  protected constructor(
    mapLimitX: number,
    mapLimitY: number,
    obstacle?: Obstacle | null
  ) {
    this.mapLimitX = mapLimitX;
    this.mapLimitY = mapLimitY;
    this.obstacle = obstacle
  }

  abstract validateRoverPositionOnMap(x: number, y: number): Coordinates;
}