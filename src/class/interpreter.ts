import {IEtatRover} from "../interface/rover.interface";
import {IInterpreter, InterpreterDirection} from "../interface/interpreter.interface";
import {Rover} from "./rover";
import {Obstacle} from "./obstacle";
import {Map} from "./map";

export class Interpreter implements IInterpreter {
  private map: Map;
  private rover: Rover;
  private commandLine: string[]; // Example: ABRDDGA
  private obstacle?: Obstacle | null;

  public constructor(map: Map, rover: Rover, commandLine: string[], obstacle?: Obstacle | null) {
    this.map = map;
    this.rover = rover;
    this.commandLine = commandLine;
    this.obstacle = obstacle;
  }

  Execute() {
    let nextRoverPosition;

    for (const command of this.commandLine) {
      switch (command) {
        case InterpreterDirection.AVANCER:
          nextRoverPosition = this.rover.calculateNextPosition(true);
          break;
        case InterpreterDirection.RECULER:
          nextRoverPosition = this.rover.calculateNextPosition(false);
          break;
        case InterpreterDirection.DROITE:
          this.rover.TournerADroite();
          nextRoverPosition = this.rover.calculateNextPosition(true);
          break;
        case InterpreterDirection.GAUCHE:
          this.rover.TournerAGauche();
          nextRoverPosition = this.rover.calculateNextPosition(true);
          break;
        default:
          throw new Error('Commande invalide');
      }

      try {

        const roverState = this.rover.GetEtat();
        this.checkObstacle(nextRoverPosition.x, nextRoverPosition.y, roverState);

        if (command === InterpreterDirection.AVANCER) {
          this.rover.Avancer();
        } else if (command === InterpreterDirection.RECULER) {
          this.rover.Reculer();
        }


        console.log(`Rover position : ${roverState.GetPositionX()}, ${roverState.GetPositionY()}`);

      } catch (error: any) {
        console.error(error.message);
        break;
      }
    }
  }

  private checkObstacle(nextRoverPositionX: number, nextRoverPositionY: number, roverState: IEtatRover): void {
    const obstacles = this.obstacle?.getObstaclesPositions();

    if (!obstacles) return;

    for (const obstacle of obstacles) {
      if (obstacle.x === nextRoverPositionX && obstacle.y === nextRoverPositionY) {
        console.log(`Collision detected at: ${obstacle.x}, ${obstacle.y}`);
        throw new Error(`Collision detected: Rover at (${roverState.GetPositionX()}, ${roverState.GetPositionY()}), Obstacle at (${obstacle.x}, ${obstacle.y})`);
      }
    }
  }


  public getCommand(): string[] {
    return this.commandLine;
  }
}