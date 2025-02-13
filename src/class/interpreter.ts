import { Map } from './map'
import { Rover } from './rover'
import {IInterpreter, InterpreterDirection} from "../interface/interpreter.interface";
import {Obstacle} from "./obstacle";
import {IEtatRover} from "../interface/rover.interface";

export class Interpreter implements IInterpreter {
  private map: Map;
  private rover: Rover;
  private commandLine: string[]; //Exemple : ABRDDGA
  private obstacle?: Obstacle | null;

  public constructor(map: Map, rover: Rover, commandLine: string[], obstacle?: Obstacle | null) {
    this.map = map;
    this.rover = rover;
    this.commandLine = commandLine;
    this.obstacle = obstacle;
  }

  Execute() {

    const roverState = this.rover.GetEtat();
    const nextRoverPosition = this.rover.calculateNextPosition(true);

    this.commandLine.forEach((command) => {
      switch (command) {
        case InterpreterDirection.AVANCER :
          this.checkObstacle(nextRoverPosition.x, nextRoverPosition.y, roverState);
          this.rover.Avancer();

          break;
        case InterpreterDirection.DROITE :
          this.rover.TournerADroite();
          this.checkObstacle(nextRoverPosition.x, nextRoverPosition.y, roverState);

          this.rover.Avancer();
          break;
        case InterpreterDirection.GAUCHE :
          this.rover.TournerAGauche();
          this.checkObstacle(nextRoverPosition.x, nextRoverPosition.y, roverState);

          this.rover.Avancer();
          break;
        case InterpreterDirection.RECULER :
          this.rover.TournerADroite();
          this.rover.TournerADroite();
          this.checkObstacle(nextRoverPosition.x, nextRoverPosition.y, roverState);
          this.rover.Avancer();

          break;
        default:
          throw new Error('Commande invalide');
      }
    })
  }

  private checkObstacle(nextRoverPositionX: number, nextRoverPositionY: number, roverState: IEtatRover): void {
    const obstacle: { x: number; y: number } | undefined = this.obstacle?.getObstaclePositions();

      //TODO SI ERREUR RENVOYER POSITION ROVER ( avec rover GetEtat position) et COORD POSITIONS
    if (obstacle && obstacle.x === nextRoverPositionX && obstacle.y === nextRoverPositionY) {
      const roverStateErrorMessage = `Rover position : ${roverState.GetPositionX()}, ${roverState.GetPositionY()}`;

      const obstacleErrorMessage = `Obstacle position : ${obstacle.x}, ${obstacle.y}`;

      throw new Error('Collision detected : ' + roverStateErrorMessage + ' ' + obstacleErrorMessage);
    }
  }

}