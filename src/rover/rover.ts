import { ARover, InterpreterDirection, IRoverMovement, IRoverState, Orientation } from './rover.interface';
import { Coordinates } from "./coordinate/coordinates";
import { Map } from "./map/map"; // Importe la classe Map
import { RoverMovement } from "./rover-movement";

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

  public move(moveForward: boolean): IRoverState {
    const result = this.movement.calculateNextPosition(this.positions, this.orientation, moveForward);

    if (!result.success && result.message) {
      this.lastMessage = result.message;
      return this.getState();
    }

    this.positions = result.position;
    return this.getState();
  }

  public goAhead(): IRoverState {
    return this.move(true);
  }

  public goBack(): IRoverState {
    return this.move(false);
  }

  public turnOnLeft(): IRoverState {
    const directions = [Orientation.NORTH, Orientation.WEST, Orientation.SOUTH, Orientation.EST];
    const currentIndex = directions.indexOf(this.orientation);
    const nextIndex = (currentIndex + 1) % directions.length;
    this.orientation = directions[nextIndex];
    return this.getState();
  }

  public turnOnRight(): IRoverState {
    const directions = [Orientation.NORTH, Orientation.EST, Orientation.SOUTH, Orientation.WEST];
    const currentIndex = directions.indexOf(this.orientation);
    const nextIndex = (currentIndex + 1) % directions.length;
    this.orientation = directions[nextIndex];
    return this.getState();
  }

  public setCommandLine(commandLine: string[]): IRoverState {
    this.commandLine = commandLine;
    return this.getState();
  }

  public executeCommandLine(): IRoverState {
    const commandLine = this.commandLine;

    if (!commandLine) return this.getState();

    for (let i = 0; i < commandLine.length; i++) {
      const command = commandLine[i];
      switch (command) {
        case InterpreterDirection.AHEAD:
          this.goAhead();
          break;
        case InterpreterDirection.RIGHT:
          this.turnOnRight();
          this.goAhead();
          break;
        case InterpreterDirection.LEFT:
          this.turnOnLeft();
          this.goAhead();
          break;
        case InterpreterDirection.BACK:
          this.turnOnLeft();
          this.turnOnLeft();
          this.goAhead();
          break;
        default:
          console.log('Invalid command');
      }
    }

    return this.getState();
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
