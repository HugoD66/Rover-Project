import {Coordinates} from "../types/coordinates";
import {Obstacle} from "../types/obstacle";
import {Map} from "../../rover/map";

export interface IMap {
  validateRoverPositionOnMap(x: number, y: number): Coordinates;
  getMapInformation(): Map;
  getMapLimitX(): number;
  getMapLimitY(): number;
  getObstacles(): Obstacle[] | null | undefined;
}
