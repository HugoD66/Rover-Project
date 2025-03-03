import {Coordinates} from "../class/coordinates";

export interface IRoverDeplacement {
  goAhead(): IRoverState;
  goBack(): IRoverState;
  turnOnLeft(): IRoverState;
  turnOnRight(): IRoverState;
}

export interface IRoverState {
  getActualPositions(): Coordinates;
  getOrientation(): Orientation;
}

export interface RoverCommandInterface {
  executeCommandLine(): IRoverState;
  setCommandLine(commandLine: string[]): IRoverState;
}

export abstract class ARover implements IRoverDeplacement, IRoverState, RoverCommandInterface {
  protected positions: Coordinates;
  protected orientation: string;
  protected commandLine: string[] | null;

  protected constructor(
    positions: Coordinates,
    orientation: string,
    commandLine: string[] | null = null
  ) {
    this.positions = positions;
    this.orientation = orientation;
    this.commandLine = commandLine;
  }

  public abstract goAhead(): IRoverState;
  public abstract goBack(): IRoverState;
  public abstract turnOnRight(): IRoverState;
  public abstract turnOnLeft(): IRoverState;

  public abstract getActualPositions(): Coordinates;
  public abstract getOrientation(): Orientation;

  public abstract executeCommandLine(): IRoverState;
  public abstract setCommandLine(commandLine: string[]): IRoverState;
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

