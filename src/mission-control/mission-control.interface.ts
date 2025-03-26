import {IRoverState} from "../rover/rover.interface";

export interface IMissionControl {
  executeCommand(char: string): void;
  executeCommands(): void;
  getRoverState(): IRoverState;
}
