import * as net from 'net'; // Importation de la bibliothèque pour la gestion des connexions réseau
import { Interpreter } from "../interpreter/interpreter"; // Importation de l'Interpreter pour exécuter les commandes du rover
import { RouterUI } from "../interpreter/router-ui"; // Importation de la classe RouterUI pour gérer l'interface utilisateur via réseau
import { renderFullState } from "../interpreter/shared-ui-renderer"; // Importation de la fonction pour rendre l'état complet du jeu

/**
 * La classe RouterServer gère les connexions réseau avec les clients,
 * écoute les commandes envoyées par ces clients, et répond avec l'état actuel du rover et de la mission.
 */
export class RouterServer {
  private readonly host: string; // L'adresse IP du serveur
  private readonly port: number; // Le port du serveur
  private server: net.Server | null = null; // Instance du serveur, initialisée à null

  /**
   * Constructeur du RouterServer.
   * 
   * @param host L'adresse de l'hôte où le serveur sera exécuté.
   * @param port Le port sur lequel le serveur écoute.
   * @param interpreter L'interpréteur qui exécute les commandes envoyées par les clients.
   */
  constructor(host: string, port: number, private interpreter: Interpreter) {
    this.host = host;
    this.port = port;
  }

  /**
   * Démarre le serveur et commence à écouter les connexions sur l'hôte et le port spécifiés.
   * Il crée un serveur et gère les nouvelles connexions via la méthode `handleNewConnection`.
   */
  public start(): void {
    this.server = net.createServer((socket) => this.handleNewConnection(socket)); // Crée un serveur et définit le gestionnaire de connexions

    this.server.listen(this.port, this.host, () => {
      console.log(`RouterServer lancé sur ${this.host}:${this.port}`);
    });

    // Gestion des erreurs de serveur
    this.server.on('error', (err) => {
      console.error('Erreur au niveau du serveur :', err);
    });
  }

  /**
   * Gère une nouvelle connexion de client.
   * 
   * @param socket La connexion du client.
   */
  private handleNewConnection(socket: net.Socket): void {
    const ui = new RouterUI(this.interpreter, socket); // Crée une instance de RouterUI pour gérer l'interaction avec le client

    ui.log(`Nouvelle connexion depuis ${socket.remoteAddress}:${socket.remotePort}`); // Affiche l'adresse et le port du client
    ui.renderHelp(); // Affiche les commandes disponibles au client

    // Gère les données reçues du client
    socket.on('data', (data) => this.handleData(data, ui));
    // Gère la fermeture de la connexion
    socket.on('close', () => this.handleClose(socket, ui));
    // Gère les erreurs sur la connexion
    socket.on('error', (err) => this.handleError(socket, err, ui));
  }

  /**
   * Gère les données reçues d'un client. Exécute la commande et affiche l'état actuel du rover.
   * 
   * @param data Les données envoyées par le client.
   * @param ui L'interface utilisateur associée à la connexion.
   */
  private handleData(data: Buffer, ui: RouterUI): void {
    const message = data.toString().trim().toUpperCase(); // Traite le message reçu (transforme en majuscules)

    // Exécute chaque caractère de la commande reçue, si elle est plus longue qu'un caractère
    if (message.length > 1) {
      for (let char of message) {
        this.executeCommand(char, ui);
      }
    } else {
      this.executeCommand(message, ui);
    }

    // Récupère l'état actuel du rover et de la mission pour l'afficher
    const fullState = renderFullState(this.interpreter.getMissionControl());
    ui.log(`\n📡 Commande reçue du client : ${message}`);
    ui.log(JSON.stringify(fullState, null, 2)); // Affiche l'état sous forme de chaîne JSON bien formatée
  }

  /**
   * Exécute une commande envoyée par le client.
   * 
   * @param message La commande à exécuter.
   * @param ui L'interface utilisateur associée à la connexion.
   */
  private executeCommand(message: string, ui: RouterUI): void {
    this.interpreter.executeCommand(message, ui); // Exécute la commande via l'interpréteur
  }

  /**
   * Gère la fermeture de la connexion avec le client.
   * 
   * @param socket La connexion qui a été fermée.
   * @param ui L'interface utilisateur associée à la connexion.
   */
  private handleClose(socket: net.Socket, ui: RouterUI): void {
    ui.display(`Connexion fermée avec ${socket.remoteAddress}:${socket.remotePort}`);
    this.stop(); // Arrête le serveur une fois la connexion fermée
  }

  /**
   * Gère les erreurs rencontrées sur une connexion avec le client.
   * 
   * @param socket La connexion qui a rencontré une erreur.
   * @param err L'erreur rencontrée.
   * @param ui L'interface utilisateur associée à la connexion.
   */
  private handleError(socket: net.Socket, err: Error, ui: RouterUI): void {
    ui.display(`Erreur sur la connexion ${socket.remoteAddress}:${socket.remotePort} : ${err.message}`);
  }

  /**
   * Arrête le serveur.
   * Cette méthode ferme la connexion serveur et arrête l'écoute des connexions entrantes.
   */
  public stop(): void {
    if (this.server) {
      this.server.close(); // Ferme le serveur
    }
  }
}
