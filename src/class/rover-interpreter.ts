import {InterpreterDirection, IRoverState} from "../interface/rover.interface";
import {Rover} from "./rover";

export class RoverInterpreter {
  static interpreter(commands: string[], rover: Rover): IRoverState {
    for (let char of commands) {
      rover = this.interpreterChar(char, rover);
    }
    return rover.getState();
  }

  private static interpreterChar(char: string, rover: Rover): Rover {
    if (char.length < 1) {
      throw new Error('Invalid command');
    }
    switch (char) {
      case InterpreterDirection.AHEAD:
        console.log('TEST')
        rover.goAhead();
        break;
      case InterpreterDirection.RIGHT:
        rover.turnOnRight();
        break;
      case InterpreterDirection.LEFT:
        rover.turnOnLeft();
        break;
      case InterpreterDirection.BACK:
        rover.goBack();
        break;
      default:
        throw new Error("Unknown command");
    }
    return rover;
  }
}
