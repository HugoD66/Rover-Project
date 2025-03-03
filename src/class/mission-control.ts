import { IRoverState } from "../interface/rover.interface";
import { IMissionControl } from "../interface/mission-control.interface";
import {Rover} from "./rover";
import {RoverInterpreter} from "./rover-interpreter";

export class MissionControl implements IMissionControl {
  private rover: Rover;

  constructor(rover: Rover) {
    this.rover = rover;
  }

  public sendCommand(command: string): IRoverState {
    console.log(`Mission de control: Envoi de commande '${command}'`);
    RoverInterpreter.interpreter(command, this.rover);
    return this.getRoverState();
  }

  public getRoverState(): IRoverState {
    const state = this.rover.getState();
    console.log(
      `Rover position :  (${state.getActualPositions().x}, ${state.getActualPositions().y}) facing ${state.getOrientation()}`
    );
    return state;
  }
}
