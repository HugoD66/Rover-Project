import {InterpreterDirection, IRoverState} from "../../rover/interface/rover.interface";
import { IMissionControl } from "../interface/mission-control.interface";
import { Rover } from "../../rover/rover-export";

export class MissionControl implements IMissionControl {
  private rover: Rover;
  private commands: string[];

  public constructor(rover: Rover, commands: string[]) {
    this.rover = rover;
    this.commands = commands;
  }

  public goAhead(): void {
    this.rover?.goAhead();
  }

  public goBack(): void {
    this.rover?.goBack();
  }

  public turnOnLeft(): void {
    this.rover?.turnOnLeft();
  }

  public turnOnRight(): void {
    this.rover?.turnOnRight();
  }

  public getRoverState(): IRoverState {
    return this.rover?.getState();
  }

  public executeCommands(): void {
    for (let char of this.commands) {
      this.executeCommand(char);
    }
  }

  public executeCommand(char: string): void {
    switch (char) {
      case InterpreterDirection.AHEAD:
        this.goAhead();
        break;
      case InterpreterDirection.RIGHT:
        this.turnOnRight();
        break;
      case InterpreterDirection.LEFT:
        this.turnOnLeft();
        break;
      case InterpreterDirection.BACK:
        this.goBack();
        break;
      default:
        throw new Error(`Unknown command: ${char}`);
    }
  }
}
