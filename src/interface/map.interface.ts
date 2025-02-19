import {Coordinates} from "../class/coordinates";
import {Obstacle} from "../class/obstacle";
import {Map} from "../class/map";

export interface IMap {
  validateRoverPositionOnMap(x: number, y: number): Coordinates;
  getMapInformation(): Map;
  getMapLimitX(): number;
  getMapLimitY(): number;
  getObstacles(): Obstacle[] | null | undefined;
}

export abstract class AMap implements IMap {
  protected readonly mapLimitX: number;
  protected readonly mapLimitY: number;
  protected  obstacles?: Obstacle[] | null | undefined;

  protected constructor(
    mapLimitX: number,
    mapLimitY: number,
    obstacles?: Obstacle[] | null | undefined
  ) {
    this.mapLimitX = mapLimitX;
    this.mapLimitY = mapLimitY;
    this.obstacles = obstacles
  }

  abstract getMapInformation(): Map;
  abstract validateRoverPositionOnMap(x: number, y: number): Coordinates;
  abstract getMapLimitX(): number;
  abstract getMapLimitY(): number;
  abstract getObstacles(): Obstacle[] | null | undefined;
}