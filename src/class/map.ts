import {Obstacle} from "./obstacle";
import {Coordinates} from "./coordinates";
import {AMap} from "../interface/map.interface";

export class Map extends AMap {
  constructor(
    mapLimitX: number,
    mapLimitY: number,
    obstacles?: Obstacle[] | null | undefined
  ) {
    super(mapLimitX, mapLimitY, obstacles);
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