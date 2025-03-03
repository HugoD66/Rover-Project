import {IRoverState} from "./rover.interface";

export interface IMissionControl {
  sendCommand(command: string): IRoverState;
  getRoverState(): IRoverState;
}
