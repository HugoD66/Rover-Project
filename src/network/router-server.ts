import * as net from 'net';
import { Interpreter } from "../interpreter/interpreter";
import { RouterUI } from "../ui/terminal/router-ui";
import {renderFullState} from "../ui/renderer/shared-ui-renderer";

export class RouterServer {
  private readonly host: string;
  private readonly port: number;
  private server: net.Server | null = null;

  constructor(host: string, port: number, private interpreter: Interpreter) {
    this.host = host;
    this.port = port;
  }

  public start(): void {
    this.server = net.createServer((socket) => this.handleNewConnection(socket));

    this.server.listen(this.port, this.host, () => {
      console.log(`RouterServer lancé sur ${this.host}:${this.port}`);
    });

    this.server.on('error', (err) => {
      console.error('Erreur au niveau du serveur :', err);
    });
  }

  private handleNewConnection(socket: net.Socket): void {
    const ui = new RouterUI(this.interpreter, socket);

    ui.log(`Nouvelle connexion depuis ${socket.remoteAddress}:${socket.remotePort}`);
    ui.renderHelp();

    socket.on('data', (data) => this.handleData(data, ui));
    socket.on('close', () => this.handleClose(socket, ui));
    socket.on('error', (err) => this.handleError(socket, err, ui));
  }


  private handleData(data: Buffer, ui: RouterUI): void {
    const message = data.toString().trim().toUpperCase();

    if (message.length > 1) {
      for (let char of message) {
        this.executeCommand(char, ui);
      }
    } else {
      this.executeCommand(message, ui);
    }

    //ui.renderState();
    //ui.display("Commande(s) exécutée(s). Entrez la prochaine commande :");

    const fullState = renderFullState(this.interpreter.getMissionControl());
    ui.log(`\n📡 Commande reçue du client : ${message}`);
    ui.log(fullState);
  }


  private executeCommand(message: string, ui: RouterUI): void {
    this.interpreter.executeCommand(message, ui);
  }

  private handleClose(socket: net.Socket, ui: RouterUI): void {
    ui.display(`Connexion fermée avec ${socket.remoteAddress}:${socket.remotePort}`);
    this.stop();
  }

  private handleError(socket: net.Socket, err: Error, ui: RouterUI): void {
    ui.display(`Erreur sur la connexion ${socket.remoteAddress}:${socket.remotePort} : ${err.message}`);
  }


  public stop(): void {
    if (this.server) {
      this.server.close();
    }
  }
}
