/*
import { IEtatRover } from "../interface/rover.interface"
import {
  IInterpreter,
  InterpreterDirection,
} from "../interface/interpreter.interface"
import { Rover } from "./rover"
import { Obstacle } from "./obstacle"
import { Map } from "./map"

export class Interpreter implements IInterpreter {
  private rover: Rover
  private commandLine: string[] // Example: ABRDDGA
  private obstacle?: Obstacle | null

  public constructor(
    rover: Rover,
    commandLine: string[],
    obstacle?: Obstacle | null
  ) {
    this.rover = rover
    this.commandLine = commandLine
    this.obstacle = obstacle
  }

  Execute() {
    const roverState = this.rover.GetEtat()

    // Parcourt toutes les commandes de la ligne de commande
    for (const command of this.commandLine) {
      try {
        this.executeCommand(command, roverState)

        console.log(
          `Position du rover : ${roverState.GetPositionX()}, ${roverState.GetPositionY()}`
        )
      } catch (error: any) {
        console.error(error.message)
        break
      }
    }
  }

  private executeCommand(command: InterpreterDirection, roverState: any) {
    let nextRoverPosition

    switch (command) {
      case InterpreterDirection.AVANCER:
        nextRoverPosition = this.rover.calculateNextPosition(true)
        break

      case InterpreterDirection.RECULER:
        nextRoverPosition = this.rover.calculateNextPosition(false)
        break

      case InterpreterDirection.DROITE:
        this.rover.TournerADroite()
        nextRoverPosition = this.rover.calculateNextPosition(true)
        break

      case InterpreterDirection.GAUCHE:
        this.rover.TournerAGauche()
        nextRoverPosition = this.rover.calculateNextPosition(true)
        break

      default:
        throw new Error("Commande invalide")
    }

    this.checkObstacle(nextRoverPosition.x, nextRoverPosition.y, roverState)
    this.moveRover(command)
  }

  //Déplace le rover en fonction de la commande
  private moveRover(command: InterpreterDirection) {
    if (command === InterpreterDirection.AVANCER) {
      this.rover.Avancer()
    } else if (command === InterpreterDirection.RECULER) {
      this.rover.Reculer()
    }
  }

  // Vérifie s'il y a un obstacle sur la prochaine position calculée
  private checkObstacle(
    nextRoverPositionX: number,
    nextRoverPositionY: number,
    roverState: IEtatRover
  ): void {
    const obstacle: Obstacle | undefined = this.obstacle?.getObstaclePosition()

    if (
      obstacle &&
      obstacle.x === nextRoverPositionX &&
      obstacle.y === nextRoverPositionY
    ) {
      const roverStateErrorMessage = `Rover position : ${roverState.GetPositionX()}, ${roverState.GetPositionY()}`
      const obstacleErrorMessage = `Obstacle position : ${obstacle.x}, ${obstacle.y}`

      throw new Error(
        `Collision detected : ${roverStateErrorMessage} ${obstacleErrorMessage}`)
    }
  }

  public getCommand(): string[] {
    return this.commandLine;
  }
}
*/
