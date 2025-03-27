import {Obstacle} from "../core/types/obstacle";
import {Coordinates} from "../core/types/coordinates";
import {IMap} from "../core/interfaces/map.interface";

export class Map implements IMap {
  protected readonly mapLimitX: number;
  protected readonly mapLimitY: number;
  protected  obstacles?: Obstacle[] | null | undefined;

  constructor(
    mapLimitX: number,
    mapLimitY: number,
    obstacles?: Obstacle[] | null | undefined
  ) {
    this.mapLimitX = mapLimitX;
    this.mapLimitY = mapLimitY;
    this.obstacles = obstacles
  }

  public validateRoverPositionOnMap(x: number, y: number): Coordinates {
    const validX = (x + this.mapLimitX) % this.mapLimitX;
    const validY = (y + this.mapLimitY) % this.mapLimitY;
    return new Coordinates(validX, validY);
  }

  public getMapInformation(): Map {
    return this;
  }

  public getMapLimitX(): number {
    return this.mapLimitX;
  }

  public getMapLimitY(): number {
    return this.mapLimitY;
  }

  public getObstacles(): Obstacle[] | null | undefined {
    return this.obstacles;
  }
}