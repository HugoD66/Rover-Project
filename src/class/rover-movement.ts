import {IRoverMovement, Orientation} from "../interface/rover.interface";
import {Map} from "./map";
import {Coordinates} from "./coordinates";

export class RoverMovement implements IRoverMovement {
  private map: Map;

  public constructor(map: Map) {
    this.map = map;
  }

  public calculateNextPosition(position: Coordinates, orientation: string, moveForward: boolean): Coordinates {
    let newX = position.x;
    let newY = position.y;

    switch (orientation) {
      case Orientation.NORTH:
        newY += moveForward ? 1 : -1;
        break;
      case Orientation.EST:
        newX += moveForward ? 1 : -1;
        break;
      case Orientation.SOUTH:
        newY += moveForward ? -1 : 1;
        break;
      case Orientation.WEST:
        newX += moveForward ? -1 : 1;
        break;
    }

    return this.map.validateRoverPositionOnMap(newX, newY);
  }
}
