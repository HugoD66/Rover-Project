import { InterpreterDirection, IRoverState } from "../rover/rover.interface"; // Importation des types nécessaires pour les directions du rover et son état
import { IMissionControl } from "./mission-control.interface"; // Interface pour MissionControl
import { Rover } from "../rover/rover"; // Importation de la classe Rover
import { Map } from "../rover/map/map"; // Importation de la classe Map
import { MoveResult } from "../interpreter/moveResult"; // Type MoveResult, pour encapsuler les résultats des mouvements

/**
 * La classe MissionControl est responsable de la gestion des commandes du rover et de l'interaction avec l'environnement.
 * Elle permet d'envoyer des commandes au rover et de récupérer son état actuel, ainsi que l'état de la carte.
 */
export class MissionControl implements IMissionControl {
  private rover: Rover; // Instance du rover géré par cette classe
  private commands: string[]; // Liste des commandes à exécuter

  /**
   * Constructeur de MissionControl.
   * 
   * @param rover Instance du rover à contrôler.
   * @param commands Liste de commandes à exécuter (optionnel).
   */
  public constructor(rover: Rover, commands: string[] = []) {
    this.rover = rover;
    this.commands = commands;
  }

  // Dictionnaire associant les directions aux méthodes correspondantes du rover
  private commandMap: Record<string, () => MoveResult> = {
    [InterpreterDirection.AHEAD]: () => this.rover.goAhead(), // Avancer
    [InterpreterDirection.BACK]: () => this.rover.goBack(),   // Reculer
    [InterpreterDirection.LEFT]: () => this.rover.turnOnLeft(), // Tourner à gauche
    [InterpreterDirection.RIGHT]: () => this.rover.turnOnRight(), // Tourner à droite
  };

  /**
   * Exécute une commande individuelle en fonction de la direction donnée.
   * 
   * @param char Le caractère représentant la commande à exécuter (ex. 'Z' pour avancer).
   * @returns Le résultat du mouvement effectué, encapsulé dans un objet MoveResult, ou undefined si la commande est invalide.
   */
  public executeCommand(char: string): MoveResult | undefined {
    if (!this.commandMap[char]) {
      return undefined; // Retourne undefined si la commande est invalide
    }
    return this.commandMap[char](); // Exécute la commande et retourne le résultat
  }

  /**
   * Retourne l'instance du rover contrôlé.
   * 
   * @returns L'instance du rover.
   */
  public getRover(): Rover {
    return this.rover;
  }

  /**
   * Retourne l'état actuel du rover.
   * 
   * @returns L'état du rover, implémenté par IRoverState.
   */
  public getRoverState(): IRoverState {
    return this.rover.getState(); // Récupère l'état du rover à partir de l'instance du rover
  }

  /**
   * Exécute une séquence de commandes sur le rover.
   * 
   * Cette méthode permet d'exécuter toutes les commandes stockées dans le tableau `commands`.
   */
  public executeCommands(): void {
    this.commands.forEach(this.executeCommand.bind(this)); // Exécute chaque commande dans la liste
  }

  /**
   * Retourne l'instance de la carte associée au rover.
   * 
   * @returns L'instance de la carte, représentée par la classe Map.
   */
  public getMap(): Map {
    return this.rover.getMap(); // Retourne l'instance de la carte associée au rover
  }
}
