import { IMap } from "./map.interface";
import { Obstacle } from "../obstacle/obstacle";
import { Coordinates } from "../coordinate/coordinates";

/**
 * Classe représentant une carte sur laquelle un rover peut se déplacer.
 * Elle définit les limites de la carte, valide les positions du rover, et gère les obstacles présents sur la carte.
 */
export class Map implements IMap {
  // Limites de la carte en coordonnées X et Y
  protected readonly mapLimitX: number;
  protected readonly mapLimitY: number;

  // Liste des obstacles présents sur la carte (facultatif)
  protected obstacles?: Obstacle[] | null | undefined;

  /**
   * Constructeur de la classe Map.
   * Initialise la carte avec les limites et éventuellement les obstacles.
   * 
   * @param mapLimitX La largeur de la carte (limite X).
   * @param mapLimitY La hauteur de la carte (limite Y).
   * @param obstacles Liste d'obstacles présents sur la carte (facultatif).
   */
  constructor(
    mapLimitX: number,
    mapLimitY: number,
    obstacles?: Obstacle[] | null | undefined
  ) {
    this.mapLimitX = mapLimitX;
    this.mapLimitY = mapLimitY;
    this.obstacles = obstacles;
  }

  /**
   * Valide une position sur la carte, en prenant en compte les limites de la carte.
   * Les coordonnées sont "wrapées" pour revenir dans les limites en cas de dépassement.
   * 
   * @param x La coordonnée X à valider.
   * @param y La coordonnée Y à valider.
   * @returns La position validée sous forme d'un objet `Coordinates`.
   */
  public validateRoverPositionOnMap(x: number, y: number): Coordinates {
    const validX = (x + this.mapLimitX) % this.mapLimitX; // S'assure que X reste dans les limites
    const validY = (y + this.mapLimitY) % this.mapLimitY; // S'assure que Y reste dans les limites
    return new Coordinates(validX, validY);
  }

  /**
   * Retourne l'objet représentant les informations complètes de la carte.
   * 
   * @returns L'instance de la carte actuelle.
   */
  public getMapInformation(): IMap {
    return this;
  }

  /**
   * Retourne la limite X de la carte (largeur).
   * 
   * @returns La largeur de la carte.
   */
  public getMapLimitX(): number {
    return this.mapLimitX;
  }

  /**
   * Retourne la limite Y de la carte (hauteur).
   * 
   * @returns La hauteur de la carte.
   */
  public getMapLimitY(): number {
    return this.mapLimitY;
  }

  /**
   * Récupère la liste des obstacles présents sur la carte.
   * 
   * @returns Un tableau d'obstacles ou `null`/`undefined` si aucun obstacle n'est défini.
   */
  public getObstacles(): Obstacle[] | null | undefined {
    return this.obstacles;
  }
}
