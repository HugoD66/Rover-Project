import {IRover, IRoverState} from "../interface/rover.interface";

export class RoverInterpreter {
  static interpreter(commands: string, rover: IRover): void {
    for (let char of commands) {
      this.interpreterChar(char, rover);
    }
  }

  private static interpreterChar(char: string, rover: IRover): IRoverState {
    if (char.length !== 1) {
      throw new Error('Invalid command');
    }
    switch (char) {
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
}