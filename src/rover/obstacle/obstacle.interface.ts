import { Coordinates } from "../coordinate/coordinates";

/**
 * Interface représentant un obstacle sur la carte.
 * Un obstacle a une position qui peut être récupérée sous forme de coordonnées.
 */
export interface IObstacle {
  
  /**
   * Retourne la position de l'obstacle sur la carte sous forme de coordonnées.
   * 
   * @returns L'objet `Coordinates` représentant la position de l'obstacle.
   */
  getObstaclePosition(): Coordinates;
}
