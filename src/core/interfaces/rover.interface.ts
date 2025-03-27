import {Coordinates} from "../types/coordinates";
import {Map} from "../../rover/map";
import {MoveResult} from "../types/moveResult";

export interface IRoverDeplacement {
  goAhead(): IRoverState;
  goBack(): IRoverState;
  turnOnLeft(): IRoverState;
  turnOnRight(): IRoverState;
}

export interface IRoverMovement {
  calculateNextPosition(position: Coordinates, orientation: string, moveForward: boolean): MoveResult;
}

export interface IRoverState {
  getActualPositions(): Coordinates;
  getOrientation(): Orientation;
  getLastMessage?(): string | null;
  clearLastMessage?(): void;
}

export interface RoverCommandInterface {
  executeCommandLine(): IRoverState;
  setCommandLine(commandLine: string[]): IRoverState;
}
export abstract class ARover implements IRoverDeplacement, IRoverState, RoverCommandInterface {
  protected positions: Coordinates;
  protected orientation: string;
  protected commandLine: string[] | null;
  protected map: Map;

  protected constructor(
    positions: Coordinates,
    orientation: string,
    map: Map,
    commandLine: string[] | null = null
  ) {
    this.positions = positions;
    this.orientation = orientation;
    this.commandLine = commandLine;
    this.map = map;
  }

  public abstract goAhead(): IRoverState;
  public abstract goBack(): IRoverState;
  public abstract turnOnRight(): IRoverState;
  public abstract turnOnLeft(): IRoverState;

  public abstract getActualPositions(): Coordinates;
  public abstract getOrientation(): Orientation;

  public abstract executeCommandLine(): IRoverState;
  public abstract setCommandLine(commandLine: string[]): IRoverState;

  public abstract getLastMessage(): string | null;
  public abstract clearLastMessage(): void;
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

