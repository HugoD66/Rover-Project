import {IRoverMovement, Orientation} from "../core/interfaces/rover.interface";
import {Map} from "./map";
import {Coordinates} from "../core/types/coordinates";
import {MoveResult} from "../core/types/moveResult";

export class RoverMovement implements IRoverMovement {
  private map: Map;

  public constructor(map: Map) {
    this.map = map;
  }

  public calculateNextPosition(position: Coordinates, orientation: string, moveForward: boolean): MoveResult  {
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

    const obstacles = this.map.getObstacles();
    if (obstacles && obstacles.some(ob => ob.getObstaclePosition().x === newX && ob.getObstaclePosition().y === newY)) {
      return {
        success: false,
        position: position, // reste sur place
        message: `⛔ Obstacle détecté en (${newX}, ${newY}), arrêt du rover. ⛔`
      };
    }

    const validatedPosition = this.map.validateRoverPositionOnMap(newX, newY);

    return {
      success: true,
      position: validatedPosition
    };
  }
}
