import { IEtatRover } from "../interface/rover.interface"
import {
  IInterpreter,
  InterpreterDirection,
} from "../interface/interpreter.interface"
import { Rover } from "./rover"
import { Obstacle } from "./obstacle"
import { Map } from "./map"

export class Interpreter implements IInterpreter {
  private map: Map
  private rover: Rover
  private commandLine: string[] // Example: ABRDDGA
  private obstacle?: Obstacle | null

  public constructor(
    map: Map,
    rover: Rover,
    commandLine: string[],
    obstacle?: Obstacle | null
  ) {
    this.map = map
    this.rover = rover
    this.commandLine = commandLine
    this.obstacle = obstacle
  }

  Execute() {
    const roverState = this.rover.GetEtat()

    // Parcourt toutes les commandes de la ligne de commande
    for (const command of this.commandLine) {
      try {
        // Exécute une commande spécifique et met à jour l'état du rover
        this.executeCommand(command, roverState)

        // Affiche la position actuelle du rover
        console.log(
          `Position du rover : ${roverState.GetPositionX()}, ${roverState.GetPositionY()}`
        )
      } catch (error: any) {
        // Affiche l'erreur et arrête l'exécution si un problème survient
        console.error(error.message)
        break
      }
    }
  }

  private executeCommand(command: InterpreterDirection, roverState: any) {
    let nextRoverPosition

    // Calcul de la prochaine position et gestion des changements de direction
    switch (command) {
      case InterpreterDirection.AVANCER:
      case InterpreterDirection.RECULER:
        // Calcule la position suivante en fonction de la commande (avancer ou reculer)
        nextRoverPosition = this.rover.calculateNextPosition(
          command === InterpreterDirection.AVANCER
        )
        break

      case InterpreterDirection.DROITE:
        // Tourne à droite et calcule la nouvelle position
        this.rover.TournerADroite()
        nextRoverPosition = this.rover.calculateNextPosition(true)
        break

      case InterpreterDirection.GAUCHE:
        // Tourne à gauche et calcule la nouvelle position
        this.rover.TournerAGauche()
        nextRoverPosition = this.rover.calculateNextPosition(true)
        break

      default:
        // Si la commande n'est pas reconnue, une erreur est levée
        throw new Error("Commande invalide")
    }

    // Vérifie s'il y a un obstacle sur la prochaine position calculée
    this.checkObstacle(nextRoverPosition.x, nextRoverPosition.y, roverState)

    // Déplace le rover uniquement si aucune erreur n'a été levée
    this.moveRover(command)
  }

  private moveRover(command: InterpreterDirection) {
    // Effectue le mouvement en fonction de la commande (avancer ou reculer)
    if (command === InterpreterDirection.AVANCER) {
      this.rover.Avancer()
    } else if (command === InterpreterDirection.RECULER) {
      this.rover.Reculer()
    }
  }

  private checkObstacle(
    nextRoverPositionX: number,
    nextRoverPositionY: number,
    roverState: IEtatRover
  ): void {
    const obstacle = this.obstacle?.getObstaclePositions()

    if (
      obstacle &&
      obstacle.x === nextRoverPositionX &&
      obstacle.y === nextRoverPositionY
    ) {
      const roverStateErrorMessage = `Rover position : ${roverState.GetPositionX()}, ${roverState.GetPositionY()}`
      const obstacleErrorMessage = `Obstacle position : ${obstacle.x}, ${obstacle.y}`
      throw new Error(
        "Collision detected : " +
          roverStateErrorMessage +
          " " +
          obstacleErrorMessage
      )
    }
  }
}
