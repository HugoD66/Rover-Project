import { InterpreterDirection, IRoverState } from "../rover/rover.interface";
import { IMissionControl } from "./mission-control.interface";
import { Rover } from "../rover/rover";
import { Map } from "../rover/map/map";
import { MoveResult } from "../interpreter/moveResult"; // ✅ Ajouté pour MoveResult

export class MissionControl implements IMissionControl {
  private rover: Rover;
  private commands: string[];

  public constructor(rover: Rover, commands: string[] = []) {
    this.rover = rover;
    this.commands = commands;
  }

  private commandMap: Record<string, () => MoveResult> = { // ✅ Chaque commande retourne un MoveResult
    [InterpreterDirection.AHEAD]: () => this.rover.goAhead(),
    [InterpreterDirection.BACK]: () => this.rover.goBack(),
    [InterpreterDirection.LEFT]: () => this.rover.turnOnLeft(),
    [InterpreterDirection.RIGHT]: () => this.rover.turnOnRight(),
  };

  public executeCommand(char: string): MoveResult { // ✅ Maintenant retourne MoveResult
    if (!this.commandMap[char]) {
      return {
        success: false,
        position: this.rover.getState().getActualPositions(), // ou un fallback
        message: "Commande invalide."
      };
    }
    return this.commandMap[char]();
  }

  public getRover(): Rover {
    return this.rover;
  }

  public getRoverState(): IRoverState {
    return this.rover.getState();
  }

  public executeCommands(): void {
    this.commands.forEach(cmd => {
      this.executeCommand(cmd); // ici on peut ignorer le retour car batch
    });
  }

  public getMap(): Map {
    return this.rover.getMap();
  }
}
