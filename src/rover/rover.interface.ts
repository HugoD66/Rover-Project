import { Coordinates } from "./coordinate/coordinates";
import { MoveResult } from "../interpreter/moveResult";
import { IMap } from "./map/map.interface"; // Importation correcte de IMap

export interface IRoverDeplacement {
  goAhead(): MoveResult;
  goBack(): MoveResult;
  turnOnLeft(): MoveResult;
  turnOnRight(): MoveResult;
}

export interface IRoverMovement {
  calculateNextPosition(position: Coordinates, orientation: string, moveForward: boolean): MoveResult;
}

export interface IRoverState {
  getActualPositions(): Coordinates;
  getOrientation(): string;
  getLastMessage?(): string | null;
  clearLastMessage?(): void;
  toString(): string; // Ajout de la méthode toString
}

export interface RoverCommandInterface {
  executeCommandLine(): MoveResult[];
  setCommandLine(commandLine: string[]): MoveResult[];
}

export abstract class ARover implements IRoverDeplacement, IRoverState, RoverCommandInterface {
  protected positions: Coordinates;
  protected orientation: string;
  protected commandLine: string[] | null;
  protected map: IMap; // Déclarer map comme propriété protégée

  protected constructor(
    positions: Coordinates,
    orientation: string,
    map: IMap, // Ajouter map comme paramètre
    commandLine: string[] | null = null
  ) {
    this.positions = positions;
    this.orientation = orientation;
    this.commandLine = commandLine;
    this.map = map; // Initialiser map
  }

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
  public abstract toString(): string; // Ajout de la méthode toString
}

export abstract class Orientation {
  static readonly NORTH = 'N';
  static readonly EST = 'E';
  static readonly SOUTH = 'S';
  static readonly WEST = 'W';
}

export abstract class InterpreterDirection {
  static readonly AHEAD = 'AHEAD';
  static readonly RIGHT = 'RIGHT';
  static readonly LEFT = 'LEFT';
  static readonly BACK = 'BACK';
}
