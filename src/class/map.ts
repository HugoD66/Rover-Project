import {Obstacle} from "./obstacle";
import {Coordinates} from "./coordinates";
import {AMap} from "../interface/map.interface";

export class Map extends AMap {
  constructor(
    mapLimitX: number,
    mapLimitY: number,
    obstacles?: Obstacle[] | null | undefined
  ) {
    super(mapLimitX, mapLimitY, obstacles);
  }

  /**
   * Fonction de **bas niveau**: Valide la prochaine position d'un rover.
   */
  public validateRoverPositionOnMap(x: number, y: number): Coordinates {
    const validX = (x + this.mapLimitX) % this.mapLimitX;
    const validY = (y + this.mapLimitY) % this.mapLimitY;
    return new Coordinates(validX, validY);
  }

  /**
   * Fonction de **bas niveau**: Retourne les informations de la carte.
   */
  public getMapInformation(): Map {
    return this;
  }

  /**
   * Fonction de **bas niveau**: Retourne la limite de la carte en X.
   */
  public getMapLimitX(): number {
    return this.mapLimitX;
  }

  /**
   * Fonction de **bas niveau**: Retourne la limite de la carte en Y.
   */
  public getMapLimitY(): number {
    return this.mapLimitY;
  }

  /**
   * Fonction de **bas niveau**: Retourne les obstacles de la carte.
   */
  public getObstacles(): Obstacle[] | null | undefined {
    return this.obstacles;
  }
}