import {InterpreterDirection, IRoverState} from "../interface/rover.interface";
import { IMissionControl } from "../interface/mission-control.interface";
import {Rover} from "./rover";
import {RoverInterpreter} from "./rover-interpreter";
import {Obstacle} from "./obstacle";
import {Map} from "./map";
import * as readline from "node:readline";
import * as process from "node:process";

export class MissionControl implements IMissionControl {
  private readline;
  private rover: Rover;

  public constructor(rover: Rover) {
    this.rover = rover;
    this.readline = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  public Decode(roverStateString: string): IRoverState {
    return JSON.parse(roverStateString);
  }

  public goAhead(): IRoverState {
    return RoverInterpreter.interpreter([InterpreterDirection.AHEAD], this.rover);
  }

  public goBack(): IRoverState {
    return RoverInterpreter.interpreter([InterpreterDirection.BACK], this.rover);
  }

  public turnOnLeft(): IRoverState {
    return RoverInterpreter.interpreter([InterpreterDirection.LEFT], this.rover);
  }

  public turnOnRight(): IRoverState {
    return RoverInterpreter.interpreter([InterpreterDirection.RIGHT], this.rover);
  }

  public getRoverState(): IRoverState {
    return this.rover.getState();
  }
}
