import { IRoverState } from "../rover/rover.interface"; // Importation de l'interface IRoverState

/**
 * Interface représentant le contrôle de mission d'un rover.
 * Elle définit les méthodes nécessaires pour gérer l'exécution des commandes et l'accès à l'état du rover.
 */
export interface IMissionControl {
  
  /**
   * Exécute une commande individuelle sur le rover.
   * 
   * @param char Le caractère représentant la commande à exécuter (par exemple, 'Z' pour avancer).
   */
  executeCommand(char: string): void;

  /**
   * Exécute une séquence de commandes sur le rover.
   * Cette méthode est généralement utilisée pour exécuter plusieurs commandes dans un ordre donné.
   */
  executeCommands(): void;

  /**
   * Retourne l'état actuel du rover.
   * 
   * @returns L'état actuel du rover, implémenté par IRoverState.
   */
  getRoverState(): IRoverState;
}
