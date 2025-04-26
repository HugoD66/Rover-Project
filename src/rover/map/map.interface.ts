import { Coordinates } from "../coordinate/coordinates";
import { Obstacle } from "../obstacle/obstacle";

/**
 * Interface représentant une carte sur laquelle un rover peut se déplacer.
 * Fournit des méthodes pour récupérer les informations de la carte,
 * valider les positions du rover et accéder aux obstacles présents sur la carte.
 */
export interface IMap {
  
  /**
   * Valide la position du rover sur la carte. Si la position est hors limites,
   * elle renvoie une position valide proche.
   * 
   * @param x La coordonnée X de la position à valider.
   * @param y La coordonnée Y de la position à valider.
   * @returns La position validée sous forme de coordonnées.
   */
  validateRoverPositionOnMap(x: number, y: number): Coordinates;

  /**
   * Retourne les informations complètes de la carte. Cette méthode est généralement
   * utilisée pour obtenir des détails comme la largeur, la hauteur ou d'autres propriétés
   * spécifiques à la carte.
   * 
   * @returns Un objet représentant les informations de la carte.
   */
  getMapInformation(): IMap;

  /**
   * Retourne la limite de la carte en termes de coordonnées X.
   * 
   * @returns La largeur maximale de la carte.
   */
  getMapLimitX(): number;

  /**
   * Retourne la limite de la carte en termes de coordonnées Y.
   * 
   * @returns La hauteur maximale de la carte.
   */
  getMapLimitY(): number;

  /**
   * Récupère la liste des obstacles présents sur la carte.
   * Si aucun obstacle n'est présent, la méthode peut renvoyer `null` ou `undefined`.
   * 
   * @returns Un tableau d'objets Obstacle ou `null`/`undefined` si aucune obstacle n'est présent.
   */
  getObstacles(): Obstacle[] | null | undefined;
}
