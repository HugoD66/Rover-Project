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
      console.log('↑ A : Avancer')
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
      case 'A':
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
        socket.write("Commande inconnue. Utilisez A, G, D ...\n");
        return;
    }
  }

  private handleData(socket: net.Socket, data: Buffer): void {
    let message = data.toString().trim().toUpperCase();

    this.executeCommand(message, socket);

     const roverState = this.interpreter
      .getMissionControl()
      .getRoverState();

    console.log('Suite à la commande : ', message);
    console.log('🛸 Orientation du Rover : ', roverState.getOrientation());
    console.log('🪐 Positions du Rover : ', roverState.getActualPositions());
  }

  private handleClose(socket: net.Socket): void {
    console.log(`Connexion fermée avec ${socket.remoteAddress}:${socket.remotePort}`);

    //Remove if we don't wanna stop the server
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
