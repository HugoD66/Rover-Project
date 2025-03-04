import {IRoverState} from "./rover.interface";
import {Rover} from "../class/rover";

export interface IMissionControl {
  Decode(roverStateString: string): IRoverState;
  goAhead(): IRoverState;
  goBack(): IRoverState;
  turnOnLeft(): IRoverState;
  turnOnRight(): IRoverState;
  getRoverState(): IRoverState;
}
