import { ARover, InterpreterDirection, IRoverMovement, IRoverState, Orientation } from './rover.interface';
import { Coordinates } from "./coordinate/coordinates";
import { Map } from "./map/map"; // Importe la classe Map
import { RoverMovement } from "./rover-movement";
import { MoveResult } from "../interpreter/moveResult";  // Importation de MoveResult

// Classe représentant un rover, héritant de ARover et implémentant les interfaces de mouvement et d'état
export class Rover extends ARover {
  private movement: IRoverMovement; // Instance de la gestion du mouvement du rover
  private lastMessage: string | null = null; // Message du dernier mouvement

  /**
   * Constructeur de la classe Rover, initialise la position et l'orientation, 
   * ainsi que l'instance de Map pour le rover.
   * @param map Instance de la carte sur laquelle évolue le rover.
   */
  constructor(map: Map) {
    // Appel du constructeur de ARover pour initialiser la position, l'orientation et la carte
    super(
      new Coordinates(0, 0), // Position initiale
      Orientation.NORTH,      // Orientation initiale
      map                     // Carte associée au rover
    );
    this.movement = new RoverMovement(map); // Initialise l'instance de gestion des mouvements
  }

  /**
   * Récupère l'état actuel du rover (position et orientation).
   * @returns L'état actuel du rover sous forme d'objet avec les propriétés de position et d'orientation.
   */
  public getState(): IRoverState {
    return {
      getActualPositions: () => this.positions,
      getOrientation: () => this.orientation,
      toString: () => `Position: ${this.positions.toString()}, Orientation: ${this.orientation}` // Méthode toString pour l'état du rover
    };
  }

  /**
   * Récupère la position actuelle du rover.
   * @returns La position actuelle du rover sous forme de coordonnées.
   */
  public getActualPositions(): Coordinates {
    return this.positions;
  }

  /**
   * Récupère l'orientation actuelle du rover.
   * @returns L'orientation actuelle du rover sous forme de chaîne de caractères.
   */
  public getOrientation(): string {
    return this.orientation;
  }

  /**
   * Effectue un mouvement en avant ou en arrière en fonction de l'argument moveForward.
   * @param moveForward Si vrai, déplace le rover en avant, sinon en arrière.
   * @returns Le résultat du mouvement, incluant la nouvelle position et un message.
   */
  public move(moveForward: boolean): MoveResult {
    const result = this.movement.calculateNextPosition(this.positions, this.orientation, moveForward);

    if (!result.success && result.message) {
      this.lastMessage = result.message; // Si un obstacle est détecté, enregistrer le message
      return { success: false, position: this.positions, message: this.lastMessage }; // Le rover reste à sa position
    }

    this.positions = result.position; // Mise à jour de la position
    return { success: true, position: this.positions, message: '' }; // Mouvement réussi
  }

  /**
   * Effectue un mouvement en avant.
   * @returns Le résultat du mouvement en avant.
   */
  public goAhead(): MoveResult {
    return this.move(true); // Appel de la méthode move avec moveForward = true
  }

  /**
   * Effectue un mouvement en arrière.
   * @returns Le résultat du mouvement en arrière.
   */
  public goBack(): MoveResult {
    return this.move(false); // Appel de la méthode move avec moveForward = false
  }

  /**
   * Tourne le rover vers la gauche en ajustant son orientation.
   * @returns Le résultat de la rotation à gauche, avec la nouvelle orientation.
   */
  public turnOnLeft(): MoveResult {
    const directions = [Orientation.NORTH, Orientation.WEST, Orientation.SOUTH, Orientation.EST];
    const currentIndex = directions.indexOf(this.orientation);
    const nextIndex = (currentIndex + 1) % directions.length; // Rotation à gauche (90°)
    this.orientation = directions[nextIndex];
    return { success: true, position: this.positions, message: '' };
  }

  /**
   * Tourne le rover vers la droite en ajustant son orientation.
   * @returns Le résultat de la rotation à droite, avec la nouvelle orientation.
   */
  public turnOnRight(): MoveResult {
    const directions = [Orientation.NORTH, Orientation.EST, Orientation.SOUTH, Orientation.WEST];
    const currentIndex = directions.indexOf(this.orientation);
    const nextIndex = (currentIndex + 1) % directions.length; // Rotation à droite (90°)
    this.orientation = directions[nextIndex];
    return { success: true, position: this.positions, message: '' };
  }

  /**
   * Définit une ligne de commande pour le rover.
   * @param commandLine La ligne de commande à exécuter.
   * @returns Un tableau de résultats de mouvement.
   */
  public setCommandLine(commandLine: string[]): MoveResult[] {
    this.commandLine = commandLine;
    return [{ success: true, position: this.positions, message: '' }];
  }

  /**
   * Exécute la ligne de commande donnée pour déplacer le rover.
   * @returns Un tableau de résultats de mouvement pour chaque commande.
   */
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
            console.log('Invalid command'); // Affiche un message si la commande est invalide
        }
      }
    }
    return results;
  }

  /**
   * Récupère l'instance de la carte associée au rover.
   * @returns L'instance de la carte.
   */
  public getMap(): Map {
    return this.map as Map; // Utilisation d'un cast pour indiquer que this.map est de type Map
  }

  /**
   * Récupère le dernier message du rover (par exemple, un message d'erreur ou de succès).
   * @returns Le dernier message ou null si aucun message n'a été enregistré.
   */
  public getLastMessage(): string | null {
    return this.lastMessage;
  }

  /**
   * Efface le dernier message enregistré.
   */
  public clearLastMessage(): void {
    this.lastMessage = null;
  }

  /**
   * Retourne une représentation sous forme de chaîne de caractères de l'état du rover.
   * @returns Une chaîne de caractères représentant la position et l'orientation du rover.
   */
  public toString(): string {
    return `Rover: Position=${this.positions.toString()}, Orientation=${this.orientation}`;
  }
}
