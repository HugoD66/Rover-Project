import { Coordinates } from "../coordinate/coordinates";
import { Obstacle } from "../obstacle/obstacle";

export interface IMap {
  validateRoverPositionOnMap(x: number, y: number): Coordinates;
  getMapInformation(): IMap;
  getMapLimitX(): number;
  getMapLimitY(): number;
  getObstacles(): Obstacle[] | null | undefined;
}
