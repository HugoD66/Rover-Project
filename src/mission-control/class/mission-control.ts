import { IRoverState } from "../../rover/interface/rover.interface";
import { IMissionControl } from "../interface/mission-control.interface";
import { Rover } from "../../rover/rover-export";

export class MissionControl implements IMissionControl {
  private rover: Rover;

  public constructor(rover: Rover) {
    this.rover = rover;
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
}
