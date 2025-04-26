import { Coordinates } from "./coordinate/coordinates";
import { MoveResult } from "../interpreter/moveResult";
import { IMap } from "./map/map.interface"; // Importation correcte de IMap

// Interface pour les mouvements de base du rover
export interface IRoverDeplacement {
  // Effectue un mouvement en avant
  goAhead(): MoveResult;

  // Effectue un mouvement en arrière
  goBack(): MoveResult;

  // Tourne le rover vers la gauche
  turnOnLeft(): MoveResult;

  // Tourne le rover vers la droite
  turnOnRight(): MoveResult;
}

// Interface pour le calcul de la prochaine position du rover
export interface IRoverMovement {
  // Calcule la prochaine position en fonction de l'orientation et du mouvement
  calculateNextPosition(position: Coordinates, orientation: string, moveForward: boolean): MoveResult;
}

// Interface représentant l'état du rover
export interface IRoverState {
  // Retourne la position actuelle du rover
  getActualPositions(): Coordinates;

  // Retourne l'orientation actuelle du rover
  getOrientation(): string;

  // Optionnel : Retourne le dernier message du rover, s'il existe
  getLastMessage?(): string | null;

  // Optionnel : Efface le dernier message du rover
  clearLastMessage?(): void;

  // Méthode pour obtenir une représentation en chaîne de caractères de l'état du rover
  toString(): string;
}

// Interface pour l'exécution des commandes du rover
export interface RoverCommandInterface {
  // Exécute la ligne de commande actuelle
  executeCommandLine(): MoveResult[];

  // Définit une nouvelle ligne de commande
  setCommandLine(commandLine: string[]): MoveResult[];
}

// Classe abstraite représentant un rover, implémentant les interfaces de déplacement, d'état et de commande
export abstract class ARover implements IRoverDeplacement, IRoverState, RoverCommandInterface {
  // Position actuelle du rover sur la carte
  protected positions: Coordinates;

  // Orientation actuelle du rover (par exemple, 'N', 'E', 'S', 'W')
  protected orientation: string;

  // Ligne de commande à exécuter par le rover
  protected commandLine: string[] | null;

  // Carte sur laquelle le rover se déplace
  protected map: IMap;

  /**
   * Constructeur pour initialiser un rover avec ses propriétés de position, orientation, carte et commande.
   * @param positions Position initiale du rover.
   * @param orientation Orientation initiale du rover.
   * @param map Carte sur laquelle le rover évolue.
   * @param commandLine Ligne de commande à exécuter (optionnelle).
   */
  protected constructor(
    positions: Coordinates,
    orientation: string,
    map: IMap,
    commandLine: string[] | null = null
  ) {
    this.positions = positions;
    this.orientation = orientation;
    this.commandLine = commandLine;
    this.map = map;
  }

  // Méthodes abstraites à implémenter par les sous-classes
  public abstract goAhead(): MoveResult;
  public abstract goBack(): MoveResult;
  public abstract turnOnRight(): MoveResult;
  public abstract turnOnLeft(): MoveResult;
  public abstract getActualPositions(): Coordinates;
  public abstract getOrientation(): string;
  public abstract executeCommandLine(): MoveResult[];
  public abstract setCommandLine(commandLine: string[]): MoveResult[];
  public abstract getLastMessage(): string | null;
  public abstract clearLastMessage(): void;

  // Méthode abstraite pour obtenir une représentation en chaîne de caractères du rover
  public abstract toString(): string;
}

// Classe abstraite pour définir les orientations possibles du rover
export abstract class Orientation {
  static readonly NORTH = 'N';  // Nord
  static readonly EST = 'E';    // Est
  static readonly SOUTH = 'S';  // Sud
  static readonly WEST = 'W';   // Ouest
}

// Classe abstraite pour définir les directions de commande possibles
export abstract class InterpreterDirection {
  static readonly AHEAD = 'AHEAD';  // Avancer
  static readonly RIGHT = 'RIGHT';  // Tourner à droite
  static readonly LEFT = 'LEFT';    // Tourner à gauche
  static readonly BACK = 'BACK';    // Reculer
}
