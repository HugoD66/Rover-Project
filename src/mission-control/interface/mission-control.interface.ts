import {IRoverState} from "../../rover/interface/rover.interface";

export interface IMissionControl {
  //Decode(roverStateString: string): IRoverState;
  goAhead(): void;
  goBack(): void;
  turnOnLeft(): void;
  turnOnRight(): void;
  getRoverState(): IRoverState;
}
