import {Coordinates} from "./coordinates";
import {IRoverState} from "../interface/rover.interface";

export class ObstacleError extends Error {
  constructor(public obstaclePosition: Coordinates, public roverState: IRoverState) {
    super(`Obstacle detected at position x: ${obstaclePosition.x}, y: ${obstaclePosition.y}`);
    this.name = "ObstacleDetectedError";
  }
}
