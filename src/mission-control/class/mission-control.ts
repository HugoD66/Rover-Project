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

  private commandMap: Record<string, () => void> = {
    [InterpreterDirection.AHEAD]: () => this.rover.goAhead(),
    [InterpreterDirection.BACK]: () => this.rover.goBack(),
    [InterpreterDirection.LEFT]: () => this.rover.turnOnLeft(),
    [InterpreterDirection.RIGHT]: () => this.rover.turnOnRight(),
  };

  public executeCommand(char: string): void {
    if (!this.commandMap[char]) {
      console.warn(`Commande invalide: ${char}`);
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

}
