import * as net from 'net';
import {Interpreter} from "./interpreter/class/interpreter";
import {InterpreterDirection} from "./rover/interface/rover.interface";

export class RouterServer {
  private host: string;
  private port: number;
  private server: net.Server | null = null;

  constructor(host: string, port: number, private interpreter: Interpreter) {
    this.host = host;
    this.port = port;
  }

  public start(): void {
    this.server = net.createServer((socket) => {
      this.handleNewConnection(socket);
    });

    this.server.listen(this.port, this.host, () => {
      console.log(`RouterServer lancé sur ${this.host}:${this.port}`);
      console.log('──────────── Panel des commandes : ')
      console.log('↑ Z : Avancer')
      console.log('<- Q : Tourner à gauche')
      console.log('-> D : Tourner à droite')
      console.log('↓ S : Reculer')
      console.log('────────────')
    });

    this.server.on('error', (err) => {
      console.error('Erreur au niveau du serveur :', err);
    });
  }

  private handleNewConnection(socket: net.Socket): void {
    console.log(`Nouvelle connexion depuis ${socket.remoteAddress}:${socket.remotePort}`);

    socket.on('data', (data) => this.handleData(socket, data));
    socket.on('close', () => this.handleClose(socket));
    socket.on('error', (err) => this.handleError(socket, err));
  }

  private executeCommand(message: string, socket: net.Socket): void {
    switch (message) {
      case 'Z':
        this.interpreter.executeCommand(InterpreterDirection.AHEAD);
        break;
      case 'Q':
        this.interpreter.executeCommand(InterpreterDirection.LEFT);
        break;
      case 'D':
        this.interpreter.executeCommand(InterpreterDirection.RIGHT);
        break;
      case 'S':
        this.interpreter.executeCommand(InterpreterDirection.BACK);
        break;
      default:
        socket.write("Commande inconnue. Utilisez Z, Q, D ou S \n");
        return;
    }
  }

  private handleData(socket: net.Socket, data: Buffer): void {
    let message = data.toString().trim().toUpperCase();

    if(message.length > 1 ) {
      for(let messageUnit of message) {
        this.executeCommand(messageUnit, socket);
      }
    } else {
      this.executeCommand(message, socket);
    }

     const roverState = this.interpreter
      .getMissionControl()
      .getRoverState();

    console.log('Suite à la commande : ', message);
    console.log('🛸 Orientation du Rover : ', roverState.getOrientation());
    console.log('🪐 Positions du Rover : ', roverState.getActualPositions());
    socket.write("\nCommande(s) exécutée(s). Entrez la prochaine commande : ");
  }

  private handleClose(socket: net.Socket): void {
    console.log(`Connexion fermée avec ${socket.remoteAddress}:${socket.remotePort}`);
    this.stop();
  }

  private handleError(socket: net.Socket, err: Error): void {
    console.error(`Erreur sur la connexion ${socket.remoteAddress}:${socket.remotePort}`, err);
  }

  public stop(): void {
    if (this.server) {
      this.server.close(() => {
        console.log('RouterServer arrêté proprement.');
      });
    }
  }
}
