import { MissionControl } from "../mission-control/mission-control";
import { RouterServer } from "../network/router-server";
import { InterpreterDirection } from "../rover/rover.interface";
import { IUI } from "./ui.interface";
import { renderFullState } from "./shared-ui-renderer"; // Ajoute la fonction de rendu de l'état complet

/**
 * Classe responsable de l'interprétation des commandes de l'utilisateur
 * et de la gestion de la communication avec le serveur.
 */
export class Interpreter {
  private missionControl: MissionControl;
  private routerServer: RouterServer | null = null;
  private lastMoveFailed = false; // Indicateur de l'échec du dernier mouvement

  /**
   * Constructeur de la classe Interpreter.
   * @param missionControl - Instance de MissionControl utilisée pour exécuter les commandes du rover
   */
  public constructor(missionControl: MissionControl) {
    this.missionControl = missionControl;
  }

  /**
   * Démarre le serveur pour écouter les connexions réseau.
   * @param host - L'adresse hôte du serveur
   * @param port - Le port sur lequel le serveur écoute
   */
  public startServer(host: string, port: number): void {
    this.routerServer = new RouterServer(host, port, this); // Crée une nouvelle instance du serveur
    this.routerServer.start(); // Démarre le serveur
  }

  /**
   * Exécute une commande en fonction de l'entrée de l'utilisateur.
   * @param command - La commande à exécuter (peut être une direction)
   * @param ui - Interface utilisateur pour afficher les messages et états
   */
  public executeCommand(command?: string, ui?: IUI): void {
    if (!command) return; // Si aucune commande n'est fournie, on ne fait rien

    let direction: string | null;

    // Détermine la direction en fonction de la commande de l'utilisateur
    switch (command) {
      case 'Z': direction = InterpreterDirection.AHEAD; break;
      case 'Q': direction = InterpreterDirection.LEFT; break;
      case 'D': direction = InterpreterDirection.RIGHT; break;
      case 'S': direction = InterpreterDirection.BACK; break;
      default:
        (ui?.renderError?.(`Commande inconnue : ${command}`)) || console.log("Commande inconnue :", command); // Affiche un message d'erreur pour une commande inconnue
        return;
    }

    const moveResult = this.missionControl.executeCommand(direction); // Exécute la commande et récupère le résultat du mouvement

    if (moveResult) {  // Vérifie si le résultat du mouvement est valide
      this.lastMoveFailed = !moveResult.success; // Si success est false, alors il y a collision ou erreur
      this.reportRoverMessage(ui); // Affiche le message du rover
    } else {
      console.error("Le mouvement a échoué, le résultat est undefined."); // Log d'erreur si moveResult est indéfini
    }
  }

  /**
   * Récupère l'instance de MissionControl utilisée par l'interpréteur.
   * @returns - L'instance de MissionControl
   */
  public getMissionControl(): MissionControl {
    return this.missionControl;
  }

  /**
   * Rend l'état actuel du rover à l'interface utilisateur.
   * @param ui - Interface utilisateur pour afficher l'état du rover
   */
  public renderState(ui: IUI): void {
    ui.display(renderFullState(this.missionControl, this.lastMoveFailed)); // Affiche l'état complet, y compris les obstacles en cas de collision
  }

  /**
   * Affiche le message du rover (s'il y en a un) dans l'interface utilisateur.
   * @param ui - Interface utilisateur pour afficher le message
   */
  private reportRoverMessage(ui?: IUI): void {
    const rover = this.missionControl.getRover();
    const message = rover.getLastMessage?.();
    if (!message) return; // Si aucun message n'est disponible, on ne fait rien

    ui?.display?.(message); // Affiche le message du rover

    rover.clearLastMessage?.(); // Efface le message une fois qu'il a été affiché
  }
}
