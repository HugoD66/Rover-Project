import { Coordinates } from "../rover/coordinate/coordinates";

/**
 * Représente le résultat d'un mouvement effectué par le rover.
 * Contient des informations sur le succès du mouvement, la position actuelle et un message optionnel.
 */
export type MoveResult = {
  /**
   * Indique si le mouvement a réussi ou échoué.
   * @example true si le mouvement est réussi, false en cas d'échec (par exemple, obstacle détecté).
   */
  success: boolean;

  /**
   * La position du rover après le mouvement.
   * @see Coordinates pour la structure de la position.
   */
  position: Coordinates;

  /**
   * Message optionnel fournissant des informations supplémentaires sur le mouvement.
   * Par exemple, un message d'erreur en cas de collision avec un obstacle.
   */
  message?: string;
};
