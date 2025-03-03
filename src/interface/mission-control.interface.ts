import {IRoverState} from "./rover.interface";
import {Rover} from "../class/rover";

export interface IMissionControl {
  interpreter(commands: string, rover: Rover): IRoverState;
  interpreterCommand(command: string, rover: Rover): void;
  getRoverState(): IRoverState;
}
