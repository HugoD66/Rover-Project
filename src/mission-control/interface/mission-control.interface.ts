import {IRoverState} from "../../rover/interface/rover.interface";

export interface IMissionControl {
  executeCommand(char: string): void;
  executeCommands(): void;
  getRoverState(): IRoverState;
}
