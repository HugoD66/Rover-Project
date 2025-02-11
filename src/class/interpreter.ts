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
    this.commandLine.forEach((command) => {
      switch (command) {
        case InterpreterDirection.AVANCER :
          const rover = this.rover.GetEtat();
          //VOir si collision si on avance,
          // Case obstacle :
            // S'arrete, signale obstacle et renvoie position ( GetEtat())
          // Case pas d'obstacle :
            // continue la commandLine
          const nextRoverPosition = this.rover.calculateNextPosition(true);

          this.checkObstacle(nextRoverPosition.x, nextRoverPosition.y, rover);
          this.rover.Avancer();

          break;
        case InterpreterDirection.DROITE :
          this.rover.GetEtat();
          this.rover.TournerADroite();
          //Voir si collision

          this.rover.Avancer();
          break;
        case InterpreterDirection.GAUCHE :
          this.rover.GetEtat();
          this.rover.TournerAGauche();
          //Voir si collision

          this.rover.Avancer();
          break;
        case InterpreterDirection.RECULER :
          this.rover.GetEtat();
          this.rover.TournerADroite();
          this.rover.TournerADroite();
          //Voir si colision
          this.rover.Avancer();

          break;
        default:
          throw new Error('Commande invalide');
      }
    })
  }

  private checkObstacle(nextRoverPositionX: number, nextRoverPositionY: number, rover: IEtatRover): void {
    const obstacle: { x: number; y: number } | undefined = this.obstacle?.getObstaclePositions();
//TODO SI ERREUR RENVOYER POSITION ROVER ( avec rover GetEtat position) et COORD POSITIONS
    if (obstacle && obstacle.x === nextRoverPositionX && obstacle.y === nextRoverPositionY) {
      throw new Error('Obstacle détecté');
    }
  }

}