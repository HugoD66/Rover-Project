import {IRoverState} from "../../rover/interface/rover.interface";

export interface IMissionControl {
  goAhead(): void;
  goBack(): void;
  turnOnLeft(): void;
  turnOnRight(): void;
  getRoverState(): IRoverState;
}
