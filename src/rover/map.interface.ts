import {Coordinates} from "./coordinates";
import {Obstacle} from "./obstacle";
import {Map} from "./map";

export interface IMap {
  validateRoverPositionOnMap(x: number, y: number): Coordinates;
  getMapInformation(): Map;
  getMapLimitX(): number;
  getMapLimitY(): number;
  getObstacles(): Obstacle[] | null | undefined;
}
