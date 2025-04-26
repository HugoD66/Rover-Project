import { ARover, InterpreterDirection, IRoverMovement, IRoverState, Orientation } from './rover.interface';
import { Coordinates } from "./coordinate/coordinates";
import { Map } from "./map/map"; // Importe la classe Map
import { RoverMovement } from "./rover-movement";
import { MoveResult } from "../interpreter/moveResult";  // Importation de MoveResult

export class Rover extends ARover {
  private movement: IRoverMovement;
  private lastMessage: string | null = null;

  constructor(map: Map) { // Attends une instance de Map
    super(
      new Coordinates(0, 0),
      Orientation.NORTH,
      map // Passe map au constructeur de ARover
    );
    this.movement = new RoverMovement(map); // Passe une instance de Map
  }

  public getState(): IRoverState {
    return {
      getActualPositions: () => this.positions,
      getOrientation: () => this.orientation,
      toString: () => `Position: ${this.positions.toString()}, Orientation: ${this.orientation}` // Ajout de la méthode toString
    };
  }

  public getActualPositions(): Coordinates {
    return this.positions;
  }

  public getOrientation(): string {
    return this.orientation;
  }

  public move(moveForward: boolean): MoveResult {
    const result = this.movement.calculateNextPosition(this.positions, this.orientation, moveForward);

    if (!result.success && result.message) {
      this.lastMessage = result.message;
      return { success: false, position: this.positions, message: this.lastMessage };
    }

    this.positions = result.position;
    return { success: true, position: this.positions, message: '' };
  }

  public goAhead(): MoveResult {
    return this.move(true);
  }

  public goBack(): MoveResult {
    return this.move(false);
  }

  public turnOnLeft(): MoveResult {
    const directions = [Orientation.NORTH, Orientation.WEST, Orientation.SOUTH, Orientation.EST];
    const currentIndex = directions.indexOf(this.orientation);
    const nextIndex = (currentIndex + 1) % directions.length;
    this.orientation = directions[nextIndex];
    return { success: true, position: this.positions, message: '' };
  }

  public turnOnRight(): MoveResult {
    const directions = [Orientation.NORTH, Orientation.EST, Orientation.SOUTH, Orientation.WEST];
    const currentIndex = directions.indexOf(this.orientation);
    const nextIndex = (currentIndex + 1) % directions.length;
    this.orientation = directions[nextIndex];
    return { success: true, position: this.positions, message: '' };
  }

  public setCommandLine(commandLine: string[]): MoveResult[] {
    this.commandLine = commandLine;
    return [{ success: true, position: this.positions, message: '' }];
  }

  public executeCommandLine(): MoveResult[] {
    const results: MoveResult[] = [];
    if (this.commandLine) {
      for (let i = 0; i < this.commandLine.length; i++) {
        const command = this.commandLine[i];
        switch (command) {
          case InterpreterDirection.AHEAD:
            results.push(this.goAhead());
            break;
          case InterpreterDirection.RIGHT:
            results.push(this.turnOnRight());
            results.push(this.goAhead());
            break;
          case InterpreterDirection.LEFT:
            results.push(this.turnOnLeft());
            results.push(this.goAhead());
            break;
          case InterpreterDirection.BACK:
            results.push(this.turnOnLeft());
            results.push(this.turnOnLeft());
            results.push(this.goAhead());
            break;
          default:
            console.log('Invalid command');
        }
      }
    }
    return results;
  }

  public getMap(): Map { // Retourne une instance de Map
    return this.map as Map; // Utilise un cast pour indiquer que this.map est de type Map
  }

  public getLastMessage(): string | null {
    return this.lastMessage;
  }

  public clearLastMessage(): void {
    this.lastMessage = null;
  }

  public toString(): string { // Ajout de la méthode toString
    return `Rover: Position=${this.positions.toString()}, Orientation=${this.orientation}`;
  }
}
