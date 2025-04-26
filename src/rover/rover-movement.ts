import { IRoverMovement, Orientation } from "./rover.interface";
import { Map } from "./map/map";
import { Coordinates } from "./coordinate/coordinates";
import { MoveResult } from "../interpreter/moveResult";

export class RoverMovement implements IRoverMovement {
  private map: Map;

  /**
   * Constructeur de la classe RoverMovement.
   * @param map L'instance de la carte sur laquelle le rover se déplace.
   */
  public constructor(map: Map) {
    this.map = map;
  }

  /**
   * Calcule la prochaine position du rover en fonction de son orientation et de son mouvement (avant ou arrière).
   * Vérifie également la présence d'obstacles avant de déplacer le rover.
   * @param position La position actuelle du rover.
   * @param orientation L'orientation actuelle du rover (nord, est, sud, ouest).
   * @param moveForward Indique si le rover doit avancer (true) ou reculer (false).
   * @returns Un objet contenant le résultat du mouvement (succès, nouvelle position, message d'erreur le cas échéant).
   */
  public calculateNextPosition(position: Coordinates, orientation: string, moveForward: boolean): MoveResult {
    let newX = position.x;
    let newY = position.y;

    // Détermination de la nouvelle position en fonction de l'orientation
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

    // Vérification de la présence d'obstacles à la nouvelle position
    const obstacles = this.map.getObstacles();
    if (obstacles && obstacles.some(ob => ob.getObstaclePosition().x === newX && ob.getObstaclePosition().y === newY)) {
      return {
        success: false,
        position: position,  // Le rover ne se déplace pas et reste sur place
        message: `⛔ Obstacle détecté en (${newX}, ${newY}), arrêt du rover. ⛔`
      };
    }

    // Validation de la nouvelle position sur la carte
    const validatedPosition = this.map.validateRoverPositionOnMap(newX, newY);

    // Retour du résultat du mouvement
    return {
      success: true,
      position: validatedPosition
    };
  }
}
