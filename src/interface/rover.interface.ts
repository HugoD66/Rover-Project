import { Map } from '../class/map';
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

export abstract class ARover implements IRoverDeplacement, IRoverState {
  protected positions: Coordinates;
  protected orientation: string;

  protected constructor(
    positions: Coordinates,
    orientation: string,
  ) {
    this.positions = positions;
    this.orientation = orientation;
  }

  public abstract goAhead(): IRoverState;
  public abstract goBack(): IRoverState;
  public abstract turnOnRight(): IRoverState;
  public abstract turnOnLeft(): IRoverState;
  public abstract getActualPositions(): Coordinates;
  public abstract getOrientation(): Orientation;
}


export abstract class Orientation {
  static readonly NORTH = 'N';
  static readonly EST = 'E';
  static readonly SOUTH = 'S';
  static readonly WEST = 'W';
}

export abstract class InterpreterDirection {
  static readonly AVANCER = 'A';
  static readonly DROITE = 'D';
  static readonly GAUCHE = 'G';
  static readonly RECULER = 'R';
}
