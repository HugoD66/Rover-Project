import {IRover, IRoverState} from "../interface/rover.interface";
import { IMissionControl } from "../interface/mission-control.interface";
import {Rover} from "./rover";
import {RoverInterpreter} from "./rover-interpreter";

export class MissionControl implements IMissionControl {
  private rover: Rover;

  constructor(rover: Rover) {
    this.rover = rover;
  }

  public interpreter(commands: string, rover: Rover): IRoverState {
    for (let command of commands) {
      this.interpreterCommand(command, rover);
    }
    return this.getRoverState();
  }

  public interpreterCommand(command: string, rover: IRover): IRoverState {
    if (command.length !== 1) {
      throw new Error('Invalid command');
    }
    switch (command) {
      case 'A':
        return rover.goAhead();
      case 'D':
        return rover.turnOnRight();
      case 'G':
        return rover.turnOnLeft();
      default:
        return rover.goBack();

    }
  }

  public getRoverState(): IRoverState {
    return this.rover.getState();
  }
}
