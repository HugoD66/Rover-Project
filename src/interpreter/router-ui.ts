import { AbstractUI } from "./ui.interface";
import { Interpreter } from "./interpreter";
import { renderFullState } from "./shared-ui-renderer";
import * as net from "net";

/**
 * Classe représentant l'interface utilisateur pour la gestion des connexions réseau (via sockets).
 * Hérite de la classe `AbstractUI` et utilise un socket pour envoyer des messages au client connecté.
 */
export class RouterUI extends AbstractUI {
  /**
   * Crée une instance de RouterUI pour gérer l'affichage de l'état du rover via un socket.
   * @param interpreter L'interpréteur de commande qui gère la logique de l'application.
   * @param socket Le socket de la connexion réseau pour envoyer des messages au client.
   */
  constructor(
    protected interpreter: Interpreter,
    private socket: net.Socket
  ) {
    super(interpreter);
  }

  /**
   * Méthode vide de démarrage, héritée de `AbstractUI`.
   * Peut être utilisée pour démarrer des processus ou initialiser des connexions si nécessaire.
   */
  public start(): void {}

  /**
   * Logge un message dans la console du serveur.
   * @param message Le message à afficher dans la console.
   */
  public log(message: string): void {
    console.log(message);
  }

  /**
   * Affiche un message au client connecté via le socket.
   * Le message sera envoyé avec un saut de ligne (`\n`).
   * @param message Le message à afficher au client.
   */
  public display(message: string): void {
    this.socket.write(message + "\n");
  }

  /**
   * Rend l'état actuel du rover et de la mission, puis l'affiche via le socket.
   * Utilise `renderFullState` pour générer l'état complet du rover.
   */
  public renderState(): void {
    const output = renderFullState(this.interpreter.getMissionControl());
    this.socket.write(output + "\n");
  }

  /**
   * Affiche un message d'erreur au client connecté via le socket.
   * Le message est précédé de l'emoji "❌" pour indiquer une erreur.
   * @param error Le message d'erreur à afficher.
   */
  public renderError(error: string): void {
    this.socket.write("❌ Erreur : " + error + "\n");
  }

  /**
   * Ferme la connexion réseau avec le client et affiche un message de fin de communication.
   * Envoie un message de déconnexion puis termine la connexion socket.
   */
  public shutdown(): void {
    this.socket.write("Connexion terminée. Au revoir !\n");
    this.socket.end();
  }
}
