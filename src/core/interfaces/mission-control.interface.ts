import {IRoverState} from "./rover.interface";

export interface IMissionControl {
  executeCommand(char: string): void;
  executeCommands(): void;
  getRoverState(): IRoverState;
}
