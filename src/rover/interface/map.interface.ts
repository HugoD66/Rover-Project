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
