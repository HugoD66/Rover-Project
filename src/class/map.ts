import {Obstacle} from "./obstacle";
import {Coordinates} from "./coordinates";
import {AMap} from "../interface/map.interface";

export class Map extends AMap {
  constructor(
    mapLimitX: number,
    mapLimitY: number,
    obstacle?: Obstacle | null
  ) {
    super(mapLimitX, mapLimitY, obstacle);
  }

  public validateRoverPositionOnMap(x: number, y: number): Coordinates {
    const validX = (x + this.mapLimitX) % this.mapLimitX;
    const validY = (y + this.mapLimitY) % this.mapLimitY;
    return new Coordinates(validX, validY);
  }
}