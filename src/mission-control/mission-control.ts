import {InterpreterDirection, IRoverState} from "../rover/rover.interface";
import { IMissionControl } from "./mission-control.interface";
import {Obstacle, Rover} from "../rover/rover-export";
import {Map} from "../rover/rover-export";

export class MissionControl implements IMissionControl {
  private rover: Rover;
  private commands: string[];

  public constructor(rover: Rover, commands: string[] = []) {
    this.rover = rover;
    this.commands = commands;
  }

  private commandMap: Record<string, () => void> = {
    [InterpreterDirection.AHEAD]: () => this.rover.goAhead(),
    [InterpreterDirection.BACK]: () => this.rover.goBack(),
    [InterpreterDirection.LEFT]: () => this.rover.turnOnLeft(),
    [InterpreterDirection.RIGHT]: () => this.rover.turnOnRight(),
  };

  public executeCommand(char: string): void {
    if (!this.commandMap[char]) {
      return;
    }
    this.commandMap[char]();
  }


  public getRoverState(): IRoverState {
    return this.rover?.getState();
  }

  public executeCommands(): void {
    this.commands.forEach(this.executeCommand.bind(this));
  }




  public getMap(): Map {
    return this.rover.getMap();
  }

  // ou un helper direct pour la liste d'obstacles:
  public getObstacles(): Obstacle[] {
    return this.rover.getMap().getObstacles() || [];
  }

  public getMapSize(): {width: number; height: number} {
    return {
      width: this.rover.getMap().getMapLimitX(),
      height: this.rover.getMap().getMapLimitY(),
    };
  }
}
