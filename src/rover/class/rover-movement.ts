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

    const obstacles = this.map.getObstacles();
    if (obstacles && obstacles.some(obstacle => obstacle.getObstaclePosition().x === newX && obstacle.getObstaclePosition().y === newY)) {
      throw new Error(`Le rover a rencontré un obstacle en (${newX}, ${newY}) et ne peut pas continuer.`);
      //console.log(`Obstacle détecté en (${newX}, ${newY}), arrêt du mouvement.`);
      //return position;
    }
    return this.map.validateRoverPositionOnMap(newX, newY);
  }
}
