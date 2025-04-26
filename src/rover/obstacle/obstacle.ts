import { IObstacle } from "./obstacle.interface"; // Importation de l'interface IObstacle
import { Coordinates } from "../coordinate/coordinates";

/**
 * Représente un obstacle sur la carte avec une position spécifique (x, y).
 * Un obstacle peut être utilisé pour vérifier si une position donnée est occupée.
 */
export class Obstacle implements IObstacle {
  // Position de l'obstacle
  protected x: number;
  protected y: number;

  /**
   * Crée une instance d'un obstacle avec des coordonnées spécifiées.
   * 
   * @param x La coordonnée X de l'obstacle.
   * @param y La coordonnée Y de l'obstacle.
   */
  public constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  /**
   * Retourne la coordonnée X de l'obstacle.
   * 
   * @returns La coordonnée X de l'obstacle.
   */
  public getX(): number {
    return this.x;
  }

  /**
   * Retourne la coordonnée Y de l'obstacle.
   * 
   * @returns La coordonnée Y de l'obstacle.
   */
  public getY(): number {
    return this.y;
  }

  /**
   * Retourne la position de l'obstacle sous forme d'un objet `Coordinates`.
   * 
   * @returns Un objet `Coordinates` représentant la position de l'obstacle.
   */
  public getObstaclePosition(): Coordinates {
    return new Coordinates(this.x, this.y);
  }

  /**
   * Vérifie si l'obstacle est situé à la position (x, y) donnée.
   * 
   * @param x La coordonnée X de la position à vérifier.
   * @param y La coordonnée Y de la position à vérifier.
   * @returns `true` si l'obstacle est à la position spécifiée, sinon `false`.
   */
  public isObstacleOnNextPosition(x: number, y: number): boolean {
    return this.x === x && this.y === y;
  }
}
